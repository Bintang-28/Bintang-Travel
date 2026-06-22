import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import { show, index as indexRoute, destroy } from '@/routes/admin/reservations';

interface Props {
    reservations: {
        data: Array<{
            id: number;
            reservation_number: string;
            user: { id: number; name: string; email: string } | null;
            car: { id: number; make: string; model: string; year: number; license_plate: string } | null;
            start_date: string;
            end_date: string;
            total_days: number;
            total_amount: number | string;
            status: string;
            created_at: string; // tambah ini
        }>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    filters: { search?: string; status?: string };
    statuses: Record<string, { label: string; count: number; color: string }>;
    currency: { symbol: string; code: string };
}

export default function ReservationsIndex({ reservations, filters, statuses, currency }: Props) {
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [reservationToDelete, setReservationToDelete] = useState<number | null>(null);

    const statusColors = useMemo(() => {
        const colors: Record<string, { bg: string; text: string; dot: string }> = {};
        for (const [status, data] of Object.entries(statuses || {})) {
            const hex = data.color?.replace('#', '') || '6B7280';
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            colors[status] = { bg: `rgba(${r}, ${g}, ${b}, 0.1)`, text: data.color, dot: data.color };
        }
        return colors;
    }, [statuses]);

    const getStatusColor = (status: string) => {
        return statusColors[status] || { bg: 'rgba(107, 114, 128, 0.1)', text: '#6B7280', dot: '#6B7280' };
    };

    const doSearch = (statusValue: string = statusFilter) => {
        router.get(indexRoute().url, {
            search,
            status: statusValue === 'all' ? null : statusValue,
        }, { preserveState: true, replace: true });
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') doSearch();
    };

    useEffect(() => {
        if (search === '' && filters?.search) doSearch();
    }, [search]);

    const handleStatusChange = (val: string) => {
        setStatusFilter(val);
        doSearch(val);
    };

    const openDeleteDialog = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // supaya tidak trigger row click
        setReservationToDelete(id);
        setShowDeleteDialog(true);
    };

    const destroyReservation = () => {
        if (!reservationToDelete) return;
        router.delete(destroy(reservationToDelete).url, {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteDialog(false);
                setReservationToDelete(null);
            },
        });
    };

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
    };

    return (
        <AdminLayout>
            <Head title="Reservations" />
            <main className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold">Reservations</h1>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search reservation #, client, car, plate..."
                            className="max-w-md"
                            onKeyDown={handleSearchKeyDown}
                        />
                        <Button onClick={() => doSearch()} className="!bg-blue-600 !text-white hover:!bg-blue-700">Search</Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <label className="inline-flex items-center">
                            <input type="radio" className="hidden" checked={statusFilter === 'all'} onChange={() => handleStatusChange('all')} />
                            <span className={`cursor-pointer rounded-full px-3 py-1.5 text-sm transition-colors ${statusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                                All ({Object.values(statuses).reduce((acc, curr) => acc + curr.count, 0)})
                            </span>
                        </label>

                        {Object.entries(statuses).map(([key, status]) => (
                            <label key={key} className="inline-flex items-center">
                                <input type="radio" className="hidden" checked={statusFilter === key} onChange={() => handleStatusChange(key)} />
                                <span className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${statusFilter === key ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: status.color }}></span>
                                    {status.label} ({status.count})
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Client</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Car</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Dates</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Dipesan</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Total</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {reservations.data.length > 0 ? (
                                reservations.data.map(res => {
                                    const ordered = formatDateTime(res.created_at);
                                    return (
                                        <tr key={res.id} onClick={() => router.visit(show(res.id).url)} className="cursor-pointer transition-colors hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">{res.reservation_number}</td>
                                            <td className="px-4 py-3">
                                                <div className="font-medium">{res.user?.name || '—'}</div>
                                                <div className="text-xs text-muted-foreground">{res.user?.email}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="font-medium">{res.car ? `${res.car.year} ${res.car.make} ${res.car.model}` : '—'}</div>
                                                <div className="text-xs text-muted-foreground">{res.car?.license_plate}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="font-medium">
                                                    {new Date(res.start_date).toLocaleDateString('id-ID')} → {new Date(res.end_date).toLocaleDateString('id-ID')}
                                                </div>
                                                <div className="text-xs text-muted-foreground">{res.total_days} hari</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="font-medium">{ordered.date}</div>
                                                <div className="text-xs text-muted-foreground">{ordered.time}</div>
                                            </td>
                                            <td className="px-4 py-3">{currency.symbol} {Number(res.total_amount).toFixed(2)}</td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: getStatusColor(res.status).bg, color: getStatusColor(res.status).text }}>
                                                    <span className="size-2 rounded-full" style={{ backgroundColor: getStatusColor(res.status).dot }} />
                                                    {statuses[res.status]?.label || res.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={(e) => openDeleteDialog(e, res.id)}
                                                    className="inline-flex items-center rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-4 py-6 text-center text-gray-500">No reservations found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {reservations.links?.length > 0 && (
                    <nav className="flex gap-2">
                        {reservations.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`rounded px-3 py-1 text-sm ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                )}
            </main>

            {/* Delete Dialog */}
            {showDeleteDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteDialog(false)} />
                    <div className="relative z-10 w-full max-w-md rounded-xl border bg-white p-6 shadow-xl">
                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                            <svg className="h-5 w-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Hapus Reservasi
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Apakah kamu yakin ingin menghapus reservasi ini? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                            Data reservasi beserta semua informasi terkait akan dihapus secara permanen.
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteDialog(false)}
                                className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={destroyReservation}
                                className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white hover:bg-destructive/90"
                            >
                                Hapus Reservasi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}