import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';

interface Ticket {
    id: number;
    subject: string;
    status: string;
    created_at: string;
    guest_name?: string;
    guest_email?: string;
    user?: { name: string; email: string };
}

interface Props {
    tickets: {
        data: Ticket[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    filters: { search?: string; status?: string; type?: string };
    statuses: Record<string, { label: string; color: string }>;
    statusCounts: {
        customer: Record<string, number>;
        guest: Record<string, number>;
    };
}

export default function SupportIndex({ tickets, filters, statuses, statusCounts }: Props) {
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    const [ticketType, setTicketType] = useState(filters?.type || 'customer');

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

    const doSearch = (overrideStatus?: string, overrideType?: string) => {
        router.get('/admin/support', {
            search,
            status: (overrideStatus ?? statusFilter) === 'all' ? undefined : (overrideStatus ?? statusFilter),
            type: overrideType ?? ticketType,
        }, { preserveState: true, replace: true });
    };

    useEffect(() => {
        if (search === '' && filters?.search) doSearch();
    }, [search]);

    const handleTypeChange = (type: string) => {
        setTicketType(type);
        setStatusFilter('all');
        doSearch('all', type);
    };

    const handleStatusChange = (status: string) => {
        setStatusFilter(status);
        doSearch(status);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus tiket ini? Tindakan ini tidak dapat dibatalkan.')) {
            router.delete(`/admin/support/tickets/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const currentCounts = statusCounts?.[ticketType as 'customer' | 'guest'] ?? {};

    return (
        <AdminLayout>
            <Head title="Support" />
            <main className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold">Support Tickets</h1>
                </div>

                {/* Ticket Type Toggle */}
                <div className="flex gap-2">
                    {['customer', 'guest'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeChange(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                ticketType === type
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                        >
                            {type === 'customer' ? 'Customer' : 'Guest'} ({statusCounts?.[type as 'customer' | 'guest']?.all ?? 0})
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && doSearch()}
                        placeholder="Cari tiket, nama, email..."
                        className="max-w-md w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                        onClick={() => doSearch()}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Cari
                    </button>
                </div>

                {/* Status Filter */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => handleStatusChange('all')}
                        className={`px-3 py-1.5 text-sm rounded-full cursor-pointer transition-colors ${
                            statusFilter === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                        Semua ({currentCounts.all ?? 0})
                    </button>
                    {Object.entries(statuses || {}).map(([key, status]) => (
                        <button
                            key={key}
                            onClick={() => handleStatusChange(key)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full cursor-pointer transition-colors ${
                                statusFilter === key
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                        >
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color }} />
                            {status.label} ({currentCounts[key] ?? 0})
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {ticketType === 'customer' ? 'Customer' : 'Guest'}
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tickets.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                        Tidak ada tiket ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                tickets.data.map((ticket) => {
                                    const color = getStatusColor(ticket.status);
                                    return (
                                        <tr
                                            key={ticket.id}
                                            onClick={() => router.visit(`/admin/support/tickets/${ticket.id}`)}
                                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-500">#{ticket.id}</td>
                                            <td className="px-4 py-3">
                                                <div className="font-medium text-gray-900">{ticket.subject}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {ticketType === 'customer' ? (
                                                    <>
                                                        <div className="font-medium">{ticket.user?.name ?? '—'}</div>
                                                        <div className="text-xs text-muted-foreground">{ticket.user?.email}</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="font-medium">{ticket.guest_name ?? '—'}</div>
                                                        <div className="text-xs text-muted-foreground">{ticket.guest_email}</div>
                                                    </>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium"
                                                    style={{ backgroundColor: color.bg, color: color.text }}
                                                >
                                                    <span className="size-2 rounded-full" style={{ backgroundColor: color.dot }} />
                                                    {statuses[ticket.status]?.label ?? ticket.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                <div>{new Date(ticket.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                                <div className="text-xs">{new Date(ticket.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>
                                            </td>
                                            <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/support/tickets/${ticket.id}`}
                                                        className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                                                    >
                                                        Lihat
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(ticket.id)}
                                                        className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {tickets.links?.length > 0 && (
                    <nav className="flex gap-2">
                        {tickets.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
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
        </AdminLayout>
    );
}