import HomeLayout from '@/layouts/HomeLayout';
import { usePage, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Driver {
    id: number;
    name: string;
    phone: string;
}

interface Reservation {
    id: number;
    reservation_number: string;
    start_date: string;
    end_date: string;
    pickup_location: string;
    return_location: string;
    delivery_type: 'self_pickup' | 'delivery' | null;
    delivery_address: string | null;
    total_amount: string;
    subtotal: string;
    tax_amount: string;
    daily_rate: string;
    total_days: number;
    status: string;
    created_at: string;
    driver: Driver | null;
    car: {
        make: string;
        model: string;
        year: number;
        image_url: string;
        description: string;
        fuel_type: string;
    };
    user: {
        name: string;
        email: string;
    };
    payments: {
        id: number;
        status: string;
        payment_method: string;
        created_at: string;
    }[];
}

interface PageProps {
    reservation: Reservation;
    flash: { success?: string };
    [key: string]: any;
}

export default function BookingConfirmation() {
    const { props } = usePage<PageProps>();
    const { reservation, flash } = props;

    const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'cash'>('transfer');
    const [showSuccess, setShowSuccess] = useState(false);

    const hasPaid = reservation.payments && reservation.payments.length > 0;

    // Reactive: jalan ulang setiap kali payments atau flash berubah (termasuk setelah Inertia reload)
    useEffect(() => {
        if (hasPaid || flash?.success) {
            setShowSuccess(true);
        }
    }, [reservation.payments.length, flash?.success]);

    const { data, setData, post, processing, errors } = useForm({
        payment_proof: null as File | null,
        payment_method: 'transfer',
    });

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const handleMethodChange = (method: 'transfer' | 'cash') => {
        setPaymentMethod(method);
        setData('payment_method', method);
    };

    const handleTransferSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/client/reservations/${reservation.id}/payment`, {
            forceFormData: true,
            onSuccess: () => setShowSuccess(true),
        });
    };

    const handleCashSubmit = () => {
        post(`/client/reservations/${reservation.id}/payment`, {
            forceFormData: true,
            onSuccess: () => setShowSuccess(true),
        });
    };

    const subtotal  = parseFloat(reservation.subtotal);
    const total     = parseFloat(reservation.total_amount);
    const driverFee = total - subtotal;
    const hasDriver = !!reservation.driver;

    // ─── Layar Sukses ───────────────────────────────────────────────────────────
    if (showSuccess) {
        return (
            <HomeLayout>
                <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
                    <div className="max-w-md w-full mx-auto px-4 text-center">
                        <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-6">

                            <div className="flex justify-center">
                                <svg className="w-32 h-32" viewBox="0 0 100 100">
                                    <circle
                                        cx="50" cy="50" r="45"
                                        fill="none" stroke="#22c55e" strokeWidth="5"
                                        strokeDasharray="283" strokeDashoffset="283"
                                        style={{ animation: 'drawCircle 0.6s ease-out forwards' }}
                                    />
                                    <polyline
                                        points="28,52 42,66 72,36"
                                        fill="none" stroke="#22c55e" strokeWidth="6"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        strokeDasharray="60" strokeDashoffset="60"
                                        style={{ animation: 'drawCheck 0.4s ease-out 0.5s forwards' }}
                                    />
                                </svg>
                            </div>

                            <style>{`
                                @keyframes drawCircle { to { stroke-dashoffset: 0; } }
                                @keyframes drawCheck  { to { stroke-dashoffset: 0; } }
                                @keyframes fadeInUp {
                                    from { opacity: 0; transform: translateY(20px); }
                                    to   { opacity: 1; transform: translateY(0); }
                                }
                            `}</style>

                            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.8s both' }}>
                                <h1 className="text-3xl font-extrabold text-gray-900">Pembayaran Terkirim!</h1>
                                <p className="mt-2 text-gray-500">
                                    Pembayaran untuk reservasi{' '}
                                    <span className="font-bold text-blue-600">#{reservation.reservation_number}</span>{' '}
                                    sedang menunggu konfirmasi admin.
                                </p>
                            </div>

                            <div
                                style={{ animation: 'fadeInUp 0.5s ease-out 1s both' }}
                                className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-700 text-left space-y-1"
                            >
                                <p className="font-semibold">Langkah selanjutnya:</p>
                                <p>• Admin akan memverifikasi pembayaran Anda</p>
                                <p>• Status reservasi akan diperbarui jika admin telah mengonfirmasi pembayaran</p>
                                <p>• Admin/Sopir akan segera menghubungi Anda</p>
                            </div>

                            <div style={{ animation: 'fadeInUp 0.5s ease-out 1.1s both' }} className="space-y-3">
                                <Link
                                    href="/client/reservations"
                                    className="block w-full rounded-xl bg-blue-600 px-6 py-3.5 text-center font-bold text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 hover:bg-blue-700 transition-all"
                                >
                                    Lihat Pesanan Saya
                                </Link>
                                <Link
                                    href="/fleet"
                                    className="block w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-3.5 text-center font-bold text-gray-700 hover:border-blue-200 hover:bg-blue-50 transition-all"
                                >
                                    Cari Mobil Lain
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        );
    }

    // ─── Halaman Pembayaran & Konfirmasi ────────────────────────────────────────
    return (
        <HomeLayout>
            <div className="min-h-screen bg-slate-50 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">

                    {/* Header */}
                    <div className="mb-12 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 shadow-lg shadow-blue-500/20">
                            <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-4xl font-extrabold text-gray-900 tracking-tight">Konfirmasi Pembayaran</h1>
                        <p className="text-lg font-medium text-gray-600">
                            Kode Reservasi:{' '}
                            <span className="font-bold text-blue-600">#{reservation.reservation_number}</span>
                        </p>
                        <p className="mt-1 text-sm text-gray-500">Selesaikan pembayaran untuk mengkonfirmasi reservasi Anda</p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">

                            {/* Detail Kendaraan */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h2 className="mb-6 text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                                    Detail Kendaraan
                                </h2>
                                <div className="flex flex-col sm:flex-row items-start gap-6">
                                    <img
                                        src={reservation.car.image_url}
                                        alt={`${reservation.car.make} ${reservation.car.model}`}
                                        className="h-32 w-full sm:w-48 rounded-xl object-cover shadow-sm"
                                    />
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {reservation.car.make} {reservation.car.model}{' '}
                                            <span className="text-gray-500 font-medium">({reservation.car.year})</span>
                                        </h3>
                                        <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-100 uppercase tracking-wider">
                                            {reservation.car.fuel_type}
                                        </span>
                                        <p className="text-sm text-gray-600 leading-relaxed">{reservation.car.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Informasi Sewa */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h2 className="mb-6 text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                                    Informasi Sewa
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">Jadwal</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                <span className="text-sm font-medium text-gray-600">Pengambilan</span>
                                                <span className="font-bold text-gray-900">{formatDate(reservation.start_date)}</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                <span className="text-sm font-medium text-gray-600">Pengembalian</span>
                                                <span className="font-bold text-gray-900">{formatDate(reservation.end_date)}</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                <span className="text-sm font-medium text-gray-600">Durasi</span>
                                                <span className="font-bold text-gray-900">{reservation.total_days} Hari</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
                                            Pengambilan
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                <span className="text-sm font-medium text-gray-600">Metode</span>
                                                <span className="font-bold text-gray-900">
                                                    {reservation.delivery_type === 'delivery'
                                                        ? 'Diantar ke Lokasi'
                                                        : 'Ambil Sendiri'}
                                                </span>
                                            </div>
                                            {reservation.delivery_type === 'delivery' && reservation.delivery_address && (
                                                <div className="rounded-lg bg-gray-50 p-3">
                                                    <span className="text-sm font-medium text-gray-600">Alamat</span>
                                                    <p className="mt-1 font-bold text-gray-900">{reservation.delivery_address}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Sopir */}
                                {hasDriver && reservation.driver && (
                                    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                                        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-700">Sopir</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg shrink-0">
                                                {reservation.driver.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{reservation.driver.name}</p>
                                                <p className="text-sm text-gray-500">{reservation.driver.phone}</p>
                                            </div>
                                            <div className="ml-auto text-right">
                                                <p className="text-xs text-blue-600 font-medium">Biaya Sopir</p>
                                                <p className="font-bold text-gray-900">{formatCurrency(driverFee)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Ringkasan + Form Pembayaran */}
                        <div className="space-y-6">

                            {/* Ringkasan Biaya */}
                            <div className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-6 shadow-sm">
                                <h2 className="mb-4 text-xl font-bold text-gray-900">Ringkasan Biaya</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Tarif Mobil ({reservation.total_days} hari)</span>
                                        <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
                                    </div>
                                    {hasDriver && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                Biaya Sopir ({reservation.total_days} hari)
                                            </span>
                                            <span className="font-semibold text-gray-900">{formatCurrency(driverFee)}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between pt-2 border-t border-blue-100">
                                        <span className="text-sm font-medium text-gray-600">Status</span>
                                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
                                            {String(reservation.status)}
                                        </span>
                                    </div>
                                    <div className="border-t border-blue-100 pt-3">
                                        <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
                                            Total Tagihan
                                        </span>
                                        <span className="mt-1 block text-3xl font-extrabold text-blue-600">
                                            {formatCurrency(total)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Pembayaran */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-bold text-gray-900">Metode Pembayaran</h2>

                                {/* Pilihan Metode */}
                                <div className="mb-5 grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleMethodChange('transfer')}
                                        className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all ${
                                            paymentMethod === 'transfer'
                                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                                        }`}
                                    >
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm font-bold">Transfer Bank</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleMethodChange('cash')}
                                        className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all ${
                                            paymentMethod === 'cash'
                                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                                        }`}
                                    >
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M5 12a7 7 0 1014 0 7 7 0 10-14 0z" />
                                        </svg>
                                        <span className="text-sm font-bold">Bayar di Tempat</span>
                                    </button>
                                </div>

                                {/* Konten per metode */}
                                {paymentMethod === 'transfer' ? (
                                    <>
                                        <div className="mb-4 rounded-xl bg-blue-50 border border-blue-100 p-3">
                                            <p className="text-xs font-semibold text-blue-700 mb-1">Info Rekening Tujuan</p>
                                            <p className="text-sm font-bold text-gray-900">BCA — 1234567890</p>
                                            <p className="text-xs text-gray-500">a.n. Bintang Travel</p>
                                        </div>
                                        <form onSubmit={handleTransferSubmit} className="space-y-4">
                                            <div>
                                                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                                    Unggah Bukti Transfer
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setData('payment_proof', e.target.files?.[0] || null)}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                />
                                                {errors.payment_proof && (
                                                    <p className="mt-1 text-red-500 text-xs">{errors.payment_proof}</p>
                                                )}
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={processing || !data.payment_proof}
                                                className="w-full rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {processing ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                                        </svg>
                                                        Mengunggah...
                                                    </span>
                                                ) : 'Unggah Bukti Bayar'}
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-4 rounded-xl bg-amber-50 border border-amber-100 p-3">
                                            <p className="text-xs font-semibold text-amber-700 mb-1">Perhatian</p>
                                            <p className="text-sm text-amber-800">
                                                Pembayaran tunai dilakukan langsung di lokasi pengambilan kendaraan.
                                                Pastikan Anda membawa uang pas sebesar{' '}
                                                <strong>{formatCurrency(total)}</strong>.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleCashSubmit}
                                            disabled={processing}
                                            className="w-full rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                                    </svg>
                                                    Memproses...
                                                </span>
                                            ) : 'Konfirmasi Bayar Cash'}
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="space-y-3">
                                <Link
                                    href="/client/reservations"
                                    className="block w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-3.5 text-center font-bold text-gray-700 hover:border-blue-200 hover:bg-blue-50 transition-all"
                                >
                                    Lihat Pesanan Saya
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}