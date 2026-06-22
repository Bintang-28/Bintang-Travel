import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    license_plate: string;
}

interface Reminder {
    id: number;
    car_id: number;
    label: string;
    due_date: string;
    reminder_days_before: number;
}

interface Props {
    reminder: Reminder;
    cars: Car[];
}

export default function Edit({ reminder, cars }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        car_id: String(reminder.car_id),
        label: reminder.label,
        due_date: reminder.due_date,
        reminder_days_before: String(reminder.reminder_days_before),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/reminders/${reminder.id}`);
    };

    return (
        <>
            <Head title="Edit Pengingat" />
            <AdminLayout>
                <main className="flex-1 space-y-6 p-8">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold">Edit Pengingat</h1>
                        <Link
                            href="/admin/reminders"
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                        >
                            Kembali
                        </Link>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="car_id" className="mb-1 block text-sm font-medium">Kendaraan</label>
                                <select
                                    id="car_id"
                                    value={data.car_id}
                                    onChange={(e) => setData('car_id', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">-- Pilih Kendaraan --</option>
                                    {cars.map((car) => (
                                        <option key={car.id} value={car.id}>
                                            {car.year} {car.make} {car.model} - {car.license_plate}
                                        </option>
                                    ))}
                                </select>
                                {errors.car_id && <p className="mt-1 text-sm text-red-600">{errors.car_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="label" className="mb-1 block text-sm font-medium">Nama Pengingat</label>
                                <input
                                    id="label"
                                    value={data.label}
                                    onChange={(e) => setData('label', e.target.value)}
                                    placeholder="Contoh: Uji KIR, Pajak Tahunan, Asuransi..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.label && <p className="mt-1 text-sm text-red-600">{errors.label}</p>}
                            </div>

                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                <label htmlFor="due_date" className="mb-1 block text-sm font-medium text-blue-800">Tanggal Jatuh Tempo</label>
                                <input
                                    id="due_date"
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    className="w-full rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <p className="mt-1.5 text-xs text-blue-600">
                                    ⚠️ Mengubah tanggal ini akan mereset status pengingat menjadi "Menunggu" lagi.
                                </p>
                                {errors.due_date && <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>}
                            </div>

                            <div>
                                <label htmlFor="reminder_days_before" className="mb-1 block text-sm font-medium">
                                    Ingatkan Berapa Hari Sebelumnya
                                </label>
                                <input
                                    id="reminder_days_before"
                                    type="number"
                                    min="0"
                                    max="365"
                                    value={data.reminder_days_before}
                                    onChange={(e) => setData('reminder_days_before', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.reminder_days_before && <p className="mt-1 text-sm text-red-600">{errors.reminder_days_before}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
                            <Link
                                href="/admin/reminders"
                                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </main>
            </AdminLayout>
        </>
    );
}