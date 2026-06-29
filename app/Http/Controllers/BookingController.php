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

        $drivers = Driver::where('status', 'available')
            ->select('id', 'name', 'phone')
            ->orderBy('name')
            ->get();

        $bookedRanges = Reservation::where('car_id', $car->id)
            ->whereIn('status', [
                ReservationStatus::PENDING,
                ReservationStatus::CONFIRMED,
                ReservationStatus::ACTIVE
            ])
            ->select('start_date', 'end_date')
            ->get()
            ->map(function ($reservation) {
                return [
                    'start' => $reservation->start_date->format('Y-m-d'),
                    'end' => $reservation->end_date->format('Y-m-d')
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
            'delivery_type'    => 'required|in:self_pickup,delivery',
            'delivery_address' => 'required_if:delivery_type,delivery|nullable|string|max:255',
            'with_driver'      => 'boolean',
            'driver_id'        => 'nullable|exists:drivers,id',
        ]);

        // check if start_date or end_date overlaps with any existing booking
        $overlap = Reservation::where('car_id', $car->id)
            ->whereIn('status', [
                ReservationStatus::PENDING,
                ReservationStatus::CONFIRMED,
                ReservationStatus::ACTIVE
            ])
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('start_date', '<=', $request->start_date)
                          ->where('end_date', '>=', $request->end_date);
                    });
            })
            ->exists();

        if ($overlap) {
            return back()->withErrors([
                'start_date' => 'Mobil ini sudah dipesan pada tanggal yang Anda pilih.',
                'end_date' => 'Mobil ini sudah dipesan pada tanggal yang Anda pilih.',
            ]);
        }

        $startDate  = Carbon::parse($request->start_date);
        $endDate    = Carbon::parse($request->end_date);
        $days       = max(1, $startDate->diffInDays($endDate));
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
            'start_date'       => $startDate,
            'end_date'         => $endDate,
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