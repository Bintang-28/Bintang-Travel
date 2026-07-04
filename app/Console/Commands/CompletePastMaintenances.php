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
    protected $description = 'Otomatis memulai dan menyelesaikan maintenance berdasarkan tanggal';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $today = Carbon::today();

        // 1. Ambil semua maintenance yang belum selesai dan estimasinya sudah lewat (AUTO COMPLETE)
        $overdue = VehicleMaintenance::whereNull('completed_at')
            ->whereNotNull('estimated_completion_date')
            ->whereDate('estimated_completion_date', '<', $today)
            ->get();

        if ($overdue->isNotEmpty()) {
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
        } else {
            $this->info('Tidak ada maintenance yang perlu diselesaikan otomatis hari ini.');
        }

        // 2. Ambil semua maintenance yang jatuh tempo HARI INI dan belum selesai (AUTO START)
        $startingToday = VehicleMaintenance::whereNull('completed_at')
            ->whereDate('service_date', '<=', $today)
            ->get();

        if ($startingToday->isNotEmpty()) {
            foreach ($startingToday as $maintenance) {
                Car::where('id', $maintenance->car_id)->update([
                    'status'           => CarStatus::MAINTENANCE,
                    'maintenance_note' => $maintenance->type,
                ]);
                $this->info("Mobil ID {$maintenance->car_id} ({$maintenance->type}) mulai maintenance → status MAINTENANCE.");
            }
            $this->info("Total {$startingToday->count()} maintenance dimulai otomatis.");
        } else {
            $this->info('Tidak ada maintenance yang perlu dimulai otomatis hari ini.');
        }
    }
}