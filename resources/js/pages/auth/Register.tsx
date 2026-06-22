import HomeLayout from '@/layouts/HomeLayout';
import { login } from '@/routes';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const form = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isConfirmFocused, setIsConfirmFocused] = useState(false);
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/register', {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };

    return (
        <HomeLayout>
            <Head title="Daftar Akun" />

            <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
                {/* Animated Background Blobs */}
                <div className="absolute -left-20 -bottom-20 h-96 w-96 animate-pulse rounded-full bg-cyan-300 opacity-20 blur-[100px]" style={{ animationDuration: '4s' }}></div>
                <div className="absolute -right-20 -top-20 h-96 w-96 animate-pulse rounded-full bg-blue-400 opacity-20 blur-[100px]" style={{ animationDuration: '5s' }}></div>

                {/* Main Split Card */}
                <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-blue-900/10 transition-all duration-300 hover:shadow-blue-900/20 md:flex-row flex-col">
                    
                    {/* LEFT PANEL */}
                    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-bl from-blue-700 via-blue-600 to-cyan-500 p-12 text-white md:flex">
                        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full border-[30px] border-white/10 transition-transform duration-700 hover:scale-110"></div>
                        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full border-[40px] border-white/10 transition-transform duration-700 hover:scale-110"></div>
                        
                        <div className="relative z-10">
                            <div className="mb-12 inline-flex items-center gap-3 rounded-2xl bg-white/20 px-4 py-2 backdrop-blur-md border border-white/30 shadow-lg">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="font-bold tracking-wide">Bintang<span className="text-cyan-200">Travel</span></span>
                            </div>

                            <h2 className="mt-8 text-4xl font-extrabold leading-tight text-white drop-shadow-md lg:text-5xl">
                                Bergabunglah<br />
                                <span className="text-cyan-200">Bersama Kami.</span>
                            </h2>
                            <p className="mt-6 max-w-sm text-lg font-medium text-blue-100">
                                Buat akun sekarang untuk menikmati kemudahan pemesanan, riwayat perjalanan, dan penawaran eksklusif khusus member.
                            </p>
                        </div>

                        <div className="relative z-10 mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400 text-blue-900 shadow-lg">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Terjamin & Terpercaya</p>
                                    <p className="text-xs font-medium text-blue-100">Privasi dan data Anda aman bersama kami.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL - Register Form */}
                    <div className="flex w-full flex-col justify-center p-8 sm:p-12 md:w-1/2 lg:p-16 bg-white/80 backdrop-blur-xl">
                        
                        <div className="mb-8 flex items-center gap-2 md:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Bintang<span className="text-blue-500">Travel</span></span>
                        </div>

                        <div className="mb-10">
                            <h1 className="text-3xl font-extrabold text-gray-900">Buat Akun Barumu Sekarang !</h1>
                            <p className="mt-2 font-medium text-gray-500">Lengkapi formulir di bawah ini untuk memulai perjalanan Anda.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Field */}
                            <div>
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 flex items-center pl-4 transition-colors duration-300 ${isNameFocused ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        placeholder=" "
                                        value={form.data.name}
                                        onFocus={() => setIsNameFocused(true)}
                                        onBlur={() => setIsNameFocused(false)}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        className="peer w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 transition-all duration-300 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                                    />
                                    {/* PERBAIKAN DI SINI: left-11 */}
                                    <label htmlFor="name" className="absolute left-11 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold cursor-text">
                                        Nama Lengkap
                                    </label>
                                </div>
                                {form.errors.name && <p className="mt-1.5 text-sm font-medium text-red-500">{form.errors.name}</p>}
                            </div>

                            {/* Email Field */}
                            <div>
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 flex items-center pl-4 transition-colors duration-300 ${isEmailFocused ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        placeholder=" "
                                        value={form.data.email}
                                        onFocus={() => setIsEmailFocused(true)}
                                        onBlur={() => setIsEmailFocused(false)}
                                        onChange={(e) => form.setData('email', e.target.value)}
                                        className="peer w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 transition-all duration-300 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                                    />
                                    {/* PERBAIKAN DI SINI: left-11 */}
                                    <label htmlFor="email" className="absolute left-11 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold cursor-text">
                                        Alamat Email
                                    </label>
                                </div>
                                {form.errors.email && <p className="mt-1.5 text-sm font-medium text-red-500">{form.errors.email}</p>}
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 flex items-center pl-4 transition-colors duration-300 ${isPasswordFocused ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        placeholder=" "
                                        value={form.data.password}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                        onChange={(e) => form.setData('password', e.target.value)}
                                        className="peer w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 transition-all duration-300 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                                    />
                                    {/* PERBAIKAN DI SINI: left-11 */}
                                    <label htmlFor="password" className="absolute left-11 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold cursor-text">
                                        Kata Sandi
                                    </label>
                                </div>
                                {form.errors.password && <p className="mt-1.5 text-sm font-medium text-red-500">{form.errors.password}</p>}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 flex items-center pl-4 transition-colors duration-300 ${isConfirmFocused ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        placeholder=" "
                                        value={form.data.password_confirmation}
                                        onFocus={() => setIsConfirmFocused(true)}
                                        onBlur={() => setIsConfirmFocused(false)}
                                        onChange={(e) => form.setData('password_confirmation', e.target.value)}
                                        className="peer w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 transition-all duration-300 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                                    />
                                    {/* PERBAIKAN DI SINI: left-11 */}
                                    <label htmlFor="password_confirmation" className="absolute left-11 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold cursor-text">
                                        Konfirmasi Kata Sandi
                                    </label>
                                </div>
                                {form.errors.password_confirmation && <p className="mt-1.5 text-sm font-medium text-red-500">{form.errors.password_confirmation}</p>}
                            </div>

                            {/* Phone Field */}
                            <div>
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 flex items-center pl-4 transition-colors duration-300 ${isPhoneFocused ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        required
                                        tabIndex={3}
                                        autoComplete="tel"
                                        placeholder=" "
                                        value={form.data.phone}
                                        onFocus={() => setIsPhoneFocused(true)}
                                        onBlur={() => setIsPhoneFocused(false)}
                                        onChange={(e) => form.setData('phone', e.target.value)}
                                        className="peer w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 transition-all duration-300 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                                    />
                                    <label htmlFor="phone" className="absolute left-11 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold cursor-text">
                                        Nomor Telepon
                                    </label>
                                </div>
                                {form.errors.phone && <p className="mt-1.5 text-sm font-medium text-red-500">{form.errors.phone}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                tabIndex={5}
                                disabled={form.processing}
                                className="group relative mt-6 flex w-full items-center justify-center overflow-hidden rounded-xl bg-blue-600 px-4 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {form.processing ? (
                                        <>
                                            <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Mendaftar...
                                        </>
                                    ) : (
                                        <>
                                            Daftar Sekarang
                                            <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </>
                                    )}
                                </span>
                            </button>

                            {/* Login Link */}
                            <div className="border-t border-gray-100 pt-6 text-center">
                                <p className="text-sm font-medium text-gray-600">
                                    Sudah memiliki akun?
                                    <Link
                                        href={login().url}
                                        tabIndex={6}
                                        className="ml-1.5 font-bold text-blue-600 transition-colors hover:text-cyan-500 hover:underline"
                                    >
                                        Masuk di sini
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}