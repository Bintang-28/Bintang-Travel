import { Head, Link, useForm } from '@inertiajs/react';
import logobintangtravel from '@/assets/logobintangtravel.png';

interface Props {
    email: string;
    status?: string;
}

export default function VerifyOtp({ email, status }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        otp: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register/verify-otp');
    };

    const handleResend = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register/resend-otp');
    };

    const otpResent = status === 'otp-resent';

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Verifikasi Kode OTP" />

            {/* Glowing Decorative Background */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-600/20 opacity-50 blur-3xl mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-indigo-600/20 opacity-50 blur-3xl mix-blend-screen pointer-events-none" />

            <div className="relative w-full max-w-md">
                {/* Brand Logo Header */}
                <div className="mb-8 flex flex-col items-center justify-center text-center">
                    <Link href="/" className="flex items-center space-x-3 transition-transform hover:scale-105 duration-300">
                        <img
                            src={logobintangtravel}
                            alt="Logo Bintang Travel"
                            className="h-16 w-16 object-contain"
                        />
                        <div>
                            <span className="text-2xl font-black tracking-tight text-white block">
                                Bintang<span className="text-blue-500">Travel</span>
                            </span>
                            <span className="text-[9px] font-bold tracking-widest text-blue-400 block uppercase">
                                Premium Car Rental
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Main Card */}
                <div className="overflow-hidden rounded-3xl border border-white/5 bg-slate-950/40 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-extrabold text-white">Verifikasi OTP</h1>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                            Kami telah mengirimkan 6 digit kode OTP ke email <strong className="text-blue-400 underline">{email}</strong>. Harap masukkan kode tersebut untuk mengaktifkan akun Anda.
                        </p>
                    </div>

                    {otpResent && (
                        <div className="mb-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4 text-center text-xs font-semibold text-emerald-400">
                            Kode OTP baru berhasil dikirimkan ke alamat email Anda.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="otp" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                Kode OTP 6-Digit
                            </label>
                            <input
                                id="otp"
                                type="text"
                                maxLength={6}
                                placeholder="******"
                                value={data.otp}
                                onChange={(e) => setData('otp', e.target.value.replace(/[^0-9]/g, ''))}
                                className={`w-full rounded-xl border bg-slate-900/50 px-4 py-4 text-center text-2xl font-bold tracking-widest text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${
                                    errors.otp 
                                        ? 'border-red-500/30 focus:border-red-500' 
                                        : 'border-white/10 focus:border-blue-500'
                                }`}
                            />
                            {errors.otp && <p className="mt-2 text-xs font-semibold text-red-500">{errors.otp}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing || data.otp.length !== 6}
                            className={`w-full cursor-pointer rounded-xl bg-blue-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed`}
                        >
                            {processing ? 'Memproses...' : 'Verifikasi Kode OTP'}
                        </button>
                    </form>

                    <div className="mt-8 border-t border-white/5 pt-6 text-center">
                        <p className="text-xs text-slate-400">
                            Tidak menerima kode OTP?{' '}
                            <button
                                onClick={handleResend}
                                disabled={processing}
                                className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Kirim Ulang OTP
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
