import HomeLayout from '@/layouts/HomeLayout';
import { Head, Link, router } from '@inertiajs/react';
import { LifeBuoy } from 'lucide-react';

interface ReservationItem {
    id: number;
    reservation_number: string;
    car: {
        id: number;
        make: string;
        model: string;
        year: number;
        license_plate: string;
    } | null;
    start_date: string;
    end_date: string;
    total_days: number;
    total_amount: number | string;
    status: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    reservations: {
        data: ReservationItem[];
        links: PaginationLink[];
    };
    currency?: { symbol: string; code: string };
}

export default function Reservations({ reservations }: Props) {
    const navigateToReservation = (id: number) => {
        router.visit(`/client/reservations/${id}`);
    };

    const formatCurrency = (amount: number | string) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(Number(amount));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <HomeLayout>
            <Head title="Reservasi" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Reservasi Anda</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Kelola dan pantau seluruh riwayat penyewaan kendaraan Anda.
                            </p>
                        </div>
                        <Link
                            href="/client/support"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
                        >
                            <LifeBuoy className="h-4 w-4" />
                            Pusat Bantuan
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                                            No. Pesanan
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                                            Kendaraan
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                                            Periode Sewa
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                                            Total Biaya
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 bg-white">
                                    {reservations.data.map((res) => (
                                        <tr
                                            key={res.id}
                                            onClick={() => navigateToReservation(res.id)}
                                            className="group cursor-pointer transition-colors hover:bg-blue-50/50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-blue-600 group-hover:text-blue-700">
                                                    {res.reservation_number}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">
                                                    {res.car
                                                        ? `${res.car.make} ${res.car.model} ${res.car.year}`
                                                        : '—'}
                                                </div>
                                                <div className="mt-1 inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 uppercase tracking-widest border border-gray-200">
                                                    {res.car?.license_plate}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900 flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                    </svg>
                                                    {formatDate(res.start_date)} <span className="text-gray-400">→</span> {formatDate(res.end_date)}
                                                </div>
                                                <div className="mt-1 text-xs font-medium text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded-full">
                                                    Durasi: {res.total_days} Hari
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-bold text-gray-900">
                                                    {formatCurrency(res.total_amount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                                                        res.status === 'confirmed'
                                                            ? 'bg-green-100 text-green-700 border border-green-200'
                                                            : res.status === 'pending'
                                                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                                            : res.status === 'cancelled'
                                                            ? 'bg-red-100 text-red-700 border border-red-200'
                                                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                                                    }`}
                                                >
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${
                                                            res.status === 'confirmed'
                                                                ? 'bg-green-500'
                                                                : res.status === 'pending'
                                                                ? 'bg-amber-500'
                                                                : res.status === 'cancelled'
                                                                ? 'bg-red-500'
                                                                : 'bg-gray-500'
                                                        }`}
                                                    ></span>
                                                    {res.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}

                                    {reservations.data.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                                                        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Belum Ada Reservasi</h3>
                                                    <p className="text-gray-500">Anda belum melakukan pemesanan kendaraan apa pun.</p>
                                                    <Link href="/fleet" className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800">
                                                        Lihat Armada Kami <span aria-hidden="true" className="ml-1">→</span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {reservations.links && reservations.links.length > 0 && (
                        <nav className="flex justify-center gap-2 mt-8">
                            {reservations.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
                                        link.active
                                            ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                                    } ${!link.url ? 'pointer-events-none opacity-50 bg-gray-50' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}