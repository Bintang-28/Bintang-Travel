<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\HomePagesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomePagesController::class, 'index'])->name('home');
Route::get('/fleet', [HomePagesController::class, 'fleet'])->name('fleet');
Route::get('/about', [HomePagesController::class, 'about'])->name('about');



Route::get('/fleet/{car}', [BookingController::class, 'show'])->name('fleet.show');
Route::post('/fleet/{car}', [BookingController::class, 'book'])->name('fleet.book');

Route::get('/booking/{reservation}', [BookingController::class, 'confirmation'])->name('booking.confirmation');

Route::get('/run-migration-secret-xyz', function() {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return "Database migrated successfully! Output:<br><pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});

Route::get('/force-recreate-db-secret-xyz', function() {
    try {
        \Illuminate\Support\Facades\Schema::dropIfExists('payments');
        \Illuminate\Support\Facades\Schema::dropIfExists('reservations');
        
        // Hapus catatan migrasi agar Laravel menjalankan ulang pembuatan tabel tersebut
        \Illuminate\Support\Facades\DB::table('migrations')->whereIn('migration', [
            '2025_09_25_170900_create_reservations_table',
            '2025_09_25_170914_create_payments_table',
            '2026_06_21_072420_add_driver_and_delivery_to_reservations_table',
            '2025_06_13_000000_add_proof_path_to_payments_table',
            '2025_09_26_000000_add_proof_path_to_payments_table'
        ])->delete();

        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return "Tables reservations and payments re-created successfully! Output:<br><pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});

Route::get('/fix-db-owner-secret-xyz', function() {
    try {
        $dbUser = env('DB_USERNAME');
        $tables = \Illuminate\Support\Facades\DB::select("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
        $output = "";
        foreach ($tables as $table) {
            try {
                \Illuminate\Support\Facades\DB::statement("ALTER TABLE \"{$table->tablename}\" OWNER TO \"{$dbUser}\"");
                $output .= "Sukses mengubah owner tabel {$table->tablename}<br>";
            } catch (\Exception $e) {
                $output .= "Gagal mengubah tabel {$table->tablename}: " . $e->getMessage() . "<br>";
            }
        }
        return "Hasil perbaikan owner:<br>" . $output;
    } catch (\Exception $e) {
        return "Error utama: " . $e->getMessage();
    }
});

Route::get('/migrate-fresh-secret-xyz', function() {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--seed' => true, '--force' => true]);
        return "Database berhasil di-reset total dan seeder dijalankan! Output:<br><pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});

Route::get('/force-sync-status-secret-xyz', function() {
    try {
        $today = \Carbon\Carbon::today();

        // 1. Dapatkan semua reservasi aktif/konfirmasi yang belum selesai
        $reservations = \App\Models\Reservation::whereIn('status', [
            \App\Enums\ReservationStatus::CONFIRMED,
            \App\Enums\ReservationStatus::ACTIVE
        ])->get();

        $rentedCarIds = [];
        $onDutyDriverIds = [];

        foreach ($reservations as $res) {
            if ($today->greaterThan($res->end_date)) {
                $res->update(['status' => \App\Enums\ReservationStatus::COMPLETED]);
                $res->payments()
                    ->whereIn('status', [\App\Enums\PaymentStatus::PENDING, \App\Enums\PaymentStatus::COMPLETED])
                    ->each(function ($payment) {
                        $payment->update([
                            'status'       => \App\Enums\PaymentStatus::COMPLETED,
                            'processed_at' => $payment->processed_at ?? now(),
                        ]);
                    });
            } elseif ($today->between($res->start_date, $res->end_date)) {
                if ($res->status !== \App\Enums\ReservationStatus::ACTIVE) {
                    $res->update(['status' => \App\Enums\ReservationStatus::ACTIVE]);
                }
                $rentedCarIds[] = $res->car_id;
                if ($res->driver_id) {
                    $onDutyDriverIds[] = (int) $res->driver_id;
                }
            } else {
                if ($res->status !== \App\Enums\ReservationStatus::CONFIRMED) {
                    $res->update(['status' => \App\Enums\ReservationStatus::CONFIRMED]);
                }
            }
        }

        // 2. Update status semua mobil berdasarkan sewa aktif hari ini
        \App\Models\Car::where('status', \App\Enums\CarStatus::RENTED)
            ->whereNotIn('id', $rentedCarIds)
            ->update(['status' => \App\Enums\CarStatus::AVAILABLE]);

        if (!empty($rentedCarIds)) {
            \App\Models\Car::whereIn('id', $rentedCarIds)
                ->where('status', '!=', \App\Enums\CarStatus::MAINTENANCE)
                ->update(['status' => \App\Enums\CarStatus::RENTED]);
        }

        // 3. Update status semua driver berdasarkan tugas aktif hari ini
        \App\Models\Driver::where('status', 'on_duty')
            ->whereNotIn('id', $onDutyDriverIds)
            ->update(['status' => 'available']);

        if (!empty($onDutyDriverIds)) {
            \App\Models\Driver::whereIn('id', $onDutyDriverIds)
                ->update(['status' => 'on_duty']);
        }

        // Jalankan juga pengingat dokumen kendaraan
        \Illuminate\Support\Facades\Artisan::call('reminders:vehicle-documents');

        // Simpan tanda cache agar tidak bertabrakan dengan middleware harian
        \Illuminate\Support\Facades\Cache::put('maintenance_auto_complete_' . $today->toDateString(), true, \Carbon\Carbon::tomorrow());

        return "Database statuses successfully synchronized and reminders triggered for today (" . $today->toDateString() . ")! Output: " . \Illuminate\Support\Facades\Artisan::output();
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});

Route::get('/test-telegram-secret-xyz', function() {
    try {
        $token = config('services.telegram.bot_token');
        $chatId = config('services.telegram.chat_id');
        
        $response = \Illuminate\Support\Facades\Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
            'chat_id'    => $chatId,
            'text'       => "🔔 *Test Notifikasi Bintang Travel*\nKoneksi bot Telegram Anda telah berhasil terhubung!",
            'parse_mode' => 'Markdown',
        ]);
        
        return [
            'status_code' => $response->status(),
            'successful'  => $response->successful(),
            'body'        => $response->json() ?? $response->body(),
            'config_used' => [
                'bot_token_configured' => !empty($token),
                'chat_id_configured'   => !empty($chatId),
                'chat_id'              => $chatId
            ]
        ];
    } catch (\Exception $e) {
        return "Exception: " . $e->getMessage();
    }
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/client.php';
