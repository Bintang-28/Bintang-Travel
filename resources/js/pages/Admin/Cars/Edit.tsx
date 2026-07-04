import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo, useRef, useState } from 'react';

interface Props {
    car: any | null;
    imageFiles: Array<{ id: number; url: string }>;
    enums: {
        colors: Array<{ name: string; value: string; hex: string }>;
        statuses: Array<{ value: string; label: string; color: string }>;
    };
}

export default function Edit({ car, imageFiles, enums }: Props) {
    const isEdit = !!car;

    const carColors = useMemo(
        () =>
            enums.colors.map((color) => ({
                ...color,
                value: color.value.toLowerCase(),
                name: color.name.charAt(0).toUpperCase() + color.name.slice(1),
            })),
        [enums.colors],
    );

    const fuelTypes = [
        { value: 'pertalite', label: 'Pertalite' },
        { value: 'pertamax', label: 'Pertamax' },
        { value: 'solar', label: 'Solar' },
    ];

    const statuses = useMemo(() => enums.statuses, [enums.statuses]);

    const [previewUrl, setPreviewUrl] = useState<string | null>(imageFiles?.[0]?.url || null);
    const [isExistingImage, setIsExistingImage] = useState<boolean>(!!imageFiles?.[0]?.url);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: isEdit ? 'put' : 'post',
        make: car?.make ?? '',
        model: car?.model ?? '',
        year: car?.year ?? '',
        license_plate: car?.license_plate ?? '',
        color: (car?.color || 'white').toLowerCase(),
        price_per_day: car?.price_per_day ?? '',
        penalty_per_hour: car?.penalty_per_hour ?? '',
        mileage: car?.mileage ?? '',
        transmission: car?.transmission ?? 'automatic',
        seats: car?.seats ?? '',
        fuel_type: (car?.fuel_type || 'pertalite').toLowerCase(),
        description: car?.description ?? '',
        status: car?.status ?? 'available',
        image: null as File | null,
        image_removed_files: [] as number[],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('image', file);
        setPreviewUrl(URL.createObjectURL(file));
        setIsExistingImage(false);
    };

    const handleRemoveImage = () => {
        if (isExistingImage && imageFiles?.[0]?.id) {
            setData('image_removed_files', [...data.image_removed_files, imageFiles[0].id]);
        }
        setPreviewUrl(null);
        setData('image', null);
        setIsExistingImage(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = isEdit ? `/admin/cars/${car.id}` : '/admin/cars';

        post(url, {
            forceFormData: true,
            onSuccess: () => {
                if (!isEdit) {
                    reset();
                    setPreviewUrl(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                }
            },
        });
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Mobil' : 'Tambah Mobil'} />
            <AdminLayout>
                <main className="flex-1 space-y-6 p-8">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {isEdit ? 'Edit Data Mobil' : 'Tambah Mobil Baru'}
                        </h1>
                        <Link
                            href="/admin/cars"
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                        >
                            Kembali
                        </Link>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                            <div className="w-full md:w-1/2">
                                <label className="mb-2 block text-sm font-medium">Foto Mobil</label>
                                <div className="mt-2">
                                    {previewUrl ? (
                                        <div className="relative w-full group">
                                            <img
                                                src={previewUrl}
                                                alt="Car preview"
                                                className="h-56 w-full rounded-xl object-cover border border-gray-200 shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute top-3 right-3 rounded-full bg-red-100 p-2 text-red-600 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-200 shadow-md"
                                                title="Hapus Gambar"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <svg className="mb-2 h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-500">Klik untuk unggah gambar</span>
                                            <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    )}
                                    {errors.image && (
                                        <p className="mt-2 text-sm font-medium text-red-600">{errors.image}</p>
                                    )}
                                </div>
                            </div>

                            <div className="w-full space-y-4 py-0 md:w-1/2 md:py-6">
                                <div>
                                    <label htmlFor="status" className="mb-1 block text-sm font-medium">Status</label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border border-gray-300 py-2.5 px-3 text-base focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                                    >
                                        {statuses.map((status) => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                </div>

                                <div>
                                    <label htmlFor="price_per_day" className="mb-1 block text-sm font-medium">Harga Sewa per Hari (Rp)</label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">Rp</span>
                                        </div>
                                        <input
                                            id="price_per_day"
                                            type="number"
                                            min="0"
                                            value={data.price_per_day}
                                            onChange={(e) => setData('price_per_day', e.target.value)}
                                            placeholder="500000"
                                            className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    {errors.price_per_day && <p className="mt-1 text-sm text-red-600">{errors.price_per_day}</p>}
                                </div>

                                <div>
                                    <label htmlFor="penalty_per_hour" className="mb-1 block text-sm font-medium">Denda Keterlambatan per Jam (Rp)</label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">Rp</span>
                                        </div>
                                        <input
                                            id="penalty_per_hour"
                                            type="number"
                                            min="0"
                                            value={data.penalty_per_hour}
                                            onChange={(e) => setData('penalty_per_hour', e.target.value)}
                                            placeholder="50000"
                                            className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    {errors.penalty_per_hour && <p className="mt-1 text-sm text-red-600">{errors.penalty_per_hour}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">Warna</label>
                                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                                        {carColors.map((color) => (
                                            <label
                                                key={color.value}
                                                className={`flex w-full cursor-pointer items-center justify-between rounded-lg border p-2 text-xs font-medium hover:bg-gray-50 ${
                                                    data.color === color.value ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200'
                                                }`}
                                                title={color.name}
                                            >
                                                <input
                                                    type="radio"
                                                    value={color.value}
                                                    checked={data.color === color.value}
                                                    onChange={() => setData('color', color.value)}
                                                    className="sr-only"
                                                />
                                                <span>{color.name}</span>
                                                <span
                                                    className="inline-block h-4 w-4 rounded-full border border-gray-300 shadow-sm"
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                    {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="make" className="mb-1 block text-sm font-medium">Merek</label>
                                <input
                                    id="make"
                                    value={data.make}
                                    onChange={(e) => setData('make', e.target.value)}
                                    placeholder="Contoh: Toyota, Honda..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make}</p>}
                            </div>

                            <div>
                                <label htmlFor="model" className="mb-1 block text-sm font-medium">Model Mobil</label>
                                <input
                                    id="model"
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    placeholder="Contoh: Avanza, Innova..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
                            </div>

                            <div>
                                <label htmlFor="year" className="mb-1 block text-sm font-medium">Tahun Keluaran</label>
                                <input
                                    id="year"
                                    type="number"
                                    min={1900}
                                    max={new Date().getFullYear() + 1}
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    placeholder="Contoh: 2023"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                            </div>

                            <div>
                                <label htmlFor="license_plate" className="mb-1 block text-sm font-medium">Plat Nomor</label>
                                <input
                                    id="license_plate"
                                    value={data.license_plate}
                                    onChange={(e) => setData('license_plate', e.target.value)}
                                    placeholder="Contoh: AE 1234 XY"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase"
                                />
                                {errors.license_plate && <p className="mt-1 text-sm text-red-600">{errors.license_plate}</p>}
                            </div>

                            <div>
                                <label htmlFor="mileage" className="mb-1 block text-sm font-medium">Jarak Tempuh (Kilometer)</label>
                                <input
                                    id="mileage"
                                    type="number"
                                    min={0}
                                    value={data.mileage}
                                    onChange={(e) => setData('mileage', e.target.value)}
                                    placeholder="Contoh: 15000"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="transmission" className="mb-1 block text-sm font-medium">Transmisi</label>
                                    <select
                                        id="transmission"
                                        value={data.transmission}
                                        onChange={(e) => setData('transmission', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="automatic">Automatic</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="seats" className="mb-1 block text-sm font-medium">Kapasitas Kursi</label>
                                    <input
                                        id="seats"
                                        type="number"
                                        min={1}
                                        max={20}
                                        value={data.seats}
                                        onChange={(e) => setData('seats', e.target.value)}
                                        placeholder="Contoh: 5"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="fuel_type" className="mb-1 block text-sm font-medium">Jenis Bahan Bakar</label>
                                <select
                                    id="fuel_type"
                                    value={data.fuel_type}
                                    onChange={(e) => setData('fuel_type', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    {fuelTypes.map((fuel) => (
                                        <option key={fuel.value} value={fuel.value}>
                                            {fuel.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.fuel_type && <p className="mt-1 text-sm text-red-600">{errors.fuel_type}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="description" className="mb-1 block text-sm font-medium">Deskripsi Mobil</label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Jelaskan detail fitur mobil, kondisi, dan catatan khusus..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-end border-t border-gray-100">
                            <Link
                                href="/admin/cars"
                                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing
                                    ? isEdit ? 'Menyimpan...' : 'Membuat...'
                                    : isEdit ? 'Simpan Perubahan' : 'Tambah Mobil'}
                            </button>
                        </div>
                    </form>
                </main>
            </AdminLayout>
        </>
    );
}