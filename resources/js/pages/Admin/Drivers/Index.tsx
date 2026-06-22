import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

interface Driver {
    id: number;
    name: string;
    phone: string;
    license_number: string;
    status: 'available' | 'unavailable' | 'on_duty';
}

interface Props {
    drivers: {
        data: Driver[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function Index({ drivers }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus sopir ini?')) {
            router.delete(`/admin/drivers/${id}`);
        }
    };

    return (
        <>
            <Head title="Sopir" />
            <AdminLayout>
                <main className="flex-1 space-y-6 p-8">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold">Manajemen Sopir</h1>
                        <Link
                            href="/admin/drivers/create"
                            className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700"
                        >
                            + Tambah Sopir
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                                <tr>
                                    <th className="px-4 py-3">Nama</th>
                                    <th className="px-4 py-3">No. Telepon</th>
                                    <th className="px-4 py-3">No. SIM</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {drivers.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                            Belum ada data sopir.
                                        </td>
                                    </tr>
                                )}
                                {drivers.data.map((driver) => (
                                    <tr key={driver.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{driver.name}</td>
                                        <td className="px-4 py-3">{driver.phone}</td>
                                        <td className="px-4 py-3">{driver.license_number}</td>
                                        <td className="px-4 py-3">
                                            {driver.status === 'available' && (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">Tersedia</span>
                                            )}
                                            {driver.status === 'on_duty' && (
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">Sedang Menyopir</span>
                                            )}
                                            {driver.status === 'unavailable' && (
                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">Tidak Tersedia</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/drivers/${driver.id}/edit`}
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(driver.id)}
                                                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {drivers.links.length > 3 && (
                        <div className="flex justify-center gap-1">
                            {drivers.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url ?? '#'}
                                    className={`rounded-lg px-3 py-1.5 text-sm ${link.active ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'} ${!link.url ? 'cursor-not-allowed opacity-40' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </AdminLayout>
        </>
    );
}