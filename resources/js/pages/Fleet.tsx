import CarCard from '@/components/CarCard';
import HomeLayout from '@/layouts/HomeLayout';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    price_per_day: string;
    description: string;
    fuel_type: string;
    image_url: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Cars {
    data: Car[];
    total: number;
    from: number;
    to: number;
    current_page: number;
    last_page: number;
    links: PaginationLink[];
}

interface Filters {
    search?: string;
    make?: string;
    fuel_type?: string;
    min_price?: string;
    max_price?: string;
    year?: string;
    sort?: string;
}

interface Props {
    cars: Cars;
    filters: Filters;
    makes: string[];
    fuelTypes: string[];
    years: number[];
}

export default function Fleet() {
    const $page = usePage();
    const props = $page.props as any;
    const cars = props.cars;
    const filters = props.filters ?? {};
    const makes = props.makes ?? [];
    const fuelTypes = props.fuelTypes ?? [];
    const years = props.years ?? [];

    const [searchQuery, setSearchQuery] = useState(() => filters?.search || '');
    const [selectedMake, setSelectedMake] = useState(() => filters?.make || '');
    const [selectedFuelType, setSelectedFuelType] = useState(() => filters?.fuel_type || '');
    const [minPrice, setMinPrice] = useState(() => filters?.min_price || '');
    const [maxPrice, setMaxPrice] = useState(() => filters?.max_price || '');
    const [selectedYear, setSelectedYear] = useState(() => filters?.year || '');
    const [sortBy, setSortBy] = useState(() => filters?.sort || 'make_asc');
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const applyFilters = (overrides?: Partial<typeof filters>) => {
        setIsLoading(true);
        const params: Record<string, any> = {};

        const s = overrides?.search !== undefined ? overrides.search : searchQuery;
        const mk = overrides?.make !== undefined ? overrides.make : selectedMake;
        const ft = overrides?.fuel_type !== undefined ? overrides.fuel_type : selectedFuelType;
        const mn = overrides?.min_price !== undefined ? overrides.min_price : minPrice;
        const mx = overrides?.max_price !== undefined ? overrides.max_price : maxPrice;
        const yr = overrides?.year !== undefined ? overrides.year : selectedYear;
        const so = overrides?.sort !== undefined ? overrides.sort : sortBy;

        if (s?.trim()) params.search = s.trim();
        if (mk) params.make = mk;
        if (ft) params.fuel_type = ft;
        if (mn) params.min_price = mn;
        if (mx) params.max_price = mx;
        if (yr) params.year = yr;
        if (so && so !== 'make_asc') params.sort = so;

        router.get('/fleet', params, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedMake('');
        setSelectedFuelType('');
        setMinPrice('');
        setMaxPrice('');
        setSelectedYear('');
        setSortBy('make_asc');
        setIsLoading(true);
        router.get('/fleet', {}, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        applyFilters();
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
        applyFilters({ sort: value });
    };

    const goToPage = (url: string | null) => {
        if (url) {
            setIsLoading(true);
            router.visit(url, {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            });
        }
    };

    const hasActiveFilters = searchQuery.trim() || selectedMake || selectedFuelType || minPrice || maxPrice || selectedYear || (sortBy && sortBy !== 'make_asc');

    const activeFilterCount = [searchQuery.trim(), selectedMake, selectedFuelType, minPrice, maxPrice, selectedYear].filter(Boolean).length;

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Loading Overlay */}
                {isLoading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                        <div className="flex items-center space-x-4 rounded-2xl bg-white p-8 shadow-2xl">
                            <div className="relative">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"></div>
                            </div>
                            <span className="text-lg font-medium text-gray-700">Mencari Kendaraan...</span>
                        </div>
                    </div>
                )}

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Filters Sidebar */}
                        <div className="lg:w-1/4">
                            {/* Mobile Filter Toggle */}
                            <div className="mb-6 lg:hidden">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="group flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 text-left font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
                                >
                                    <span className="flex items-center">
                                        <div className="mr-3 rounded-lg bg-blue-100 p-2 transition-colors group-hover:bg-blue-200">
                                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                            </svg>
                                        </div>
                                        Filter & Pencarian
                                        {hasActiveFilters && (
                                            <span className="ml-2 rounded-full bg-blue-500 px-2 py-1 text-xs text-white">{activeFilterCount}</span>
                                        )}
                                    </span>
                                    <svg className={`h-5 w-5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Filters Panel */}
                            <div className={`sticky top-16 space-y-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg lg:block ${!showFilters ? 'hidden lg:block' : ''}`}>
                                {/* Search Form */}
                                <div>
                                    <form onSubmit={handleSearch} className="space-y-3">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Cari merek, model, atau fitur..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                                className="w-full rounded-xl border border-gray-300 py-2 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                            />
                                            <svg className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl focus:ring-4 focus:ring-blue-200 cursor-pointer"
                                        >
                                            Cari Kendaraan
                                        </button>
                                    </form>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="space-y-3">
                                        {/* Make Filter */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Merek Kendaraan</label>
                                            <select
                                                value={selectedMake}
                                                onChange={(e) => setSelectedMake(e.target.value)}
                                                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                            >
                                                <option value="">Semua Merek</option>
                                                {makes.map((make: string) => (
                                                    <option key={make} value={make}>{make}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Fuel Type Filter */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Jenis Bahan Bakar</label>
                                            <select
                                                value={selectedFuelType}
                                                onChange={(e) => setSelectedFuelType(e.target.value)}
                                                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                            >
                                                <option value="">Semua Bahan Bakar</option>
                                                {fuelTypes.map((fuelType: string) => (
                                                    <option key={fuelType} value={fuelType}>
                                                        {fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Year Filter */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Tahun Model</label>
                                            <select
                                                value={selectedYear}
                                                onChange={(e) => setSelectedYear(e.target.value)}
                                                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                            >
                                                <option value="">Semua Tahun</option>
                                                {years.map((year: number) => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Price Range */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Rentang Harga per Hari</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="relative">
                                                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">Rp</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Min"
                                                        value={minPrice}
                                                        onChange={(e) => setMinPrice(e.target.value)}
                                                        className="w-full rounded-xl border border-gray-300 py-2 pr-4 pl-10 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">Rp</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Maks"
                                                        value={maxPrice}
                                                        onChange={(e) => setMaxPrice(e.target.value)}
                                                        className="w-full rounded-xl border border-gray-300 py-2 pr-4 pl-10 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3 border-t border-gray-200 pt-6">
                                    <button
                                        onClick={() => applyFilters()}
                                        className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl focus:ring-4 focus:ring-blue-200"
                                    >
                                        Terapkan Filter
                                    </button>
                                    <button
                                        onClick={clearFilters}
                                        className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
                                    >
                                        Hapus Semua Filter
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cars Grid */}
                        <div className="lg:w-3/4">
                            {/* Results Summary */}
                            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            <span>{cars.total.toLocaleString('id-ID')}</span>
                                            <span> Kendaraan Tersedia</span>
                                        </h2>                                  
                                        <p className="text-sm text-gray-600">Menampilkan {cars.from} - {cars.to} hasil</p>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <span>Halaman {cars.current_page} dari {cars.last_page}</span>
                                        <div className="h-4 w-px bg-gray-300"></div>
                                        <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">{cars.data.length} ditampilkan</span>
                                    </div>
                                </div>
                            </div>

                            {/* Cars Grid */}
                            {cars.data.length > 0 ? (
                                <div className="grid gap-8 md:grid-cols-1 xl:grid-cols-2">
                                    {cars.data.map((car: any) => (
                                        <CarCard key={car.id} car={car} />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center shadow-sm">
                                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                        <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.058 0-3.9.785-5.293 2.071A8.003 8.003 0 014 12C4 7.582 7.582 4 12 4s8 3.582 8 8c0 1.996-.732 3.82-1.945 5.224L16 19l-4-4z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-3 text-2xl font-semibold text-gray-900">Kendaraan Tidak Ditemukan</h3>
                                    <p className="mx-auto mb-8 max-w-md leading-relaxed text-gray-600">
                                        Kami tidak dapat menemukan kendaraan yang sesuai dengan kriteria Anda. Coba sesuaikan filter atau kata pencarian untuk menemukan lebih banyak pilihan.
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700"
                                    >
                                        Lihat Semua Kendaraan
                                    </button>
                                </div>
                            )}

                            {/* Pagination */}
                            {cars.data.length > 0 && cars.last_page > 1 && (
                                <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                                        {/* Mobile pagination */}
                                        <div className="flex w-full justify-between sm:hidden">
                                            {cars.current_page > 1 && (
                                                <button
                                                    onClick={() => goToPage(cars.links[0].url)}
                                                    className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700"
                                                >
                                                    Sebelumnya
                                                </button>
                                            )}
                                            <span className="flex items-center rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700">
                                                Halaman {cars.current_page} dari {cars.last_page}
                                            </span>
                                            {cars.current_page < cars.last_page && (
                                                <button
                                                    onClick={() => goToPage(cars.links[cars.links.length - 1].url)}
                                                    className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700"
                                                >
                                                    Selanjutnya
                                                </button>
                                            )}
                                        </div>

                                        {/* Desktop pagination */}
                                        <div className="hidden items-center space-x-2 sm:flex">
                                            {cars.links.map((link: any, index: number) => (
                                                <button
                                                    key={index}
                                                    onClick={() => goToPage(link.url)}
                                                    disabled={!link.url}
                                                    className={`cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                                        link.active
                                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                                            : link.url
                                                            ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                            : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>

                                        {/* Results info */}
                                        <div className="text-sm text-gray-600">
                                            Menampilkan <span className="font-semibold text-gray-900">{cars.from}</span> hingga <span className="font-semibold text-gray-900">{cars.to}</span> dari <span className="font-semibold text-gray-900">{cars.total}</span> hasil
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}