import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

interface Props {
    client: {
        id: number;
        name: string;
        email: string;
        phone: string | null;
        role: string;
    };
}

export default function ClientEdit({ client }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: client.name,
        email: client.email,
        phone: client.phone ?? '',
        password: '',
        role: client.role || 'client',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/clients/${client.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Edit Klien - ${client.name}`} />

            <main className="flex-1 p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Edit Data Klien</h1>
                        <p className="text-sm text-gray-500 font-medium mt-1">Perbarui informasi dasar profil klien.</p>
                    </div>
                    <Link
                        href={`/admin/clients/${client.id}`}
                        className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </Link>
                </div>

                {/* Form Container */}
                <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1.5">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`block w-full rounded-xl border-2 px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-0 ${
                                    errors.name ? 'border-red-300 bg-red-50 focus:border-red-500' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                                }`}
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                            {errors.name && <p className="mt-1.5 text-sm font-medium text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1.5">
                                Alamat Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`block w-full rounded-xl border-2 px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-0 ${
                                    errors.email ? 'border-red-300 bg-red-50 focus:border-red-500' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                                }`}
                                placeholder="contoh@email.com"
                                required
                            />
                            {errors.email && <p className="mt-1.5 text-sm font-medium text-red-600">{errors.email}</p>}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1.5">
                                Nomor Telepon
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className={`block w-full rounded-xl border-2 px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-0 ${
                                    errors.phone ? 'border-red-300 bg-red-50 focus:border-red-500' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
                                }`}
                                placeholder="08xxxxxxxxxx"
                            />
                            {errors.phone && <p className="mt-1.5 text-sm font-medium text-red-600">{errors.phone}</p>}
                        </div>

                        {/* Role Selection */}
                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                            <label className="block text-sm font-bold text-gray-900 mb-1.5">
                                Ubah Role Akses
                            </label>
                            <p className="text-xs text-gray-500 mb-3 font-medium">Hati-hati! Memberikan role Admin akan memberikan pengguna ini akses penuh ke dasbor.</p>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${data.role === 'client' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                                    <input type="radio" value="client" checked={data.role === 'client'} onChange={(e) => setData('role', e.target.value)} className="hidden" />
                                    <span className="font-bold">Klien (Pelanggan)</span>
                                </label>
                                <label className={`cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${data.role === 'admin' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                                    <input type="radio" value="        email: string;
" checked={data.role === 'admin'} onChange={(e) => setData('role', e.target.value)} className="hidden" />
                                    <span className="font-bold">Administrator</span>
                                </label>
                            </div>
                            {errors.role && <p className="mt-1.5 text-sm font-medium text-red-600">{errors.role}</p>}
                        </div>

                        {/* Password Field (Opsional) */}
                        <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-5">
                            <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-1.5">
                                Ubah Password (Opsional)
                            </label>
                            <p className="text-xs text-gray-500 mb-3 font-medium">Kosongkan kolom ini jika Anda tidak ingin mengubah password klien.</p>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`block w-full rounded-xl border-2 px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-0 ${
                                    errors.password ? 'border-red-300 bg-red-50 focus:border-red-500' : 'border-gray-200 bg-white focus:border-blue-500'
                                }`}
                                placeholder="Masukkan password baru (minimal 8 karakter)"
                            />
                            {errors.password && <p className="mt-1.5 text-sm font-medium text-red-600">{errors.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                {processing ? (
                                    <>
                                        <svg className="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                                        Menyimpan...
                                    </>
                                ) : (
                                    'Simpan Perubahan'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </AdminLayout>
    );
}