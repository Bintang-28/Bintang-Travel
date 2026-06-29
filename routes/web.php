<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\HomePagesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomePagesController::class, 'index'])->name('home');
Route::get('/fleet', [HomePagesController::class, 'fleet'])->name('fleet');
Route::get('/about', [HomePagesController::class, 'about'])->name('about');
Route::get('/contact', [HomePagesController::class, 'contact'])->name('contact');
Route::post('/contact/guestContact', [HomePagesController::class, 'guestContact'])->name('contact.guestContact');



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
            '2025_06_13_000000_add_proof_path_to_payments_table'
        ])->delete();

        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return "Tables reservations and payments re-created successfully! Output:<br><pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/client.php';
