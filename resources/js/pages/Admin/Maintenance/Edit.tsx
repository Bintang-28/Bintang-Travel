import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    license_plate: string;
}

interface Maintenance {
    id: number;
    car_id: number;
    type: string;
    description: string | null;
    cost: string | number;
    vendor: string | null;
    service_date: string;
    estimated_completion_date: string | null;
    next_service_date: string | null;
    completed_at: string | null;
    odometer_km: number | null;
}

interface Props {
    maintenance: Maintenance;
    cars: Car[];
}

export default function Edit({ maintenance, cars }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        car_id: String(maintenance.car_id),
        type: maintenance.type,
        description: maintenance.description ?? '',
        cost: String(maintenance.cost),
        vendor: maintenance.vendor ?? '',
        service_date: maintenance.service_date,
        estimated_completion_date: maintenance.estimated_completion_date ?? '',
        next_service_date: maintenance.next_service_date ?? '',
        completed_at: maintenance.completed_at ?? '', // ← TAMBAHAN
        odometer_km: maintenance.odometer_km ? String(maintenance.odometer_km) : '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/maintenance/${maintenance.id}`);
    };

    return (
        <>
            <Head title="Edit Maintenance" />
            <AdminLayout>
                <main className="flex-1 space-y-6 p-8">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold">Edit Maintenance</h1>
                        <Link
                            href="/admin/maintenance"
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
                                <label htmlFor="type" className="mb-1 block text-sm font-medium">Jenis Perbaikan</label>
                                <input
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    placeholder="Contoh: Ganti Oli, Ganti Ban..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                            </div>

                            <div>
                                <label htmlFor="cost" className="mb-1 block text-sm font-medium">Biaya (Rp)</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">Rp</span>
                                    </div>
                                    <input
                                        id="cost"
                                        type="number"
                                        min="0"
                                        value={data.cost}
                                        onChange={(e) => setData('cost', e.target.value)}
                                        placeholder="150000"
                                        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                {errors.cost && <p className="mt-1 text-sm text-red-600">{errors.cost}</p>}
                            </div>

                            <div>
                                <label htmlFor="vendor" className="mb-1 block text-sm font-medium">Nama Bengkel</label>
                                <input
                                    id="vendor"
                                    value={data.vendor}
                                    onChange={(e) => setData('vendor', e.target.value)}
                                    placeholder="Contoh: Bengkel Maju Jaya"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.vendor && <p className="mt-1 text-sm text-red-600">{errors.vendor}</p>}
                            </div>

                            <div>
                                <label htmlFor="service_date" className="mb-1 block text-sm font-medium">Tanggal Servis</label>
                                <input
                                    id="service_date"
                                    type="date"
                                    value={data.service_date}
                                    onChange={(e) => setData('service_date', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.service_date && <p className="mt-1 text-sm text-red-600">{errors.service_date}</p>}
                            </div>

                            <div>
                                <label htmlFor="next_service_date" className="mb-1 block text-sm font-medium">
                                    Tanggal Servis Berikutnya <span className="text-gray-400">(opsional)</span>
                                </label>
                                <input
                                    id="next_service_date"
                                    type="date"
                                    value={data.next_service_date}
                                    onChange={(e) => setData('next_service_date', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.next_service_date && <p className="mt-1 text-sm text-red-600">{errors.next_service_date}</p>}
                            </div>

                            {/* Tanggal Selesai - dengan highlight khusus karena mempengaruhi status mobil */}
                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                <label htmlFor="completed_at" className="mb-1 block text-sm font-medium text-blue-800">
                                    Tanggal Selesai Service <span className="text-blue-400">(opsional)</span>
                                </label>
                                <input
                                    id="completed_at"
                                    type="date"
                                    value={data.completed_at}
                                    onChange={(e) => setData('completed_at', e.target.value)}
                                    className="w-full rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <p className="mt-1.5 text-xs text-blue-600">
                                    ⚠️ Mengisi tanggal ini akan otomatis mengubah status mobil menjadi <strong>Tersedia</strong>.
                                </p>
                                {errors.completed_at && <p className="mt-1 text-sm text-red-600">{errors.completed_at}</p>}
                            </div>

                            <div>
                                <label htmlFor="odometer_km" className="mb-1 block text-sm font-medium">
                                    Odometer (KM) <span className="text-gray-400">(opsional)</span>
                                </label>
                                <input
                                    id="odometer_km"
                                    type="number"
                                    min="0"
                                    value={data.odometer_km}
                                    onChange={(e) => setData('odometer_km', e.target.value)}
                                    placeholder="Contoh: 25000"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.odometer_km && <p className="mt-1 text-sm text-red-600">{errors.odometer_km}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="description" className="mb-1 block text-sm font-medium">
                                    Deskripsi <span className="text-gray-400">(opsional)</span>
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Catatan detail perbaikan..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
                            <Link
                                href="/admin/maintenance"
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