<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => 'required|string|max:20|unique:users,phone',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Simpan data pendaftaran sementara ke session
        $request->session()->put('register_data', [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        // Generate OTP
        $otp = (string) rand(100000, 999999);
        $request->session()->put('register_otp', $otp);
        $request->session()->put('register_otp_expires_at', now()->addMinutes(10));

        // Kirim email OTP
        \Illuminate\Support\Facades\Mail::to($request->email)->send(new \App\Mail\RegisterOtpMail($otp));

        return to_route('register.verify_otp');
    }

    /**
     * Show OTP verification page.
     */
    public function showVerifyOtp(Request $request): Response|RedirectResponse
    {
        $registerData = $request->session()->get('register_data');

        if (!$registerData) {
            return to_route('register');
        }

        return Inertia::render('auth/VerifyOtp', [
            'email' => $registerData['email'],
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Verify the user-provided OTP code.
     */
    public function verifyOtp(Request $request): RedirectResponse
    {
        $request->validate([
            'otp' => 'required|string|size:6',
        ]);

        $registerData = $request->session()->get('register_data');
        $otp = $request->session()->get('register_otp');
        $expiresAt = $request->session()->get('register_otp_expires_at');

        if (!$registerData || !$otp || !$expiresAt) {
            return to_route('register');
        }

        if (now()->greaterThan($expiresAt)) {
            return back()->withErrors(['otp' => 'Kode OTP telah kedaluwarsa. Silakan kirim ulang kode baru.']);
        }

        if ($request->otp !== $otp) {
            return back()->withErrors(['otp' => 'Kode OTP yang Anda masukkan salah.']);
        }

        // OTP Valid - buat akun user
        $user = User::create([
            'name' => $registerData['name'],
            'email' => $registerData['email'],
            'phone' => $registerData['phone'],
            'password' => $registerData['password'],
            'role' => UserRole::CLIENT,
        ]);

        event(new Registered($user));

        // Login user secara otomatis
        Auth::login($user);

        // Hapus session data pendaftaran sementara
        $request->session()->forget(['register_data', 'register_otp', 'register_otp_expires_at']);

        return to_route('home');
    }

    /**
     * Resend registration verification OTP.
     */
    public function resendOtp(Request $request): RedirectResponse
    {
        $registerData = $request->session()->get('register_data');

        if (!$registerData) {
            return to_route('register');
        }

        // Generate kode OTP baru
        $otp = (string) rand(100000, 999999);
        $request->session()->put('register_otp', $otp);
        $request->session()->put('register_otp_expires_at', now()->addMinutes(10));

        // Kirim ulang email
        \Illuminate\Support\Facades\Mail::to($registerData['email'])->send(new \App\Mail\RegisterOtpMail($otp));

        return back()->with('status', 'otp-resent');
    }
}
