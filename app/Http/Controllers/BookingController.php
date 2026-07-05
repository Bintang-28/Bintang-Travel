<?php

namespace App\Http\Controllers;

use App\Enums\CarStatus;
use App\Enums\ReservationStatus;
use App\Models\Car;
use App\Models\Driver;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    /**
     * Biaya sopir per hari (harus sama dengan DRIVER_FEE_PER_DAY di book.tsx)
     */
    private const DRIVER_FEE_PER_DAY = 250000;

    public function show(Car $car)
    {
        if ($car->status === CarStatus::MAINTENANCE) {
            return redirect()->route('fleet')->with('error', 'Mobil ini sedang dalam perbaikan dan tidak dapat disewa.');
        }

        $drivers = Driver::orderBy('name')
            ->get()
            ->map(function ($driver) {
                // Dapatkan semua tanggal terbooking untuk driver ini
                $bookedRanges = Reservation::where('driver_id', $driver->id)
                    ->whereIn('status', [
                        ReservationStatus::PENDING,
                        ReservationStatus::CONFIRMED,
                        ReservationStatus::ACTIVE
                    ])
                    ->select('start_date', 'end_date', 'pickup_time', 'return_time')
                    ->get()
                    ->map(function ($res) {
                        return [
                            'start' => $res->start_date->format('Y-m-d'),
                            'end' => $res->end_date->format('Y-m-d'),
                            'pickup_time' => $res->pickup_time ? Carbon::parse($res->pickup_time)->format('H:i') : '00:00',
                            'return_time' => $res->return_time ? Carbon::parse($res->return_time)->format('H:i') : '00:00',
                        ];
                    });

                return [
                    'id' => $driver->id,
                    'name' => $driver->name,
                    'phone' => $driver->phone,
                    'status' => $driver->status,
                    'bookedRanges' => $bookedRanges,
                ];
            });

        $bookedRanges = Reservation::where('car_id', $car->id)
            ->whereIn('status', [
                ReservationStatus::PENDING,
                ReservationStatus::CONFIRMED,
                ReservationStatus::ACTIVE
            ])
            ->select('start_date', 'end_date', 'pickup_time', 'return_time')
            ->get()
            ->map(function ($reservation) {
                return [
                    'start' => $reservation->start_date->format('Y-m-d'),
                    'end' => $reservation->end_date->format('Y-m-d'),
                    'pickup_time' => $reservation->pickup_time ? Carbon::parse($reservation->pickup_time)->format('H:i') : '00:00',
                    'return_time' => $reservation->return_time ? Carbon::parse($reservation->return_time)->format('H:i') : '00:00',
                ];
            });

        return inertia('Booking', compact('car', 'drivers', 'bookedRanges'));
    }

    public function book(Car $car, Request $request)
    {
        if ($car->status === CarStatus::MAINTENANCE) {
            return redirect()->route('fleet')->with('error', 'Mobil tidak tersedia karena sedang dalam perbaikan.');
        }

        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login terlebih dahulu.');
        }

        $request->validate([
            'start_date'       => 'required|date',
            'end_date'         => 'required|date|after_or_equal:start_date',
            'pickup_time'      => 'required|date_format:H:i',
            'return_time'      => 'required|date_format:H:i',
            'delivery_type'    => 'required|in:self_pickup,delivery',
            'delivery_address' => 'required_if:delivery_type,delivery|nullable|string|max:255',
            'with_driver'      => 'boolean',
            'driver_id'        => 'nullable|exists:drivers,id',
        ]);

        $startDateTime = Carbon::parse($request->start_date . ' ' . $request->pickup_time);
        $endDateTime   = Carbon::parse($request->end_date . ' ' . $request->return_time);

        if ($startDateTime->isPast()) {
            return back()->withErrors([
                'pickup_time' => 'Waktu pengambilan tidak boleh di masa lalu.',
            ])->withInput();
        }

        if ($endDateTime->lte($startDateTime)) {
            return back()->withErrors([
                'return_time' => 'Waktu pengembalian harus setelah waktu pengambilan.',
            ])->withInput();
        }

        // check if start_date or end_date overlaps with any existing booking
        $activeReservations = Reservation::where('car_id', $car->id)
            ->whereIn('status', [
                ReservationStatus::PENDING,
                ReservationStatus::CONFIRMED,
                ReservationStatus::ACTIVE
            ])->get();

        $overlap = $activeReservations->some(function ($res) use ($startDateTime, $endDateTime) {
            $existingStart = Carbon::parse($res->start_date->format('Y-m-d') . ' ' . ($res->pickup_time ?: '00:00'));
            $existingEnd = Carbon::parse($res->end_date->format('Y-m-d') . ' ' . ($res->return_time ?: '23:59'))->addHour(); // 1 hour buffer

            return $existingStart->lt($endDateTime) && $existingEnd->gt($startDateTime);
        });

        if ($overlap) {
            return back()->withErrors([
                'start_date' => 'Mobil ini sudah dipesan pada rentang waktu yang Anda pilih (termasuk waktu bersih-bersih).',
                'end_date' => 'Mobil ini sudah dipesan pada rentang waktu yang Anda pilih (termasuk waktu bersih-bersih).',
            ]);
        }

        // Check if selected driver overlaps with any existing booking
        if ($request->with_driver && $request->driver_id) {
            $driverActiveReservations = Reservation::where('driver_id', $request->driver_id)
                ->whereIn('status', [
                    ReservationStatus::PENDING,
                    ReservationStatus::CONFIRMED,
                    ReservationStatus::ACTIVE
                ])->get();
                
            $driverOverlap = $driverActiveReservations->some(function ($res) use ($startDateTime, $endDateTime) {
                $existingStart = Carbon::parse($res->start_date->format('Y-m-d') . ' ' . ($res->pickup_time ?: '00:00'));
                $existingEnd = Carbon::parse($res->end_date->format('Y-m-d') . ' ' . ($res->return_time ?: '23:59'))->addHour(); // 1 hour buffer

                return $existingStart->lt($endDateTime) && $existingEnd->gt($startDateTime);
            });

            if ($driverOverlap) {
                return back()->withErrors([
                    'driver_id' => 'Sopir yang Anda pilih sudah memiliki jadwal menyetir pada tanggal tersebut.',
                ]);
            }
        }

        $startDateTime = Carbon::parse($request->start_date . ' ' . $request->pickup_time);
        $endDateTime   = Carbon::parse($request->end_date . ' ' . $request->return_time);
        
        $totalHours = $startDateTime->diffInHours($endDateTime);
        $fullDays = floor($totalHours / 24);
        $remainderHours = $totalHours % 24;
        
        if ($remainderHours > 0 && $remainderHours <= 12) {
            $days = $fullDays + 0.5;
        } elseif ($remainderHours > 12) {
            $days = $fullDays + 1;
        } else {
            $days = max(0.5, $fullDays); // Minimum 0.5 days if someone books for 0 hours (which shouldn't happen due to validation, but just in case)
        }

        $dailyRate  = abs($car->price_per_day);

        // Subtotal hanya biaya mobil
        $subtotal  = $dailyRate * $days;

        // Biaya sopir (0 jika tidak pakai sopir)
        $driverFee = $request->with_driver ? self::DRIVER_FEE_PER_DAY * $days : 0;

        // Total = mobil + sopir (tanpa pajak)
        $total     = $subtotal + $driverFee;
        $taxAmount = 0;

        // Lokasi otomatis berdasarkan delivery_type
        $pickupLocation = $request->delivery_type === 'delivery'
            ? $request->delivery_address
            : 'Ambil Sendiri';

        $reservation = Reservation::create([
            'car_id'           => $car->id,
            'user_id'          => Auth::id(),
            'start_date'       => $startDateTime->toDateString(),
            'end_date'         => $endDateTime->toDateString(),
            'pickup_time'      => $request->pickup_time,
            'return_time'      => $request->return_time,
            'pickup_location'  => $pickupLocation,
            'return_location'  => $pickupLocation,
            'delivery_type'    => $request->delivery_type,
            'delivery_address' => $request->delivery_address,
            'driver_id'        => $request->with_driver ? $request->driver_id : null,
            'total_days'       => $days,
            'daily_rate'       => $dailyRate,
            'subtotal'         => $subtotal,
            'tax_amount'       => $taxAmount,
            'total_amount'     => $total,
            'status'           => 'pending',
        ]);

        return redirect()->route('booking.confirmation', $reservation->id);
    }

    public function confirmation(Reservation $reservation)
    {
        if ($reservation->user_id !== Auth::id()) {
            return redirect()->route('fleet');
        }

        return inertia('BookingConfirmation', [
            'reservation' => $reservation->load(['car', 'user', 'driver', 'payments']),
        ]);
    }
}