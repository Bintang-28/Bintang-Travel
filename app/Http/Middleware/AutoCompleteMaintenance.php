<?php

namespace App\Http\Middleware;

use App\Enums\CarStatus;
use App\Models\Car;
use App\Models\VehicleMaintenance;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class AutoCompleteMaintenance
{
    /**
     * Handle an incoming request.
     * Mengecek dan menyelesaikan maintenance yang sudah melewati estimated_completion_date.
     * Dicek maksimal sekali per hari menggunakan cache agar tidak berat di setiap request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Hanya jalankan sekali per hari menggunakan cache
        $cacheKey = 'maintenance_auto_complete_' . Carbon::today()->toDateString();

        if (!Cache::has($cacheKey)) {
            $this->autoCompleteOverdue();
            $this->syncReservationsAndResources();

            // Jalankan pengingat dokumen kendaraan
            try {
                \Illuminate\Support\Facades\Artisan::call('reminders:vehicle-documents');
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Reminders execution failed: ' . $e->getMessage());
            }

            // Tandai sudah dijalankan hari ini, expire besok
            Cache::put($cacheKey, true, Carbon::tomorrow());
        }

        return $next($request);
    }

    /**
     * Selesaikan semua maintenance yang estimasinya sudah lewat.
     */
    private function autoCompleteOverdue(): void
    {
        $today = Carbon::today();

        $overdue = VehicleMaintenance::whereNull('completed_at')
            ->whereNotNull('estimated_completion_date')
            ->whereDate('estimated_completion_date', '<', $today)
            ->get();

        foreach ($overdue as $maintenance) {
            $maintenance->update([
                'completed_at' => $maintenance->estimated_completion_date,
            ]);

            // Kembalikan mobil ke AVAILABLE jika tidak ada maintenance lain yang pending
            $stillInMaintenance = VehicleMaintenance::where('car_id', $maintenance->car_id)
                ->whereNull('completed_at')
                ->exists();

            if (!$stillInMaintenance) {
                Car::where('id', $maintenance->car_id)->update([
                    'status'           => CarStatus::AVAILABLE,
                    'maintenance_note' => null,
                ]);
            }
        }
    }

    /**
     * Sinkronisasikan status reservasi, mobil, dan driver berdasarkan tanggal saat ini.
     */
    private function syncReservationsAndResources(): void
    {
        $today = Carbon::today();

        // 1. Dapatkan semua reservasi aktif/konfirmasi yang belum selesai
        $reservations = \App\Models\Reservation::whereIn('status', [
            \App\Enums\ReservationStatus::CONFIRMED,
            \App\Enums\ReservationStatus::ACTIVE
        ])->get();

        $rentedCarIds = [];
        $onDutyDriverIds = [];

        foreach ($reservations as $res) {
            if ($today->greaterThan($res->end_date)) {
                // Selesaikan reservasi yang sudah lewat tanggal kembalinya
                $res->update(['status' => \App\Enums\ReservationStatus::COMPLETED]);
                
                // Pastikan pembayaran diselesaikan
                $res->payments()
                    ->whereIn('status', [\App\Enums\PaymentStatus::PENDING, \App\Enums\PaymentStatus::COMPLETED])
                    ->each(function ($payment) {
                        $payment->update([
                            'status'       => \App\Enums\PaymentStatus::COMPLETED,
                            'processed_at' => $payment->processed_at ?? now(),
                        ]);
                    });
            } elseif ($today->between($res->start_date, $res->end_date)) {
                // Aktifkan reservasi yang sudah masuk masa sewa
                if ($res->status !== \App\Enums\ReservationStatus::ACTIVE) {
                    $res->update(['status' => \App\Enums\ReservationStatus::ACTIVE]);
                }
                $rentedCarIds[] = $res->car_id;
                if ($res->driver_id) {
                    $onDutyDriverIds[] = (int) $res->driver_id;
                }
            } else {
                // Reservasi di masa depan (today < start_date)
                if ($res->status !== \App\Enums\ReservationStatus::CONFIRMED) {
                    $res->update(['status' => \App\Enums\ReservationStatus::CONFIRMED]);
                }
            }
        }

        // 2. Update status semua mobil berdasarkan sewa aktif hari ini
        // Mobil yang tidak sedang disewakan (dan tidak dalam perbaikan) di-set ke AVAILABLE
        Car::where('status', CarStatus::RENTED)
            ->whereNotIn('id', $rentedCarIds)
            ->update(['status' => CarStatus::AVAILABLE]);

        if (!empty($rentedCarIds)) {
            Car::whereIn('id', $rentedCarIds)
                ->where('status', '!=', CarStatus::MAINTENANCE)
                ->update(['status' => CarStatus::RENTED]);
        }

        // 3. Update status semua driver berdasarkan tugas aktif hari ini
        \App\Models\Driver::where('status', 'on_duty')
            ->whereNotIn('id', $onDutyDriverIds)
            ->update(['status' => 'available']);

        if (!empty($onDutyDriverIds)) {
            \App\Models\Driver::whereIn('id', $onDutyDriverIds)
                ->update(['status' => 'on_duty']);
        }
    }
}