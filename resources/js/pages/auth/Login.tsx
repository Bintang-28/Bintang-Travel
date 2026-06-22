import HomeLayout from '@/layouts/HomeLayout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: Props) {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/login', {
            onFinish: () => form.reset('password'),
        });
    };

    return (
        <HomeLayout>
            <Head title="Masuk Akun" />

            <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
                {/* Animated Background Blobs */}
                <div className="absolute -left-20 -top-20 h-96 w-96 animate-pulse rounded-full bg-blue-300 opacity-20 blur-[100px]" style={{ animationDuration: '4s' }}></div>
                <div className="absolute -bottom-20 -right-20 h-96 w-96 animate-pulse rounded-full bg-cyan-300 opacity-20 blur-[100px]" style={{ animationDuration: '5s' }}></div>

                {/* Main Split Card */}
                <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-blue-900/10 transition-all duration-300 hover:shadow-blue-900/20 md:flex-row flex-col">
                    
                    {/* LEFT PANEL - Colorful Branding (Hidden on small screens) */}
                    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-12 text-white md:flex">
                        {/* Abstract Decorative Circles */}
                        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[30px] border-white/10 transition-transform duration-700 hover:scale-110"></div>
                        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full border-[40px] border-white/10 transition-transform duration-700 hover:scale-110"></div>
                        
                        <div className="relative z-10">
                            <div className="mb-12 inline-flex items-center gap-3 rounded-2xl bg-white/20 px-4 py-2 backdrop-blur-md border border-white/30 shadow-lg">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="font-bold tracking-wide">Bintang<span className="text-cyan-200">Travel</span></span>
                            </div>

                            <h2 className="mt-8 text-4xl font-extrabold leading-tight text-white drop-shadow-md lg:text-5xl">
                                Mulai Perjalanan<br />
                                <span className="text-cyan-200">Luar Biasa Anda.</span>
                            </h2>
                            <p className="mt-6 max-w-sm text-lg font-medium text-blue-100">
                                Akses akun Anda untuk mengelola reservasi, menjelajahi armada eksklusif, dan menikmati penawaran khusus member.
                            </p>
                        </div>

                        // GANTI MENJADI:
                        <div className="relative z-10 mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                                        <svg className="h-5 w-5 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-bold text-white">Perjalanan Aman & Terpercaya</p>
                                </div>
                                <p className="text-sm text-blue-100 leading-relaxed">
                                    Armada terawat dan pengemudi profesional siap menemani setiap perjalanan Anda.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL - Login Form */}
                    <div className="flex w-full flex-col justify-center p-8 sm:p-12 md:w-1/2 lg:p-16">
                        
                        {/* Mobile Logo (Only visible on mobile) */}
                        <div className="mb-8 flex items-center gap-2 md:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Bintang<span className="text-blue-500">Travel</span></span>
                        </div>

                        <div className="mb-10">
                            <h1 className="text-3xl font-extrabold text-gray-900">Selamat Datang!</h1>
                            <p className="mt-2 font-medium text-gray-500">Silakan masukkan detail akun Anda untuk masuk.</p>
                        </div>

                        {status && (
                            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center shadow-sm">
                                <p className="text-sm font-bold text-green-800">{status}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-700">Alamat Email</label>
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
                                        autoFocus
                                        tabIndex={1}
                                        placeholder="nama@email.com"
                                        value={form.data.email}
                                        onFocus={() => setIsEmailFocused(true)}
                                        onBlur={() => setIsEmailFocused(false)}
                                        onChange={(e) => form.setData('email', e.target.value)}
                                        className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 transition-all duration-300 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                                    />
                                </div>
                                {form.errors.email && <p className="mt-1.5 text-sm font-medium text-red-500">{form.errors.email}</p>}
                            </div>

                            {/* Password Input */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-bold text-gray-700">Kata Sandi</label>
                                    {canResetPassword && (
                                        <Link href={request().url} tabIndex={5} className="text-sm font-bold text-blue-600 transition-colors hover:text-cyan-500">
                                            Lupa Sandi?
                                        </Link>
                                    )}
                                </div>
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
                                        tabIndex={2}
                                        placeholder="••••••••"
                                        value={form.data.password}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                        onChange={(e) => form.setData('password', e.target.value)}
                                        className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 transition-all duration-300 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                                    />
                                </div>
                                {form.errors.password && <p className="mt-1.5 text-sm font-medium text-red-500">{form.errors.password}</p>}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center pt-2">
                                <label htmlFor="remember" className="group flex cursor-pointer items-center space-x-3">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            tabIndex={3}
                                            checked={form.data.remember}
                                            onChange={(e) => form.setData('remember', e.target.checked)}
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-300 bg-gray-50 transition-all checked:border-blue-600 checked:bg-blue-600 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        />
                                        <svg className="absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-600 transition-colors group-hover:text-gray-900">Ingat saya selama 30 hari</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                tabIndex={4}
                                disabled={form.processing}
                                className="group relative mt-4 flex w-full items-center justify-center overflow-hidden rounded-xl bg-blue-600 px-4 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {form.processing ? (
                                        <>
                                            <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            Masuk Sekarang
                                            <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </button>

                            {/* Sign Up Link */}
                            <div className="mt-8 text-center">
                                <p className="text-sm font-medium text-gray-600">
                                    Belum memiliki akun?
                                    <Link href={register().url} tabIndex={5} className="ml-1.5 font-bold text-blue-600 transition-colors hover:text-cyan-500">
                                        Daftar Gratis
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