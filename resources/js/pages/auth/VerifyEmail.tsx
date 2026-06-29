import HomeLayout from '@/layouts/HomeLayout';
import { Head, router, useForm } from '@inertiajs/react';

interface Props {
    status?: string;
}

export default function VerifyEmail({ status }: Props) {
    const form = useForm({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/email/verification-notification');
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const verificationLinkSent = status === 'verification-link-sent';

    return (
        <HomeLayout>
            <Head title="Verifikasi Email" />

            <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
                {/* Animated Background Blobs */}
                <div className="absolute -left-20 -top-20 h-96 w-96 animate-pulse rounded-full bg-blue-300 opacity-20 blur-[100px]" style={{ animationDuration: '4s' }}></div>
                <div className="absolute -bottom-20 -right-20 h-96 w-96 animate-pulse rounded-full bg-cyan-300 opacity-20 blur-[100px]" style={{ animationDuration: '5s' }}></div>

                {/* Main Card */}
                <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-blue-900/10 transition-all duration-300 hover:shadow-blue-900/20 md:flex-row flex-col">
                    
                    {/* LEFT PANEL - Branding (Hidden on small screens) */}
                    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-12 text-white md:flex">
                        {/* Abstract Decorative Circles */}
                        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[30px] border-white/10"></div>
                        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full border-[40px] border-white/10"></div>
                        
                        <div className="relative z-10">
                            <div className="mb-12 inline-flex items-center gap-3 rounded-2xl bg-white/20 px-4 py-2 backdrop-blur-md border border-white/30 shadow-lg">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="font-bold tracking-wide">Bintang<span className="text-cyan-200">Travel</span></span>
                            </div>

                            <h2 className="mt-8 text-4xl font-extrabold leading-tight text-white drop-shadow-md lg:text-5xl">
                                Selangkah Lagi<br />
                                <span className="text-cyan-200">Untuk Memulai.</span>
                            </h2>
                            <p className="mt-6 max-w-sm text-lg font-medium text-blue-100">
                                Harap verifikasi alamat email Anda agar Anda dapat mengaktifkan akun dan mengakses seluruh fitur pemesanan armada kami.
                            </p>
                        </div>

                        <div className="relative z-10 mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                                        <svg className="h-5 w-5 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-bold text-white">Verifikasi Keamanan</p>
                                </div>
                                <p className="text-sm text-blue-100 leading-relaxed">
                                    Proses verifikasi ini memastikan keamanan informasi akun Anda selama menggunakan layanan kami.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL - Verification Status and Form */}
                    <div className="flex w-full flex-col justify-center p-8 sm:p-12 md:w-1/2 lg:p-16">
                        
                        {/* Mobile Logo */}
                        <div className="mb-8 flex items-center gap-2 md:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Bintang<span className="text-blue-500">Travel</span></span>
                        </div>

                        {/* Mail Box Icon */}
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <svg className="h-10 w-10 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
                            </svg>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold text-gray-900">Verifikasi Email Anda</h1>
                            <p className="mt-4 font-medium text-gray-600 leading-relaxed text-sm">
                                Terima kasih telah mendaftar! Sebelum memulai perjalanan Anda bersama BintangTravel, silakan verifikasi alamat email Anda dengan mengeklik tautan yang baru saja kami kirimkan ke email Anda.
                            </p>
                            <p className="mt-3 font-medium text-gray-500 leading-relaxed text-sm">
                                Jika Anda tidak menerima email tersebut, klik tombol di bawah ini untuk mengirimkan tautan verifikasi baru.
                            </p>
                        </div>

                        {verificationLinkSent && (
                            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm">
                                <p className="text-sm font-bold text-green-800 text-center">
                                    Tautan verifikasi baru telah dikirimkan ke alamat email yang Anda gunakan saat mendaftar.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-blue-600 px-4 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {form.processing ? (
                                        <>
                                            <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Mengirim Ulang...
                                        </>
                                    ) : (
                                        'Kirim Ulang Email Verifikasi'
                                    )}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-sm font-bold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none"
                            >
                                Keluar (Log Out)
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
