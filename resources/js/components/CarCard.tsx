import { router } from '@inertiajs/react';
import { show } from '@/routes/fleet';

interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    price_per_day: string;
    description: string;
    fuel_type: string;
    image_url: string;
    status?: string;
    maintenance_note?: string | null;
    estimated_completion_date?: string | null;
}

interface Props {
    car: Car;
}

const bookCar = (carId: number) => {
    router.get(show(carId).url);
};

const statusConfig: Record<string, { label: string; color: string }> = {
    rented: { label: 'Sedang Dirental', color: 'bg-amber-500' },
    maintenance: { label: 'Sedang Diperbaiki', color: 'bg-red-500' },
};

const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(dateStr
    ));

export default function CarCard({ car }: Props) {
    const isAvailable = car.status === 'available';

    const maintenanceLabel = car.status === 'maintenance' && car.maintenance_note
        ? `Sedang ${car.maintenance_note}`
        : statusConfig[car.status ?? '']?.label ?? 'Tidak Tersedia';

    const statusInfo = car.status && car.status !== 'available'
        ? { label: maintenanceLabel, color: statusConfig[car.status]?.color ?? 'bg-red-500' }
        : undefined;

    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
            {/* Car Image */}
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                    src={car.image_url}
                    alt={`${car.make} ${car.model}`}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 shadow-lg">
                    <span className="text-sm font-bold text-white">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(car.price_per_day))}
                    </span>
                    <span className="text-xs text-blue-100">/day</span>
                </div>

                {/* Status Badge — muncul jika tidak available */}
                {!isAvailable && statusInfo && (
                    <div className={`absolute top-4 left-4 rounded-xl ${statusInfo.color} px-3 py-1.5 shadow-lg`}>
                        <span className="text-xs font-bold text-white">{statusInfo.label}</span>
                        {car.status === 'maintenance' && car.estimated_completion_date && (
                            <span className="block text-[10px] font-normal text-white/85">
                                Estimasi selesai: {formatDate(car.estimated_completion_date)}
                            </span>
                        )}
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>

            {/* Car Details */}
            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                        {car.make} {car.model} - {car.year}
                    </h3>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 capitalize">
                            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="font-medium">{car.fuel_type}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                    {car.description}
                </p>
            </div>

            {/* Book Button */}
            <div className="p-4">
                {car.status === 'available' || car.status === 'rented' ? (
                    <button
                        onClick={() => bookCar(car.id)}
                        className="group/btn w-full cursor-pointer rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                        <span className="flex items-center justify-center gap-2 text-white">
                            <svg className="h-5 w-5 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {car.status === 'rented' ? 'Pesan (Tanggal Lain)' : 'Book Now'}
                        </span>
                    </button>
                ) : (
                    <button
                    disabled
                    className="w-full cursor-not-allowed rounded-xl px-6 py-3.5 font-semibold text-white shadow-sm opacity-80"
                    style={{ background: '#EF4444' }}
                >
                    <span className="flex flex-col items-center justify-center gap-1">
                        <span className="flex items-center justify-center gap-2">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                            {statusInfo?.label ?? 'Tidak Tersedia'}
                        </span>
                        {car.status === 'maintenance' && car.estimated_completion_date && (
                            <span className="text-xs font-normal opacity-90">
                                Estimasi selesai: {formatDate(car.estimated_completion_date)}
                            </span>
                        )}
                    </span>
                </button>
                )}
            </div>
        </div>
    );
}