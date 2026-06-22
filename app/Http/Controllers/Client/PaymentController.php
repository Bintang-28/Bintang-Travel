<?php

namespace App\Http\Controllers\Client;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    /**
     * Store a payment (cash or bank transfer) for the given reservation.
     */
    public function store(Request $request, Reservation $reservation)
    {
        // Only the owner of the reservation can pay for it
        if ($reservation->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'payment_method' => ['required', 'in:cash,transfer'],
            'payment_proof' => ['nullable', 'required_if:payment_method,transfer', 'file', 'image', 'max:5120'],
            ]);

        $method = $validated['payment_method'] === 'transfer'
            ? PaymentMethod::BANK_TRANSFER
            : PaymentMethod::CASH;

        $proofPath = null;
        if ($request->hasFile('payment_proof')) {
            $proofPath = $request->file('payment_proof')->store('payment-proofs', 'public');
        }

        $reservation->payments()->create([
            'user_id'        => Auth::id(),
            'amount'         => $reservation->total_amount,
            'currency'       => config('app.currency_code', 'IDR'),
            'payment_method' => $method,
            'status'         => PaymentStatus::PENDING,
            'proof_path'     => $proofPath,
        ]);

        return redirect()
            ->route('booking.confirmation', $reservation->id)
            ->with('success', 'Pembayaran berhasil dikirim. Menunggu konfirmasi admin.');
    }
}