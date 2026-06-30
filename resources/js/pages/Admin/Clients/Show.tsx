import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

// --- INTERFACES ---
interface Car {
    id: number;
    make: string;
    model: string;
    license_plate: string;
}

interface Reservation {
    id: number;
    reservation_number: string;
    start_date: string;
    end_date: string;
    total_amount: string | number;
    status: string;
    car: Car | null;
}

interface Client {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    role?: string;
    is_active: boolean;
    created_at: string;
}

interface Stats {
    total_reservations: number;
    total_payments: number;
    total_spent: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    client: Client;
    stats: Stats;
    reservations: {
        data: Reservation[];
        links: PaginationLink[];
    };
    payments: {
        data: any[];
        links: PaginationLink[];
    };
}

export default function ClientShow() {
    const { props } = usePage();
    const { client, stats, reservations } = props as unknown as Props;
    const [isProcessing, setIsProcessing] = useState(false);

    const roleLabels: Record<string, string> = {
        super_admin: 'Super Admin',
        admin: 'Admin (Data Input)',
        kepala_travel: 'Admin Reservasi',
        owner: 'Owner',
        client: 'Klien (Pelanggan)',
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

    const toggleStatus = () => {
        setIsProcessing(true);
        const action = client.is_active ? 'suspend' : 'activate';
        router.post(`/admin/clients/${client.id}/${action}`, {}, {
            preserveScroll: true,
            onFinish: () => setIsProcessing(false)
        });
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus akun klien ini secara permanen?')) {
            router.delete(`/admin/clients/${client.id}`);
        }
    };

    if (!client) return null;

    return (
        <AdminLayout>
            <Head title={`Detail Klien - ${client.name}`} />
            
            <main className="flex-1 p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen">
                {/* Header, Back Button, & Aksi CRUD */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/clients" 
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Profil Pengguna</h1>
                            <p className="text-sm text-gray-500 font-medium">Detail informasi dan riwayat aktivitas akun pelanggan.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={`/admin/clients/${client.id}/edit`}
                            className="inline-flex items-center justify-center rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-100"
                        >
                            Edit Data
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center justify-center rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
                        >
                            Hapus Akun
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3 items-start">
                    {/* Panel Kiri: Informasi Profil & Aksi */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col items-center text-center">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-3xl font-extrabold text-blue-700">
                                {client.name.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{client.name}</h2>
                            <p className="text-sm font-medium text-gray-500">{client.email}</p>
                            <p className="text-sm font-medium text-gray-500 mb-2">{client.phone || '—'}</p>

                            {client.role && (
                                <span className="mb-4 inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-800 border border-slate-200">
                                    {roleLabels[client.role] || client.role}
                                </span>
                            )}
                            
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${client.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                <span className={`size-2 rounded-full ${client.is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                {client.is_active ? 'Akun Aktif' : 'Ditangguhkan'}
                            </span>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2">Data Registrasi</h3>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">User ID:</span>
                                    <span className="font-bold text-gray-900">#{client.id}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Bergabung:</span>
                                    <span className="font-bold text-gray-900">
                                        {client.created_at ? new Date(client.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={toggleStatus}
                                disabled={isProcessing}
                                className={`w-full rounded-xl py-2.5 px-4 text-sm font-bold transition-all ${
                                    client.is_active 
                                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                                    : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                                } disabled:opacity-50`}
                            >
                                {isProcessing ? 'Memproses...' : (client.is_active ? 'Tangguhkan Akun (Suspend)' : 'Aktifkan Akun')}
                            </button>
                        </div>
                    </div>

                    {/* Panel Kanan: Statistik Ringkasan & Tabel Keterangan Reservasi */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Total Reservasi</p>
                                <p className="text-3xl font-black text-blue-600">{stats.total_reservations}</p>
                            </div>
                            
                            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Total Transaksi</p>
                                <p className="text-3xl font-black text-indigo-600">{stats.total_payments}</p>
                            </div>

                            <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Total Dibelanjakan</p>
                                <p className="text-2xl font-black text-green-600 truncate" title={formatCurrency(stats.total_spent)}>
                                    {formatCurrency(stats.total_spent)}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5 overflow-hidden">
                            <div className="p-5 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900">Riwayat Perjalanan & Sewa</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Daftar lengkap pemesanan yang pernah dilakukan klien.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-slate-50/50">
                                        <tr>
                                            <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">No. Pesanan</th>
                                            <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kendaraan Armada</th>
                                            <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Durasi Tanggal</th>
                                            <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Biaya</th>
                                            <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-50">
                                        {reservations.data.length > 0 ? (
                                            reservations.data.map((res) => (
                                                <tr 
                                                    key={res.id} 
                                                    className="group cursor-pointer hover:bg-blue-50/40 transition-colors"
                                                    onClick={() => router.visit(`/admin/reservations/${res.id}`)}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-bold text-blue-600 group-hover:underline">
                                                            {res.reservation_number}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {res.car ? (
                                                            <>
                                                                <div className="text-sm font-bold text-gray-900">{res.car.make} {res.car.model}</div>
                                                                <div className="mt-0.5 inline-block text-[10px] font-bold bg-slate-100 border px-1.5 py-0.5 rounded text-gray-600 uppercase tracking-wider">{res.car.license_plate}</div>
                                                            </>
                                                        ) : (
                                                            <span className="text-sm text-gray-400 font-medium">— Mobil Dihapus —</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {formatDate(res.start_date)} <span className="text-gray-400 font-normal">→</span> {formatDate(res.end_date)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-black text-gray-900">
                                                            {formatCurrency(res.total_amount)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                                            res.status === 'confirmed' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                            res.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                                            res.status === 'cancelled' ? 'bg-red-100 text-red-700 border border-red-200' :
                                                            'bg-gray-100 text-gray-700 border border-gray-200'
                                                        }`}>
                                                            {res.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-sm font-medium text-gray-500">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <svg className="h-10 w-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                                        Belum ada riwayat reservasi untuk klien ini.
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {reservations.links && reservations.links.length > 3 && (
                                <div className="p-4 border-t border-gray-100 bg-slate-50/50 flex justify-center">
                                    <div className="flex gap-1">
                                        {reservations.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                className={`px-3 py-1 text-xs font-bold rounded-lg ${link.active ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'} ${!link.url && 'opacity-50 pointer-events-none'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
}