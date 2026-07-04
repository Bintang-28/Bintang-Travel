import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    license_plate: string;
}

interface Maintenance {
    id: number;
    car: Car;
    type: string;
    description: string | null;
    cost: string | number;
    vendor: string | null;
    service_date: string;
    estimated_completion_date: string | null;
    odometer_km: number | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    maintenances: {
        data: Maintenance[];
        links: PaginationLink[];
    };
}

export default function Index({ maintenances }: Props) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const openDeleteDialog = (id: number) => {
        setDeleteId(id);
        setShowDeleteDialog(true);
    };

    const handleDelete = () => {
        if (!deleteId) return;
        router.delete(`/admin/maintenance/${deleteId}`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteDialog(false);
                setDeleteId(null);
            },
        });
    };

    return (
        <>
            <Head title="Maintenance" />
            <AdminLayout>
                <main className="flex-1 space-y-6 p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold">Maintenance</h1>
                        <Link
                            href="/admin/maintenance/create"
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            + Tambah Maintenance
                        </Link>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-md border">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kendaraan</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biaya</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bengkel</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Mulai Perbaikan</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selesai Servis</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {maintenances.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                                            Belum ada data maintenance.
                                        </td>
                                    </tr>
                                ) : (
                                    maintenances.data.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3">
                                                <div className="font-medium">
                                                    {item.car.year} {item.car.make} {item.car.model}
                                                </div>
                                                <div className="text-xs text-gray-400">{item.car.license_plate}</div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{item.type}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    minimumFractionDigits: 0,
                                                }).format(Number(item.cost))}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{item.vendor ?? '-'}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Date(item.service_date).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {item.estimated_completion_date
                                                    ? new Date(item.estimated_completion_date).toLocaleDateString('id-ID', {
                                                          day: 'numeric',
                                                          month: 'long',
                                                          year: 'numeric',
                                                      })
                                                    : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right space-x-2">
                                                <Link
                                                    href={`/admin/maintenance/${item.id}/edit`}
                                                    className="inline-flex items-center rounded-md border border-input px-3 py-1.5 text-sm font-medium hover:bg-accent"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => openDeleteDialog(item.id)}
                                                    className="inline-flex items-center rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {maintenances.links?.length > 0 && (
                        <nav className="flex gap-2">
                            {maintenances.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || ''}
                                    className={[
                                        'px-3 py-1 rounded text-sm',
                                        link.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700',
                                        !link.url ? 'pointer-events-none opacity-50' : '',
                                    ].join(' ')}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    )}
                </main>

                {/* Delete Dialog */}
                {showDeleteDialog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setShowDeleteDialog(false)}
                        />
                        <div className="relative z-10 w-full max-w-md rounded-xl border bg-white p-6 shadow-xl">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <svg className="h-5 w-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Hapus Data Maintenance
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                                Data maintenance akan dihapus secara permanen.
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDeleteDialog(false)}
                                    className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white hover:bg-destructive/90"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </>
    );
}