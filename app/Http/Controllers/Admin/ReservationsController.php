<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Car;
use App\Models\User;
use App\Models\Payment;
use App\Models\Driver;
use App\Enums\ReservationStatus;
use App\Enums\PaymentStatus;
use App\Enums\CarStatus;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class ReservationsController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->input('status');

        $statusCounts = Reservation::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        $reservations = Reservation::query()
            ->with([
                'user:id,name,email',
                'car:id,make,model,year,license_plate',
            ])
            ->when($request->string('search')->toString(), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('reservation_number', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($uq) use ($search) {
                            $uq->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        })
                        ->orWhereHas('car', function ($cq) use ($search) {
                            $cq->where('make', 'like', "%{$search}%")
                                ->orWhere('model', 'like', "%{$search}%")
                                ->orWhere('license_plate', 'like', "%{$search}%");
                        });
                });
            })
            ->when($status && $status !== 'all', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        $statuses = collect(ReservationStatus::cases())->mapWithKeys(function ($st) use ($statusCounts) {
            $meta = ReservationStatus::getMeta();
            $statusMeta = collect($meta)->firstWhere('value', $st->value);

            return [
                $st->value => [
                    'label' => $statusMeta['label'] ?? ucfirst(str_replace('_', ' ', $st->value)),
                    'count' => $statusCounts[$st->value] ?? 0,
                    'color' => $statusMeta['color'] ?? '#6B7280',
                ],
            ];
        })->toArray();

        return Inertia::render('Admin/Reservations/Index', [
            'reservations' => $reservations,
            'filters' => [
                'search' => $request->string('search')->toString(),
                'status' => $status,
            ],
            'statuses' => $statuses,
        ]);
    }

    public function show(Reservation $reservation): Response
    {
        $reservation->load(['user', 'car', 'payments', 'driver']);

        return Inertia::render('Admin/Reservations/Show', [
            'reservation' => $reservation,
            'statusMeta' => ReservationStatus::getMeta(),
            'paymentStatusMeta' => PaymentStatus::getMeta(),
        ]);
    }

    public function edit(Reservation $reservation): Response
    {
        $reservation->load(['user:id,name,email', 'car:id,make,model,year,license_plate', 'driver']);

        $drivers = \App\Models\Driver::select('id', 'name', 'phone', 'license_number')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Reservations/Edit', [
            'reservation' => $reservation,
            'drivers'     => $drivers,
            'enums' => [
                'statuses' => ReservationStatus::getMeta(),
            ],
        ]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'start_date'          => ['required', 'date'],
            'end_date'            => ['required', 'date', 'after_or_equal:start_date'],
            'pickup_time'         => ['nullable', 'date_format:H:i'],
            'return_time'         => ['nullable', 'date_format:H:i'],
            'delivery_type'       => ['required', 'string', 'in:self_pickup,delivery'],
            'delivery_address'    => ['nullable', 'string'],
            'discount_amount'     => ['nullable', 'numeric', 'min:0'],
            'penalty_amount'      => ['nullable', 'numeric', 'min:0'],
            'notes'               => ['nullable', 'string'],
            'status'              => ['required', 'string', Rule::enum(ReservationStatus::class)],
            'cancellation_reason' => ['nullable', 'string'],
            'driver_id'           => ['nullable', 'exists:drivers,id'],
        ]);

        $previousStatus    = $reservation->status;
        $previousDriverId  = $reservation->driver_id;

        $reservation->fill($validated);

        // Update driver_id secara manual
        $reservation->driver_id = $request->filled('driver_id') ? $request->driver_id : null;

        // Hitung ulang total ketika tanggal atau diskon berubah
        $start = Carbon::parse($validated['start_date'] . ' ' . ($validated['pickup_time'] ?? '00:00'));
        $end   = Carbon::parse($validated['end_date'] . ' ' . ($validated['return_time'] ?? '00:00'));
        
        $totalHours = $start->diffInHours($end);
        $fullDays = floor($totalHours / 24);
        $remainderHours = $totalHours % 24;
        
        if ($remainderHours > 0 && $remainderHours <= 12) {
            $totalDays = $fullDays + 0.5;
        } elseif ($remainderHours > 12) {
            $totalDays = $fullDays + 1;
        } else {
            $totalDays = max(0.5, $fullDays);
        }

        $reservation->total_days  = $totalDays;
        $reservation->subtotal    = $reservation->daily_rate * $totalDays;
        $reservation->tax_amount  = 0;

        // Pertahankan biaya sopir (driver fee = total lama - subtotal lama)
        $driverFee = (float) $reservation->getOriginal('total_amount')
                - (float) $reservation->getOriginal('subtotal');
        $driverFee = max(0, $driverFee);

        $reservation->total_amount = $reservation->subtotal
            + $driverFee
            - (float) ($validated['discount_amount'] ?? 0)
            + (float) ($validated['penalty_amount'] ?? 0);

        // Kelola metadata pembatalan
        if ($reservation->status === ReservationStatus::CANCELLED && !$reservation->cancelled_at) {
            $reservation->cancelled_at = now();
        }
        if ($reservation->status !== ReservationStatus::CANCELLED) {
            $reservation->cancellation_reason = null;
            $reservation->cancelled_at        = null;
        }

        $reservation->save();

        $statusChanged = $previousStatus !== $reservation->status;
        $today = Carbon::today();

        if ($statusChanged && $reservation->status === ReservationStatus::CONFIRMED) {
            $reservation->payments()
                ->where('status', PaymentStatus::PENDING)
                ->each(function (Payment $payment) {
                    $payment->update([
                        'status'       => PaymentStatus::COMPLETED,
                        'processed_at' => now(),
                    ]);
                });

            if ($today->between($reservation->start_date, $reservation->end_date)) {
                $reservation->status = ReservationStatus::ACTIVE;
                $reservation->save();
                $reservation->car?->update(['status' => CarStatus::RENTED]);
            } else {
                $reservation->car?->update(['status' => CarStatus::AVAILABLE]);
            }
        }

        if ($statusChanged && $reservation->status === ReservationStatus::ACTIVE) {
            if ($today->between($reservation->start_date, $reservation->end_date)) {
                $reservation->car?->update(['status' => CarStatus::RENTED]);
            } else {
                $reservation->status = ReservationStatus::CONFIRMED;
                $reservation->save();
                $reservation->car?->update(['status' => CarStatus::AVAILABLE]);
            }
        }

        if ($statusChanged && $reservation->status === ReservationStatus::COMPLETED) {
            $reservation->payments()
                ->whereIn('status', [PaymentStatus::PENDING, PaymentStatus::COMPLETED])
                ->each(function (Payment $payment) {
                    $payment->update([
                        'status'       => PaymentStatus::COMPLETED,
                        'processed_at' => $payment->processed_at ?? now(),
                    ]);
                });

            $reservation->car?->update(['status' => CarStatus::AVAILABLE]);
        }

        if ($statusChanged && in_array($reservation->status, [
            ReservationStatus::CANCELLED,
            ReservationStatus::NO_SHOW,
        ])) {
            $reservation->car?->update(['status' => CarStatus::AVAILABLE]);
            
            // Hapus tagihan (payment) yang masih pending agar tidak muncul di halaman Payments
            $reservation->payments()->where('status', PaymentStatus::PENDING)->delete();
        }

        $this->syncDriverStatus($reservation, $previousDriverId, $statusChanged);

        return redirect()
            ->route('admin.reservations.show', $reservation)
            ->with('success', 'Reservasi berhasil diperbarui.');
    }

    private function syncDriverStatus(Reservation $reservation, ?int $previousDriverId, bool $statusChanged): void
    {
        $activeStatuses   = [ReservationStatus::CONFIRMED, ReservationStatus::ACTIVE];
        $finishedStatuses = [ReservationStatus::COMPLETED, ReservationStatus::CANCELLED, ReservationStatus::NO_SHOW];

        // Samakan tipe: pastikan currentDriverId juga int|null, bukan string|null
        $currentDriverId = $reservation->driver_id !== null ? (int) $reservation->driver_id : null;
        $driverChanged   = $previousDriverId !== $currentDriverId;

        // Sopir yang terpasang sekarang mulai bertugas jika hari sewa sudah mulai
        $today = Carbon::today();
        if ($currentDriverId && in_array($reservation->status, $activeStatuses, true)) {
            if ($today->between($reservation->start_date, $reservation->end_date)) {
                Driver::where('id', $currentDriverId)->update(['status' => 'on_duty']);
            } else {
                Driver::where('id', $currentDriverId)->update(['status' => 'available']);
            }
        }

        // Tentukan apakah ada sopir lama yang perlu dilepas
        $driverToRelease = null;

        if ($driverChanged && $previousDriverId) {
            $driverToRelease = $previousDriverId;
        } elseif ($statusChanged && $currentDriverId && in_array($reservation->status, $finishedStatuses, true)) {
            $driverToRelease = $currentDriverId;
        }

        if ($driverToRelease) {
            $stillOnDuty = Reservation::where('driver_id', $driverToRelease)
                ->where('id', '!=', $reservation->id)
                ->whereIn('status', $activeStatuses)
                ->get()
                ->filter(function ($res) use ($today) {
                    return $today->between($res->start_date, $res->end_date);
                })
                ->count() > 0;

            if (! $stillOnDuty) {
                Driver::where('id', $driverToRelease)->update(['status' => 'available']);
            }
        }
    }

    public function print(Reservation $reservation)
    {
        $reservation->load(['user', 'car', 'payments']);

        $pdf = Pdf::loadView('admin.reservations.print', [
            'reservation'       => $reservation,
            'statusMeta'        => ReservationStatus::getMeta(),
            'paymentStatusMeta' => PaymentStatus::getMeta(),
            'currency'          => config('app.currency_symbol'),
        ])->setPaper('a4', 'portrait');

        return $pdf->download($reservation->reservation_number . '.pdf');
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->forceDelete();

        return redirect()
            ->route('admin.reservations.index')
            ->with('success', 'Reservasi berhasil dihapus.');
    }
}