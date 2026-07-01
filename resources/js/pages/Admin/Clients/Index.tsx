import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';

// IMPORT ROUTE YANG ERROR SUDAH DIHAPUS

interface Client {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    reservations_count: number;
    payments_count: number;
    created_at?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface StatusData {
    label: string;
    count: number;
    color: string;
}

interface Props {
    clients: {
        data: Client[];
        links: PaginationLink[];
    };
    filters: {
        search?: string;
        status?: string;
    };
    statuses: Record<string, StatusData>;
}

function hexToRgba(hex: string, alpha: number) {
    const h = hex?.replace('#', '') || '6B7280';
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const roleLabels: Record<string, { label: string; color: string }> = {
    super_admin: { label: 'Super Admin', color: '#6366F1' },
    admin: { label: 'Admin Travel', color: '#A855F7' },
    owner: { label: 'Owner', color: '#F59E0B' },
    client: { label: 'Klien', color: '#3B82F6' },
};

export default function ClientsIndex() {
    const page = usePage();
    const props = page.props as unknown as Props;
    const { clients, filters, statuses } = props;

    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    
    // State untuk Modal Tambah Pengguna
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form data untuk Tambah Pengguna
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'client', // Default role
    });

    const getStatusColor = (status: string) => {
        const statusData = statuses[status];
        if (!statusData) {
            return { bg: 'rgba(107, 114, 128, 0.1)', text: '#6B7280', dot: '#6B7280' };
        }
        return {
            bg: hexToRgba(statusData.color, 0.1),
            text: statusData.color,
            dot: statusData.color,
        };
    };

