import AdminLayout from '@/layouts/AdminLayout';
import { create, destroy, index } from '@/routes/admin/cars';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    license_plate: string;
    price_per_day: string | number;
    status: string;
    status_label?: string;
    status_color?: string;
    image_url?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface StatusData {
    label: string;
    count: number;
    color: string;
}

interface Props {
    cars: {
        data: Car[];
        links: PaginationLink[];
    };
    filters: {
        search?: string;
        status?: string;
    };
    statuses: Record<string, StatusData>;
    currency: { symbol: string; code: string };
}

export default function Index({ cars, filters, statuses, currency }: Props) {
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [carToDelete, setCarToDelete] = useState<number | null>(null);
    const prevSearch = useRef(search);

    const statusColors = useMemo(() => {
        const colors: Record<string, { bg: string; text: string; dot: string }> = {};
        for (const [status, data] of Object.entries(statuses || {})) {
            const hex = data.color.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            colors[status] = {
                bg: `rgba(${r}, ${g}, ${b}, 0.1)`,
                text: data.color,
                dot: data.color,
            };
        }
        return colors;
    }, [statuses]);

    const getStatusColor = (status: string) => {
        return statusColors[status] || { bg: 'rgba(107, 114, 128, 0.1)', text: '#6B7280', dot: '#6B7280' };
    };

    const doSearch = (overrideStatus?: string) => {
        const currentStatus = overrideStatus ?? statusFilter;
        router.get(
            index().url,
            {
                search,
                status: currentStatus === 'all' ? undefined : currentStatus,
            },
            { preserveState: true, replace: true },
        );
    };

    useEffect(() => {
        if (search === '' && prevSearch.current !== '') {
            doSearch();
        }
        prevSearch.current = search;
    }, [search]);

    const openDeleteDialog = (id: number) => {
        setCarToDelete(id);
        setShowDeleteDialog(true);
    };

    const destroyCar = () => {
        if (!carToDelete) return;
        router.delete(destroy(carToDelete).url, {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteDialog(false);
                setCarToDelete(null);
            },
        });
    };

    const totalCars = Object.values(statuses || {}).reduce((acc, curr) => acc + curr.count, 0);

    return (
        <>
            <Head title="Cars" />
            <AdminLayout>
                <main className="flex-1 space-y-6 p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold">Cars</h1>
                        <Link
                            href={create().url}
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            + New Car
                        </Link>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && doSearch()}
                                placeholder="Search make, model, plate..."
                                className="max-w-md w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <button
                                onClick={() => doSearch()}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Search
                            </button>
                        </div>

                        {/* Status Filter */}
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={() => {
                                    setStatusFilter('all');
                                    doSearch('all');
                                }}
                                className={`px-3 py-1.5 text-sm rounded-full cursor-pointer transition-colors ${
                                    statusFilter === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                            >
                                All ({totalCars})
                            </button>

                            {Object.entries(statuses || {}).map(([key, status]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setStatusFilter(key);
                                        doSearch(key);
                                    }}
                                    className={`px-3 py-1.5 text-sm rounded-full cursor-pointer transition-colors flex items-center gap-1.5 ${
                                        statusFilter === key
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                                >
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: status.color }}
                                    />
                                    {status.label} ({status.count})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-md border">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Day</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cars.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                            No cars found.
                                        </td>
                                    </tr>
                                ) : (
                                    cars.data.map((car) => {
                                        const color = getStatusColor(car.status);
                                        return (
                                            <tr key={car.id}>
                                                <td className="px-4 py-3">
                                                    <img
                                                        src={car.image_url}
                                                        alt="Car"
                                                        className="h-12 w-16 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="font-medium">
                                                        {car.year} {car.make} {car.model}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">{car.license_plate}</td>
                                                <td className="px-4 py-3">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(car.price_per_day))}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium"
                                                        style={{ backgroundColor: color.bg, color: color.text }}
                                                    >
                                                        <span
                                                            className="size-2 rounded-full"
                                                            style={{ backgroundColor: color.dot }}
                                                        />
                                                        {car.status_label || car.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right space-x-2">
                                                    <Link
                                                        href={`/admin/cars/${car.id}/edit`}
                                                        className="inline-flex items-center rounded-md border border-input px-3 py-1.5 text-sm font-medium hover:bg-accent"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => openDeleteDialog(car.id)}
                                                        className="inline-flex items-center rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {cars.links?.length > 0 && (
                        <nav className="flex gap-2">
                            {cars.links.map((link, i) => (
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
                                Delete Car
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Are you sure you want to delete this car? This action cannot be undone.
                            </p>
                            <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                                This will permanently delete the car and all its associated data.
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDeleteDialog(false)}
                                    className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={destroyCar}
                                    disabled={!carToDelete}
                                    className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white hover:bg-destructive/90 disabled:opacity-50"
                                >
                                    Delete Car
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </>
    );
}