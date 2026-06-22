<?php

namespace App\Console\Commands;

use App\Enums\CarStatus;
use App\Models\Car;
use App\Models\VehicleMaintenance;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CompletePastMaintenances extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'maintenance:auto-complete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Otomatis menyelesaikan maintenance yang sudah melewati estimated_completion_date';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $today = Carbon::today();

        // Ambil semua maintenance yang belum selesai dan estimasinya sudah lewat
        $overdue = VehicleMaintenance::whereNull('completed_at')
            ->whereNotNull('estimated_completion_date')
            ->whereDate('estimated_completion_date', '<', $today)
            ->get();

        if ($overdue->isEmpty()) {
            $this->info('Tidak ada maintenance yang perlu diselesaikan otomatis.');
            return;
        }

        foreach ($overdue as $maintenance) {
            // Tandai maintenance sebagai selesai
            $maintenance->update([
                'completed_at' => $maintenance->estimated_completion_date,
            ]);

            // Cek apakah masih ada maintenance lain yang belum selesai untuk mobil ini
            $stillInMaintenance = VehicleMaintenance::where('car_id', $maintenance->car_id)
                ->whereNull('completed_at')
                ->exists();

            if (!$stillInMaintenance) {
                Car::where('id', $maintenance->car_id)->update([
                    'status'           => CarStatus::AVAILABLE,
                    'maintenance_note' => null,
                ]);

                $this->info("Mobil ID {$maintenance->car_id} ({$maintenance->type}) selesai maintenance → status AVAILABLE.");
            }
        }

        $this->info("Total {$overdue->count()} maintenance diselesaikan otomatis.");
    }
}