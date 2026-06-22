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
}