    const doSearch = (overrideStatus?: string) => {
        router.get(
            '/admin/clients',
            {
                search: search,
                status: (overrideStatus ?? statusFilter) === 'all' ? null : (overrideStatus ?? statusFilter),
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleStatusChange = (newStatus: string) => {
        setStatusFilter(newStatus);
        doSearch(newStatus);
    };

    const navigateToClient = (id: number) => {
        router.visit(`/admin/clients/${id}`);
    };

    const totalCount = Object.values(statuses).reduce((acc: number, curr: StatusData) => acc + curr.count, 0);

    // Fungsi untuk Submit Form Pembuatan Akun Baru
    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/clients', {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    // Fungsi untuk menutup modal dan mereset form
    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        clearErrors();
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Pengguna" />
            
            <main className="flex-1 p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen relative">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manajemen Pengguna</h1>
                        <p className="mt-1 text-sm text-gray-500 font-medium">Pantau dan kelola data pelanggan serta admin Bintang Travel.</p>
                    </div>
                    {/* Tombol Tambah Pengguna */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
                    >
                        <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Tambah Pengguna
                    </button>
                </div>

                {/* Filters & Search Section */}
                <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Search Bar */}
                        <div className="relative flex w-full max-w-md items-center">
                            <div className="absolute left-4 text-gray-400">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyUp={(e) => e.key === 'Enter' && doSearch()}
                                placeholder="Cari nama atau email pengguna..."
                                className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-0"
                            />
                            <button
                                onClick={() => doSearch()}
                                className="absolute right-2 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-blue-700"
                            >
                                Cari
                            </button>
                        </div>

                        {/* Status Filter Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="hidden"
                                    checked={statusFilter === 'all'}
                                    onChange={() => handleStatusChange('all')}
                                />
                                <span
                                    className={`px-4 py-2 text-xs font-bold rounded-full cursor-pointer transition-all duration-300 shadow-sm ${
                                        statusFilter === 'all'
                                            ? 'bg-blue-600 text-white shadow-blue-500/30 -translate-y-0.5'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                                >
                                    Semua ({totalCount})
                                </span>
                            </label>

                            {Object.entries(statuses).map(([key, status]) => (
                                <label key={key} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="hidden"
                                        checked={statusFilter === key}
                                        onChange={() => handleStatusChange(key)}
                                    />
                                    <span
                                        className={`px-4 py-2 text-xs font-bold rounded-full cursor-pointer transition-all duration-300 shadow-sm flex items-center gap-2 ${
                                            statusFilter === key
                                                ? 'bg-blue-600 text-white shadow-blue-500/30 -translate-y-0.5'
                                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                        }`}
                                    >
                                        <span className={`w-2 h-2 rounded-full ${statusFilter === key ? 'bg-white' : ''}`} style={{ backgroundColor: statusFilter === key ? '#fff' : status.color }}></span>
                                        {status.label} ({status.count})
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-slate-50/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">Data Pengguna</th>
                                    <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">Role Akses</th>
                                    <th className="px-6 py-4 text-center text-xs font-extrabold text-gray-500 uppercase tracking-wider">Total Reservasi</th>
                                    <th className="px-6 py-4 text-center text-xs font-extrabold text-gray-500 uppercase tracking-wider">Total Pembayaran</th>
                                    <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">Status Akun</th>
                                    <th className="px-6 py-4 text-right text-xs font-extrabold text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {clients.data.map((c) => {
                                    const statusColor = getStatusColor(c.is_active ? 'active' : 'suspended');
                                    return (
                                        <tr
                                            key={c.id}
                                            className="group cursor-pointer hover:bg-blue-50/50 transition-colors duration-200"
                                            onClick={() => navigateToClient(c.id)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-700 font-bold">
                                                        {c.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{c.name}</div>
                                                        <div className="text-xs font-medium text-gray-500">{c.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-extrabold border"
                                                      style={{
                                                          color: roleLabels[c.role]?.color || '#6B7280',
                                                          borderColor: roleLabels[c.role]?.color || '#E5E7EB',
                                                          backgroundColor: hexToRgba(roleLabels[c.role]?.color || '#6B7280', 0.1)
                                                      }}>
                                                    {roleLabels[c.role]?.label || c.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center min-w-[2.5rem] rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-bold text-slate-700">
                                                    {c.reservations_count}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center min-w-[2.5rem] rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-bold text-slate-700">
                                                    {c.payments_count}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide border"
                                                    style={{ backgroundColor: statusColor.bg, color: statusColor.text, borderColor: hexToRgba(statusColor.dot, 0.2) }}
                                                >
                                                    <span className="size-1.5 rounded-full" style={{ backgroundColor: statusColor.dot }} />
                                                    {c.is_active ? 'Aktif' : 'Ditangguhkan'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/admin/clients/${c.id}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-1.5 rounded-xl border-2 border-gray-100 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                                >
                                                    Detail
                                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {clients.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <svg className="mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                                <p className="text-lg font-bold text-gray-900">Tidak Ada Data</p>
                                                <p className="text-sm mt-1">Pengguna yang Anda cari tidak ditemukan.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {clients.links?.length > 0 && (
                    <nav className="flex justify-center gap-2 pt-4">
                        {clients.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || ''}
                                className={`flex items-center justify-center px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                                    link.active 
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                                        : 'bg-white border-2 border-gray-100 text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700'
                                } ${!link.url ? 'pointer-events-none opacity-50 bg-gray-50 border-gray-100' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                )}
            </main>

            {/* Modal Tambah Pengguna */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm px-4">
                    <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-lg font-extrabold text-gray-900">Tambah Pengguna Baru</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleCreateUser} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-bold text-gray-700">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full rounded-xl border-2 px-4 py-2.5 text-sm focus:outline-none ${errors.name ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 bg-gray-50'}`}
                                        placeholder="Masukkan nama pengguna"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>
                                {/* Email */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-bold text-gray-700">Alamat Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`w-full rounded-xl border-2 px-4 py-2.5 text-sm focus:outline-none ${errors.email ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 bg-gray-50'}`}
                                        placeholder="contoh@email.com"
                                        required
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                                {/* Password */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-bold text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`w-full rounded-xl border-2 px-4 py-2.5 text-sm focus:outline-none ${errors.password ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 bg-gray-50'}`}
                                        placeholder="Minimal 8 karakter"
                                        required
                                    />
                                    {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>}
                                </div>

                                {/* Role Selection */}
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-gray-700">Pilih Role Akses</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <label className={`cursor-pointer rounded-xl border-2 p-3 text-center transition-all flex flex-col justify-center items-center ${data.role === 'client' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                                            <input type="radio" value="client" checked={data.role === 'client'} onChange={(e) => setData('role', e.target.value)} className="hidden" />
                                            <span className="font-bold text-sm">Klien (Pelanggan)</span>
                                        </label>
                                        <label className={`cursor-pointer rounded-xl border-2 p-3 text-center transition-all flex flex-col justify-center items-center ${data.role === 'super_admin' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                                            <input type="radio" value="super_admin" checked={data.role === 'super_admin'} onChange={(e) => setData('role', e.target.value)} className="hidden" />
                                            <span className="font-bold text-sm">Super Admin</span>
                                        </label>
                                        <label className={`cursor-pointer rounded-xl border-2 p-3 text-center transition-all flex flex-col justify-center items-center ${data.role === 'admin' ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                                            <input type="radio" value="admin" checked={data.role === 'admin'} onChange={(e) => setData('role', e.target.value)} className="hidden" />
                                            <span className="font-bold text-sm">Admin Travel</span>
                                        </label>
                                        <label className={`cursor-pointer rounded-xl border-2 p-3 text-center transition-all flex flex-col justify-center items-center ${data.role === 'owner' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                                            <input type="radio" value="owner" checked={data.role === 'owner'} onChange={(e) => setData('role', e.target.value)} className="hidden" />
                                            <span className="font-bold text-sm">Owner</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button type="button" onClick={closeModal} className="rounded-xl px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100">Batal</button>
                                    <button type="submit" disabled={processing} className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-50">
                                        {processing ? 'Menyimpan...' : 'Buat Akun'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}