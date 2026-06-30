<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\ReservationsController;
use App\Http\Controllers\Client\SupportController;
use App\Http\Controllers\Client\PaymentController;

Route::middleware(['auth', 'verified', 'active', 'client'])
    ->prefix('client')
    ->as('client.')
    ->group(function () {
        // Redirect '/client' to '/client/reservations' with a named route we can reference
        Route::redirect('/', '/client/reservations')->name('home');
        Route::get('/reservations', [ReservationsController::class, 'index'])->name('reservations.index');
        Route::get('/reservations/{id}', [ReservationsController::class, 'show'])->name('reservations.show');
        Route::get('/reservations/{id}/print', [ReservationsController::class, 'print'])->name('reservations.print');
        Route::post('/reservations/{reservation}/payment', [PaymentController::class, 'store'])->name('reservations.payment');

        // Support
        Route::get('/support', [SupportController::class, 'index'])->name('support.index');
        Route::get('/support/create', [SupportController::class, 'create'])->name('support.create');
        Route::post('/support', [SupportController::class, 'store'])->name('support.store');
        Route::get('/support/{id}', [SupportController::class, 'show'])->name('support.show');
        Route::post('/support/{id}/reply', [SupportController::class, 'reply'])->name('support.reply');

    });

// Support Chat API (Available to all logged-in users, even admins for testing)
Route::middleware(['auth', 'verified', 'active'])
    ->prefix('client')
    ->as('client.')
    ->group(function () {
        Route::get('/support-chat/active', [SupportController::class, 'getActiveChat'])->name('support.chat.active');
        Route::post('/support-chat/create', [SupportController::class, 'startChat'])->name('support.chat.create');
        Route::post('/support-chat/{id}/reply', [SupportController::class, 'replyJson'])->name('support.chat.reply');
    });