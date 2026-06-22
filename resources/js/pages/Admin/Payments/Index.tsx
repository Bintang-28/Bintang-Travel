import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

interface Payment {
    id: number;
    payment_number: string;
    amount: number | string;
    currency?: string;
    payment_method: string;
    status: string;
    processed_at?: string | null;
    user?: { id: number; name: string; email: string } | null;
    reservation?: { id: number; reservation_number: string } | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface StatusData {
    value: string;
    label: string;
    color: string;
}

interface Props {
    payments: {
        data: Payment[];
        links: PaginationLink[];
    };
    statuses: Record<string, StatusData>;
    currency: { symbol: string; code: string };
}

function hexToRgba(hex: string, alpha: number) {
    const h = hex?.replace('#', '') || '6B7280';
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function PaymentsIndex() {
    const page = usePage();
    const { payments, statuses, currency } = page.props as unknown as Props;

    const fmtMoney = (n?: number | string) => {
        const v = Number(n ?? 0);
        return `${currency.symbol}${v.toFixed(2)}`;
    };

    const getStatusColor = (status: string) => {
        const data = statuses[status];
        if (!data) {
            return { bg: 'rgba(107, 114, 128, 0.1)', text: '#6B7280', dot: '#6B7280' };
        }
        return {
            bg: hexToRgba(data.color, 0.1),
            text: data.color,
            dot: data.color,
        };
    };

    const handleDelete = (id: number, paymentNumber: string) => {
        if (confirm(`Hapus payment ${paymentNumber}? Tindakan ini tidak dapat dibatalkan.`)) {
            router.delete(`/admin/payments/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Payments" />
            <main className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold">Payments</h1>
                </div>

                <div className="overflow-x-auto rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Client</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Reservation</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Method</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Processed</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {payments.data.map((p) => {
                                const statusColor = getStatusColor(p.status);
                                return (
                                    <tr key={p.id}>
                                        <td className="px-4 py-3">{p.payment_number}</td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium">{p.user?.name || '—'}</div>
                                            <div className="text-xs text-gray-500">{p.user?.email}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {p.reservation ? (
                                                <Link
                                                    href={`/admin/reservations/${p.reservation.id}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {p.reservation.reservation_number}
                                                </Link>
                                            ) : (
                                                <span>—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-green-800">{fmtMoney(p.amount)}</td>
                                        <td className="px-4 py-3">{p.payment_method}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium"
                                                style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                                            >
                                                <span className="size-2 rounded-full" style={{ backgroundColor: statusColor.dot }} />
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {p.processed_at ? new Date(p.processed_at).toLocaleString() : '—'}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => handleDelete(p.id, p.payment_number)}
                                                className="inline-flex items-center rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {payments.data.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-6 text-center text-gray-500">No payments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {payments.links?.length > 0 && (
                    <nav className="flex gap-2">
                        {payments.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || ''}
                                className={`rounded px-3 py-1 text-sm ${
                                    link.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                                } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                )}
            </main>
        </AdminLayout>
    );
}