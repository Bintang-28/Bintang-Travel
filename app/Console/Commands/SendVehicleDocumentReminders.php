<?php

namespace App\Console\Commands;

use App\Models\VehicleReminder;
use App\Services\TelegramService;
use Illuminate\Console\Command;
use Carbon\Carbon;

class SendVehicleDocumentReminders extends Command
{
    protected $signature = 'reminders:vehicle-documents';
    protected $description = 'Kirim reminder Telegram untuk semua jenis dokumen/perawatan kendaraan yang jatuh tempo';

    public function handle(TelegramService $telegram)
    {
        $today = Carbon::today();

        $dueReminders = VehicleReminder::with('car')
            ->whereNull('notified_at')
            ->get()
            ->filter(function (VehicleReminder $reminder) use ($today) {
            $triggerDate = $reminder->due_date->copy()->subDays($reminder->reminder_days_before);
            return $today->greaterThanOrEqualTo($triggerDate);
        });

        if ($dueReminders->isEmpty()) {
            $this->info('Tidak ada reminder yang jatuh waktu hari ini.');
            return;
        }

        foreach ($dueReminders as $reminder) {
            $car = $reminder->car;

            $message = "🔔 *Pengingat: {$reminder->label}*\n\n"
                . "{$car->year} {$car->make} {$car->model} ({$car->license_plate})\n\n"
                . "Jatuh tempo: {$reminder->due_date->format('d/m/Y')} "
                . "({$reminder->reminder_days_before} hari lagi)\n\n"
                . "Mohon segera diurus ya 🙏";

            $sent = $telegram->send($message);

            if ($sent) {
                $reminder->update(['notified_at' => now()]);
                $this->info("Reminder terkirim: {$reminder->label} — {$car->make} {$car->model}");
            } else {
                $this->error("GAGAL kirim reminder: {$reminder->label} — {$car->make} {$car->model}");
            }
        }
    }
}