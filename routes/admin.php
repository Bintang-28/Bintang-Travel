<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CarsController;
use App\Http\Controllers\Admin\MaintenanceController;
use App\Http\Controllers\Admin\ReservationsController;
use App\Http\Controllers\Admin\ClientsController;
use App\Http\Controllers\Admin\VehicleReminderController;
use App\Http\Controllers\Admin\DriversController;
use App\Http\Controllers\Admin\PaymentsController;
use App\Http\Controllers\Admin\ReportsController;
use App\Http\Controllers\Admin\SupportController;

Route::middleware(['auth', 'verified', 'active', 'admin'])
    ->prefix('admin')
    ->as('admin.')
    ->group(function () {
        // Redirect '/admin' dynamically based on user's role
        Route::get('/', function() {
            $user = auth()->user();
            if ($user->role === \App\Enums\UserRole::SUPER_ADMIN || $user->role === \App\Enums\UserRole::ADMIN) {
                return redirect()->route('admin.cars.index');
            } elseif ($user->role === \App\Enums\UserRole::OWNER) {
                return redirect()->route('admin.reports.index');
            }
            abort(403);
        })->name('home');

        // Cars
        Route::resource('cars', CarsController::class)->except(['show']);

        // Reservations
        Route::resource('reservations', ReservationsController::class)->only(['index', 'show', 'edit', 'update']);
        Route::get('reservations/{reservation}/print', [ReservationsController::class, 'print'])->name('reservations.print');
        Route::delete('reservations/{reservation}', [ReservationsController::class, 'destroy'])->name('reservations.destroy');

        // Clients (Menghapus ->only() agar fitur Create, Edit, Update, Delete terbuka)
        Route::resource('clients', ClientsController::class);
        
        // Mengubah patch menjadi post agar sesuai dengan request dari React/Inertia
        Route::post('clients/{client}/suspend', [ClientsController::class, 'suspend'])->name('clients.suspend');
        Route::post('clients/{client}/activate', [ClientsController::class, 'activate'])->name('clients.activate');
        Route::post('clients/{client}/chat', [ClientsController::class, 'startChat'])->name('clients.chat');

        // Payments
        Route::resource('payments', PaymentsController::class)->only(['index']);
        Route::delete('payments/{payment}', [PaymentsController::class, 'destroy'])->name('payments.destroy');

        // Reports
        Route::resource('reports', ReportsController::class)->except(['show']);

        // Drivers
        Route::resource('drivers', DriversController::class)->except(['show']);
        Route::resource('drivers', DriversController::class)->except(['show']);


        // Support
        Route::resource('support', SupportController::class)->only(['index']);
        Route::get('/support/tickets/{ticket}', [SupportController::class, 'show'])
            ->name('support.show');
        Route::post('/support/tickets/{ticket}/reply', [SupportController::class, 'reply'])
            ->name('support.reply');
        Route::post('/support/tickets/{ticket}/close', [SupportController::class, 'close'])
            ->name('support.close');
        Route::delete('/support/tickets/{ticket}', [SupportController::class, 'destroy'])
            ->name('support.tickets.destroy');
        
        // Maintenance
        Route::resource('maintenance', MaintenanceController::class);

        // Reminder
        Route::resource('reminders', VehicleReminderController::class)->except(['show']);
    });