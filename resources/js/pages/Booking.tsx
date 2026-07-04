import HomeLayout from '@/layouts/HomeLayout';
import { book } from '@/routes/fleet';
import { login } from '@/routes';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

interface Car {
    id: number;
    make: string;
    model: string;
    price_per_day: string;
    image_url: string;
    images: { url: string; alt: string }[];
    fuel_type: string;
    transmission: string;
    year: string;
    description: string;
    status: string;
}

interface Driver {
    id: number;
    name: string;
    phone: string;
    status: string;
    bookedRanges?: { start: string; end: string }[];
}

interface PageProps {
    car: Car;
    drivers: Driver[];
    auth: { user: any };
    minDate: string;
    maxDate: string;
    bookedRanges?: { start: string; end: string }[];
    [key: string]: any;
}

const DRIVER_FEE_PER_DAY = 250000;

export default function BookCar() {
    const { props } = usePage<PageProps>();
    const { car, auth, minDate, maxDate, drivers, bookedRanges } = props;

    const { data, setData, post, processing, errors } = useForm({
        start_date: '',
        end_date: '',
        pickup_time: '09:00',
        return_time: '18:00',
        delivery_type: 'self_pickup' as 'self_pickup' | 'delivery',
        delivery_address: '',
        with_driver: false,
        driver_id: '',
    });

    const rentalDays = useMemo(() => {
        if (!data.start_date || !data.end_date || !data.pickup_time || !data.return_time) return 0;
        const start = new Date(`${data.start_date}T${data.pickup_time}`);
        const end = new Date(`${data.end_date}T${data.return_time}`);
        
        const diffMs = end.getTime() - start.getTime();
        if (diffMs <= 0) return 0;
        
        const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
        const fullDays = Math.floor(totalHours / 24);
        const remainderHours = totalHours % 24;
        
        if (remainderHours > 0 && remainderHours <= 12) {
            return fullDays + 0.5;
        } else if (remainderHours > 12) {
            return fullDays + 1;
        }
        return Math.max(0.5, fullDays);
    }, [data.start_date, data.end_date, data.pickup_time, data.return_time]);

    const isDateOverlapping = useMemo(() => {
        if (!data.start_date || !data.end_date) return false;
        const start = data.start_date;
        const end = data.end_date;
        
        return (bookedRanges || []).some((range: { start: string; end: string }) => {
            return (start <= range.end && end >= range.start);
        });
    }, [data.start_date, data.end_date, bookedRanges]);

    const isDriverOverlapping = useMemo(() => {
        if (!data.start_date || !data.end_date || !data.with_driver || !data.driver_id) return false;
        
        const selectedDriver = drivers.find(d => d.id === parseInt(data.driver_id));
        if (!selectedDriver || !selectedDriver.bookedRanges) return false;

        const start = data.start_date;
        const end = data.end_date;
        
        return (selectedDriver.bookedRanges || []).some((range: { start: string; end: string }) => {
            return (start <= range.end && end >= range.start);
        });
    }, [data.start_date, data.end_date, data.with_driver, data.driver_id, drivers]);

    const selectedDriverSchedule = useMemo(() => {
        if (!data.driver_id) return [];
        const selectedDriver = drivers.find(d => d.id === parseInt(data.driver_id));
        if (!selectedDriver || !selectedDriver.bookedRanges) return [];
        
        return selectedDriver.bookedRanges.map((range: { start: string; end: string }) => {
            const start = new Date(range.start).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
            const end = new Date(range.end).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
            return `${start} - ${end}`;
        });
    }, [data.driver_id, drivers]);

    const subtotal = useMemo(() => rentalDays * parseFloat(car.price_per_day || '0'), [rentalDays, car.price_per_day]);
    const driverFee = useMemo(() => data.with_driver ? DRIVER_FEE_PER_DAY * rentalDays : 0, [data.with_driver, rentalDays]);
    const total = useMemo(() => subtotal + driverFee, [subtotal, driverFee]);

    const isTimeValid = useMemo(() => {
        if (!data.start_date || !data.pickup_time || !data.end_date || !data.return_time) return true;

        const startDateTime = new Date(`${data.start_date}T${data.pickup_time}`);
        const endDateTime = new Date(`${data.end_date}T${data.return_time}`);
        const now = new Date();

        if (startDateTime < now) return false;
        if (endDateTime <= startDateTime) return false;

        return true;
    }, [data.start_date, data.pickup_time, data.end_date, data.return_time]);

    const canSubmit = useMemo(() => {
        const baseValid = !!data.start_date && !!data.end_date && rentalDays > 0 && !isDateOverlapping && isTimeValid;
        const deliveryValid = data.delivery_type === 'self_pickup' || (data.delivery_type === 'delivery' && data.delivery_address.trim() !== '');
        const driverValid = !data.with_driver || (data.driver_id !== '' && !isDriverOverlapping);
        return baseValid && deliveryValid && driverValid;
    }, [data, rentalDays, isDateOverlapping, isTimeValid, isDriverOverlapping]);

    const submitBooking = () => {
        if (!auth.user) { router.get(login().url); return; }
        if (auth.user.role === 'admin') { alert('Anda tidak dapat memesan sebagai admin.'); return; }
        post(book(car.id).url);
    };

    const images = useMemo(() => {
        if (car.images && car.images.length > 0) return car.images;
        return [{ url: car.image_url, alt: `${car.make} ${car.model}` }];
    }, [car]);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    return (
        <HomeLayout>
            <div className="min-h-screen bg-slate-50 py-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl mix-blend-multiply pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-100 opacity-50 blur-3xl mix-blend-multiply pointer-events-none" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 font-medium">
                        <Link href="/fleet" className="transition-colors duration-200 hover:text-blue-600">Armada</Link>
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            {car.make} {car.model}
                        </span>
                    </nav>

                    {/* Header */}
                    <div className="mb-10 flex items-center gap-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30 text-white">
                            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Pesan Kendaraan</h1>
                            <p className="mt-1 text-gray-500 font-medium">Selesaikan reservasi Anda untuk pengalaman berkendara premium.</p>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 items-start">
                        <div className="space-y-8 lg:col-span-2">

                            {/* Car Image */}
                            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl group">
                                <div className="relative h-64 sm:h-96 bg-gray-100 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10" />
                                    <img src={images[0]?.url} alt={images[0]?.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute bottom-6 left-6 z-20">
                                        <h2 className="text-3xl font-bold text-white drop-shadow-md">{car.make} {car.model}</h2>
                                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-medium text-white">
                                            <span className="flex items-center rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 border border-white/10">
                                                <svg className="mr-2 h-4 w-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                Tahun {car.year}
                                            </span>
                                            <span className="flex items-center rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 border border-white/10 capitalize">
                                                <svg className="mr-2 h-4 w-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                {car.fuel_type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <p className="leading-relaxed text-gray-600">{car.description}</p>
                                </div>
                            </div>

                            {/* Booking Form */}
                            <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xl">
                                <h3 className="mb-8 text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4">Detail Perjalanan</h3>

                                <div className="space-y-8">

                                    {/* Step 1: Tanggal */}
                                    <div>
                                        <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3 text-sm">1</span>
                                            Kapan Anda ingin menyewa?
                                        </h4>

                                        {/* List of booked dates */}
                                        {bookedRanges && bookedRanges.length > 0 && (
                                            <div className="mb-4 ml-11 rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
                                                <p className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1.5">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Jadwal Pesanan Mobil Ini (Tidak Tersedia):
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {bookedRanges.map((range: any, idx: number) => (
                                                        <span key={idx} className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                                                            {new Date(range.start).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} {range.pickup_time}
                                                            <span> - </span>
                                                            {new Date(range.end).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} {range.return_time}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid gap-6 md:grid-cols-2 ml-11">
                                            <div className="relative">
                                                <label className="absolute left-3 -top-2.5 bg-white px-2 text-xs font-semibold text-blue-600 z-10">Tanggal Pengambilan</label>
                                                <input type="date" value={data.start_date}
                                                    onChange={(e) => setData('start_date', e.target.value)}
                                                    min={minDate} max={maxDate}
                                                    className={`w-full rounded-xl border-2 bg-transparent px-4 py-3.5 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none ${errors.start_date ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`} />
                                                {errors.start_date && <span className="text-xs text-red-500">{errors.start_date}</span>}
                                            </div>
                                            <div className="relative">
                                                <label className="absolute left-3 -top-2.5 bg-white px-2 text-xs font-semibold text-blue-600 z-10">Tanggal Pengembalian</label>
                                                <input type="date" value={data.end_date}
                                                    onChange={(e) => setData('end_date', e.target.value)}
                                                    min={data.start_date || minDate} max={maxDate}
                                                    className={`w-full rounded-xl border-2 bg-transparent px-4 py-3.5 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none ${errors.end_date ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`} />
                                                {errors.end_date && <span className="text-xs text-red-500">{errors.end_date}</span>}
                                            </div>

                                            <div className="relative">
                                                <label className="absolute left-3 -top-2.5 bg-white px-2 text-xs font-semibold text-blue-600 z-10">Jam Pengambilan</label>
                                                <input type="time" value={data.pickup_time}
                                                    onChange={(e) => setData('pickup_time', e.target.value)}
                                                    className={`w-full rounded-xl border-2 bg-transparent px-4 py-3.5 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none ${errors.pickup_time ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`} />
                                                {errors.pickup_time && <span className="text-xs text-red-500">{errors.pickup_time}</span>}
                                            </div>
                                            <div className="relative">
                                                <label className="absolute left-3 -top-2.5 bg-white px-2 text-xs font-semibold text-blue-600 z-10">Jam Pengembalian</label>
                                                <input type="time" value={data.return_time}
                                                    onChange={(e) => setData('return_time', e.target.value)}
                                                    className={`w-full rounded-xl border-2 bg-transparent px-4 py-3.5 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none ${errors.return_time ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`} />
                                                {errors.return_time && <span className="text-xs text-red-500">{errors.return_time}</span>}
                                            </div>

                                            {isDateOverlapping && (
                                                <div className="col-span-2 mt-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-bold text-red-600 flex items-center gap-2">
                                                    <svg className="h-5 w-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                                    </svg>
                                                    Mobil sudah dipesan pada tanggal tersebut. Silakan pilih tanggal lain yang tersedia.
                                                </div>
                                            )}

                                            {!isTimeValid && !isDateOverlapping && data.start_date && data.pickup_time && (
                                                <div className="col-span-2 mt-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-bold text-red-600 flex items-center gap-2">
                                                    <svg className="h-5 w-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                                    </svg>
                                                    Waktu pengambilan tidak boleh di masa lalu, dan waktu pengembalian harus setelah waktu pengambilan.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Step 2: Pengambilan */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3 text-sm">2</span>
                                            Bagaimana cara pengambilan?
                                        </h4>
                                        <div className="ml-11 grid gap-4 md:grid-cols-2">
                                            <button type="button"
                                                onClick={() => {
                                                    setData(prev => ({
                                                        ...prev,
                                                        delivery_type: 'self_pickup',
                                                        with_driver: false,
                                                        driver_id: ''
                                                    }));
                                                }}
                                                className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${data.delivery_type === 'self_pickup' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${data.delivery_type === 'self_pickup' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Ambil Sendiri</p>
                                                    <p className="text-xs text-gray-500">Datang ke Tempat kami</p>
                                                </div>
                                            </button>

                                            <button type="button"
                                                onClick={() => setData('delivery_type', 'delivery')}
                                                className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${data.delivery_type === 'delivery' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${data.delivery_type === 'delivery' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Diantar/Dijemput ke Lokasi</p>
                                                    <p className="text-xs text-gray-500">Kami antar ke alamat Anda</p>
                                                </div>
                                            </button>
                                        </div>

                                        {data.delivery_type === 'delivery' && (
                                            <div className="mt-4 ml-11">
                                                <div className="relative">
                                                    <label className="absolute left-3 -top-2.5 bg-white px-2 text-xs font-semibold text-blue-600 z-10">Alamat Pengiriman</label>
                                                    <input type="text" value={data.delivery_address}
                                                        onChange={(e) => setData('delivery_address', e.target.value)}
                                                        placeholder="Masukkan alamat lengkap..."
                                                        className={`w-full rounded-xl border-2 bg-transparent px-4 py-3.5 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none ${errors.delivery_address ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`} />
                                                    {errors.delivery_address && <span className="text-xs text-red-500">{errors.delivery_address}</span>}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Step 3: Sopir */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3 text-sm">3</span>
                                            Apakah ingin menyewa sopir?
                                        </h4>
                                        <div className="ml-11 grid gap-4 md:grid-cols-2">
                                            <button type="button"
                                                onClick={() => { setData('with_driver', false); setData('driver_id', ''); }}
                                                className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${!data.with_driver ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${!data.with_driver ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Tanpa Sopir</p>
                                                    <p className="text-xs text-gray-500">Saya akan mengemudi sendiri</p>
                                                </div>
                                            </button>

                                            <button type="button"
                                                onClick={() => setData('with_driver', true)}
                                                disabled={data.delivery_type === 'self_pickup'}
                                                className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                                                    data.with_driver 
                                                        ? 'border-blue-600 bg-blue-50' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                } ${
                                                    data.delivery_type === 'self_pickup' 
                                                        ? 'opacity-50 cursor-not-allowed' 
                                                        : ''
                                                }`}>
                                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${data.with_driver ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Dengan Sopir</p>
                                                    {data.delivery_type === 'self_pickup' ? (
                                                        <p className="text-xs text-amber-600 font-bold">Tidak tersedia untuk Ambil Sendiri</p>
                                                    ) : (
                                                        <p className="text-xs text-gray-500">+{formatCurrency(DRIVER_FEE_PER_DAY)}/hari</p>
                                                    )}
                                                </div>
                                            </button>
                                        </div>

                                        {data.with_driver && (
                                            <div className="mt-4 ml-11">
                                                {drivers.length === 0 ? (
                                                    <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                                                        Tidak ada sopir tersedia saat ini.
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        <div className="relative">
                                                            <label className="absolute left-3 -top-2.5 bg-white px-2 text-xs font-semibold text-blue-600 z-10">Pilih Sopir</label>
                                                            <select value={data.driver_id}
                                                                onChange={(e) => setData('driver_id', e.target.value)}
                                                                className={`w-full appearance-none rounded-xl border-2 bg-transparent px-4 py-3.5 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none ${errors.driver_id || isDriverOverlapping ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`}>
                                                                <option value="">-- Pilih Sopir --</option>
                                                                {drivers.map((d) => (
                                                                    <option key={d.id} value={d.id}>{d.name} — {d.phone}</option>
                                                                ))}
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                                            </div>
                                                            {errors.driver_id && <span className="text-xs text-red-500">{errors.driver_id}</span>}
                                                        </div>

                                                        {/* Indikator Jadwal Sopir */}
                                                        {data.driver_id && selectedDriverSchedule.length > 0 && (
                                                            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-xs text-amber-800">
                                                                <p className="font-bold flex items-center gap-1.5 mb-2">
                                                                    <svg className="h-4 w-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                    Jadwal Mengemudi Sopir Ini (Tidak Tersedia):
                                                                </p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {selectedDriverSchedule.map((range, idx) => (
                                                                        <span key={idx} className="inline-block px-2.5 py-1 font-extrabold rounded-lg bg-amber-100/70 border border-amber-200 text-amber-900">
                                                                            {range}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {isDriverOverlapping && (
                                                            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 font-medium flex items-start gap-3">
                                                                <svg className="h-5 w-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                                <div>
                                                                    <p className="font-bold">Jadwal Bentrok!</p>
                                                                    <p className="text-xs text-red-600 mt-1">Sopir yang Anda pilih sudah terbooking untuk tanggal sewa tersebut. Silakan pilih sopir lain atau sesuaikan tanggal sewa Anda.</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Price Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 rounded-3xl bg-slate-900 p-8 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20 -ml-10 -mb-10" />

                                <div className="relative z-10">
                                    <h3 className="mb-8 text-2xl font-bold border-b border-gray-700 pb-4">Rincian Biaya</h3>

                                    <div className="mb-8 space-y-4">
                                        <div className="flex items-center justify-between text-gray-300">
                                            <span>Tarif per Hari</span>
                                            <span className="font-semibold text-white">{formatCurrency(parseFloat(car.price_per_day || '0'))}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-300">
                                            <span>Durasi Sewa</span>
                                            <span className="font-semibold text-white">{rentalDays > 0 ? `${rentalDays} Hari` : '-'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-300">
                                            <span>Metode Pengambilan</span>
                                            <span className="font-semibold text-white">{data.delivery_type === 'self_pickup' ? 'Ambil Sendiri' : 'Diantar'}</span>
                                        </div>

                                        {data.with_driver && (
                                            <>
                                                <div className="flex items-center justify-between text-gray-300">
                                                    <span>Sopir</span>
                                                    <span className="font-semibold text-white">
                                                        {data.driver_id
                                                            ? drivers.find(d => String(d.id) === data.driver_id)?.name ?? 'Belum dipilih'
                                                            : 'Belum dipilih'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-gray-300">
                                                    <span>Biaya Sopir ({rentalDays} hari)</span>
                                                    <span className="font-semibold text-white">{formatCurrency(driverFee)}</span>
                                                </div>
                                            </>
                                        )}

                                        <div className="flex items-center justify-between text-gray-300 pt-2 border-t border-gray-700 border-dashed">
                                            <span>Subtotal Mobil</span>
                                            <span className="font-semibold text-white">{formatCurrency(rentalDays > 0 ? subtotal : 0)}</span>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-gray-700">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Pembayaran</span>
                                                <span className="text-3xl font-extrabold text-blue-400">{formatCurrency(rentalDays > 0 ? total : 0)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={submitBooking} disabled={!canSubmit || processing}
                                        className={`group relative flex w-full items-center justify-center overflow-hidden rounded-xl px-6 py-4 font-bold transition-all duration-300 ${canSubmit && !processing ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:-translate-y-1 cursor-pointer' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
                                        <span className="relative z-10 flex items-center gap-2">
                                            {processing ? (
                                                <>
                                                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                                    Memproses...
                                                </>
                                            ) : !auth.user ? (
                                                <>
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                                                    Login untuk Memesan
                                                </>
                                            ) : (
                                                <>
                                                    Konfirmasi & Bayar
                                                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                </>
                                            )}
                                        </span>
                                    </button>

                                    {!canSubmit && auth.user && (
                                        <p className="mt-4 text-center text-xs text-gray-400">Lengkapi formulir perjalanan untuk melanjutkan.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}