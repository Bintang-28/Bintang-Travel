import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

interface Driver {
    id: number;
    name: string;
    phone: string;
    license_number: string;
    status: string;
}

export default function Edit({ driver }: { driver: Driver }) {
    const { data, setData, put, processing, errors } = useForm({
        name: driver.name,
        phone: driver.phone,
        license_number: driver.license_number,
        status: driver.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/drivers/${driver.id}`);
    };

    return (
        <>
            <Head title="Edit Sopir" />
            <AdminLayout>
                <main className="flex-1 space-y-6 p-8">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold">Edit Sopir</h1>
                        <Link href="/admin/drivers" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
                            Kembali
                        </Link>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">Nama Lengkap</label>
                                <input value={data.name} onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">No. Telepon</label>
                                <input value={data.phone} onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">No. SIM</label>
                                <input value={data.license_number} onChange={(e) => setData('license_number', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                {errors.license_number && <p className="mt-1 text-sm text-red-600">{errors.license_number}</p>}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">Status</label>
                                <select value={data.status} onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option value="available">Tersedia</option>
                                    <option value="unavailable">Tidak Tersedia</option>
                                </select>
                                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
                            <Link href="/admin/drivers" className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50">
                                Batal
                            </Link>
                            <button type="submit" disabled={processing}
                                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-50">
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </main>
            </AdminLayout>
        </>
    );
}