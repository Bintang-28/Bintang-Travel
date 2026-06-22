import HomeLayout from '@/layouts/HomeLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { FileDown, Calendar, MapPin, Car, CreditCard, ChevronLeft, User } from 'lucide-react';
import { print as printReservation } from '@/routes/client/reservations';

interface CarDetails {
    id: number;
    make: string;
    model: string;
    year: number;
    license_plate: string;
    image_url: string;
    fuel_type: string;
}

interface DriverDetails {
    id: number;
    name: string;
    phone: string;
    license_number: string;
    photo: string | null;
}

interface Reservation {
    id: number;
    reservation_number: string;
    start_date: string;
    end_date: string;
    pickup_time: string | null;
    return_time: string | null;
    pickup_location: string;
    return_location: string;
    total_days: number;
    daily_rate: string | number;
    subtotal: string | number;
    discount_amount: string | number | null;
    total_amount: string | number;
    status: string;
    notes: string | null;
    car: CarDetails | null;
    driver: DriverDetails | null;
}

interface PageProps {
    reservation: Reservation;
    [key: string]: any;
}

export default function ClientReservationShow() {
    const { props } = usePage<PageProps>();
    const { reservation } = props;

    const formatCurrency = (amount: number | string) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(Number(amount));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-700 border-green-200 ring-green-500/20';
            case 'pending':   return 'bg-amber-100 text-amber-700 border-amber-200 ring-amber-500/20';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200 ring-red-500/20';
            case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200 ring-blue-500/20';
            default:          return 'bg-gray-100 text-gray-700 border-gray-200 ring-gray-500/20';
        }
    };

    // Biaya sopir = total_amount - subtotal + discount (agar tidak terpotong diskon)
    const driverFee = reservation.driver
        ? Number(reservation.total_amount)
          - Number(reservation.subtotal)
          + Number(reservation.discount_amount ?? 0)
        : 0;

    const handlePrint = () => {
        window.open(printReservation(reservation.id).url, '_blank');
    };

    if (!reservation) {
        return (
            <HomeLayout>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center text-gray-500">
                        <h2 className="text-2xl font-bold text-gray-900">Data Tidak Ditemukan</h2>
                        <p className="mt-2">Reservasi yang Anda cari tidak ada atau telah dibatalkan.</p>
                        <Link href="/client/reservations" className="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700">
                            Kembali ke Daftar Pesanan
                        </Link>
                    </div>
                </div>
            </HomeLayout>
        );
    }

    return (
        <HomeLayout>
            <Head title={`Detail Reservasi #${reservation.reservation_number}`} />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                    {/* Header Controls */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            href="/client/reservations"
                            className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Kembali
                        </Link>

                        <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider border ring-2 ring-offset-1 ${getStatusColor(reservation.status)}`}>
                                <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                                {reservation.status}
                            </span>
                            <button
                                onClick={handlePrint}
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <FileDown className="h-4 w-4" />
                                Cetak Bukti
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="grid gap-6 lg:grid-cols-3 items-start">

                        {/* ── Kolom Kiri (2/3) ── */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Card Kendaraan */}
                            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                                <div className="border-b border-gray-100 bg-slate-50/50 px-6 py-4 flex items-center gap-2">
                                    <Car className="h-5 w-5 text-blue-600" />
                                    <h2 className="text-lg font-bold text-gray-900">Armada Pilihan Anda</h2>
                                </div>
                                <div className="p-6">
                                    {reservation.car ? (
                                        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                                            {reservation.car.image_url ? (
                                                <img
                                                    src={reservation.car.image_url}
                                                    alt={reservation.car.model}
                                                    className="w-full sm:w-48 h-32 rounded-xl object-cover shadow-sm border border-gray-100"
                                                />
                                            ) : (
                                                <div className="w-full sm:w-48 h-32 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                                                    <Car className="h-10 w-10 opacity-50" />
                                                </div>
                                            )}
                                            <div className="flex-1 space-y-3 w-full text-center sm:text-left">
                                                <h3 className="text-2xl font-black text-gray-900">
                                                    {reservation.car.make} {reservation.car.model}
                                                </h3>
                                                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                                    <span className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200">
                                                        Tahun {reservation.car.year}
                                                    </span>
                                                    <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100 uppercase tracking-wider">
                                                        {reservation.car.license_plate}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">Informasi kendaraan tidak tersedia atau telah dihapus dari sistem.</p>
                                    )}
                                </div>
                            </div>

                            {/* Card Jadwal */}
                            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                                <div className="border-b border-gray-100 bg-slate-50/50 px-6 py-4 flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                    <h2 className="text-lg font-bold text-gray-900">Jadwal Perjalanan</h2>
                                </div>
                                <div className="p-6 grid sm:grid-cols-2 gap-8 relative">
                                    <div className="hidden sm:block absolute left-1/2 top-10 bottom-10 w-px bg-gray-100 -translate-x-1/2"></div>

                                    {/* Pengambilan */}
                                    <div className="space-y-4 relative">
                                        <div className="absolute -left-3 top-0 h-6 w-1 rounded-r-md bg-blue-600"></div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Jadwal Pengambilan</p>
                                            <p className="text-base font-bold text-gray-900">{formatDate(reservation.start_date)}</p>
                                            <p className="text-sm font-medium text-gray-600 mt-0.5">Pukul {reservation.pickup_time ? reservation.pickup_time.substring(0, 5) : '08:00'} WIB</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5" /> Lokasi Jemput
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 bg-slate-50 p-3 rounded-xl border border-gray-100 mt-1">
                                                {reservation.pickup_location}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Pengembalian */}
                                    <div className="space-y-4 relative">
                                        <div className="absolute -left-3 top-0 h-6 w-1 rounded-r-md bg-cyan-500"></div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Jadwal Pengembalian</p>
                                            <p className="text-base font-bold text-gray-900">{formatDate(reservation.end_date)}</p>
                                            <p className="text-sm font-medium text-gray-600 mt-0.5">Pukul {reservation.return_time ? reservation.return_time.substring(0, 5) : '20:00'} WIB</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5" /> Lokasi Kembali
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 bg-slate-50 p-3 rounded-xl border border-gray-100 mt-1">
                                                {reservation.return_location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Sopir */}
                            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                                <div className="border-b border-gray-100 bg-slate-50/50 px-6 py-4 flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    <h2 className="text-lg font-bold text-gray-900">Informasi Sopir</h2>
                                </div>
                                <div className="p-6">
                                    {reservation.driver ? (
                                        <div className="flex items-center gap-4">
                                            {reservation.driver.photo ? (
                                                <img
                                                    src={reservation.driver.photo}
                                                    alt={reservation.driver.name}
                                                    className="h-14 w-14 rounded-full object-cover border border-gray-200"
                                                />
                                            ) : (
                                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shrink-0">
                                                    {reservation.driver.name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="text-base font-bold text-gray-900">{reservation.driver.name}</p>
                                                <p className="text-sm text-gray-600">{reservation.driver.phone}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">No. SIM: {reservation.driver.license_number}</p>
                                            </div>
                                            {/* Biaya sopir di card sopir */}
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400 mb-0.5">Biaya Sopir</p>
                                                <p className="text-base font-bold text-blue-600">{formatCurrency(driverFee)}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">Perjalanan ini tanpa sopir (Self Drive).</p>
                                    )}
                                </div>
                            </div>

                            {/* Card Catatan */}
                            {reservation.notes && (
                                <div className="rounded-2xl border border-amber-100 bg-amber-50/30 p-6">
                                    <h3 className="text-sm font-bold text-amber-900 mb-2">Catatan Khusus:</h3>
                                    <p className="text-sm text-amber-800 leading-relaxed">{reservation.notes}</p>
                                </div>
                            )}
                        </div>

                        {/* ── Kolom Kanan (1/3) — Rincian Biaya ── */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-900/5">
                                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 px-6 py-5 text-white">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CreditCard className="h-5 w-5 opacity-80" />
                                        <h2 className="text-lg font-bold">Rincian Pembayaran</h2>
                                    </div>
                                    <p className="text-blue-100 text-xs font-medium uppercase tracking-wider">Kode: #{reservation.reservation_number}</p>
                                </div>

                                <div className="p-6 space-y-4">
                                    {/* Tarif harian & durasi */}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium">Harga Sewa / Hari</span>
                                        <span className="font-semibold text-gray-900">{formatCurrency(reservation.daily_rate)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium">Durasi Sewa</span>
                                        <span className="font-semibold text-gray-900 bg-slate-100 px-2 py-0.5 rounded-md">{reservation.total_days} Hari</span>
                                    </div>

                                    <div className="h-px bg-gray-100" />

                                    {/* Subtotal sewa */}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium">Subtotal Sewa</span>
                                        <span className="font-semibold text-gray-900">{formatCurrency(reservation.subtotal)}</span>
                                    </div>

                                    {/* Biaya sopir — hanya tampil jika ada sopir */}
                                    {reservation.driver && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 font-medium">
                                                Biaya Sopir
                                                <span className="ml-1 text-xs text-gray-400">({reservation.driver.name})</span>
                                            </span>
                                            <span className="font-semibold text-gray-900">{formatCurrency(driverFee)}</span>
                                        </div>
                                    )}

                                    {/* Diskon — hanya tampil jika ada */}
                                    {Number(reservation.discount_amount) > 0 && (
                                        <div className="flex justify-between items-center text-sm text-green-600">
                                            <span className="font-medium">Potongan Diskon</span>
                                            <span className="font-bold">-{formatCurrency(reservation.discount_amount!)}</span>
                                        </div>
                                    )}

                                    <div className="h-px bg-gray-200 border-dashed border-b my-4" />

                                    {/* Total */}
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Total Tagihan</span>
                                        <span className="text-3xl font-black text-blue-600">{formatCurrency(reservation.total_amount)}</span>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 border-t border-gray-100 text-center">
                                    <p className="text-xs font-medium text-gray-500">
                                        Butuh bantuan terkait pesanan ini?{' '}
                                        <Link href="/client/support" className="text-blue-600 font-bold hover:underline">Hubungi Admin</Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}