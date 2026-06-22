import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    license_plate: string;
}

interface Reminder {
    id: number;
    car: Car;
    label: string;
    due_date: string;
    reminder_days_before: number;
    notified_at: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    reminders: {
        data: Reminder[];
        links: PaginationLink[];
    };
}

export default function Index({ reminders }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus pengingat ini?')) {
            router.delete(`/admin/reminders/${id}`);
        }
    };

    const formatDate = (dateStr: string) =>
        new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(dateStr));

    return (
        <>
            <Head title="Pengingat Kendaraan" />
            <AdminLayout>
                <main className="flex-1 space-y-6 p-8">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold">Pengingat Kendaraan</h1>
                        <Link
                            href="/admin/reminders/create"
                            className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700"
                        >
                            + Tambah Pengingat
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                                <tr>
                                    <th className="px-4 py-3">Kendaraan</th>
                                    <th className="px-4 py-3">Label</th>
                                    <th className="px-4 py-3">Jatuh Tempo</th>
                                    <th className="px-4 py-3">Ingatkan (hari sebelum)</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reminders.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                                            Belum ada pengingat.
                                        </td>
                                    </tr>
                                )}
                                {reminders.data.map((reminder) => (
                                    <tr key={reminder.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            {reminder.car.year} {reminder.car.make} {reminder.car.model}
                                            <div className="text-xs text-gray-400">{reminder.car.license_plate}</div>
                                        </td>
                                        <td className="px-4 py-3 font-medium">{reminder.label}</td>
                                        <td className="px-4 py-3">{formatDate(reminder.due_date)}</td>
                                        <td className="px-4 py-3">{reminder.reminder_days_before} hari</td>
                                        <td className="px-4 py-3">
                                            {reminder.notified_at ? (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                                                    Terkirim
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                                                    Menunggu
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/reminders/${reminder.id}/edit`}
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(reminder.id)}
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

                    {reminders.links.length > 3 && (
                        <div className="flex justify-center gap-1">
                            {reminders.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url ?? '#'}
                                    className={`rounded-lg px-3 py-1.5 text-sm ${
                                        link.active ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    } ${!link.url ? 'cursor-not-allowed opacity-40' : ''}`}
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