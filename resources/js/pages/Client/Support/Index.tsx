import HomeLayout from '@/layouts/HomeLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ClipboardList, MessageSquare, Plus } from 'lucide-react';

interface Ticket {
    id: number;
    subject: string;
    message: string;
    status: string;
    user?: { id: number; name: string; email: string };
    guest_name?: string;
    guest_email?: string;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    tickets: {
        data: Ticket[];
        links: PaginationLink[];
    };
}

export default function SupportIndex({ tickets }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'open': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'in_progress': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status.toLowerCase()) {
            case 'open': return 'Buka';
            case 'in_progress': return 'Diproses';
            case 'closed': return 'Selesai';
            default: return status;
        }
    };

    const goToTicket = (id: number) => {
        router.visit(`/client/support/${id}`);
    };

    return (
        <HomeLayout>
            <Head title="Pusat Bantuan" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                Tiket Bantuan
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 font-medium">
                                Pantau dan kelola semua tiket bantuan atau pertanyaan Anda.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/client/reservations"
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md"
                            >
                                <ClipboardList className="h-4 w-4" />
                                Reservasi Saya
                            </Link>
                            <Link
                                href="/client/support/create"
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
                            >
                                <Plus className="h-4 w-4" />
                                Buat Tiket Baru
                            </Link>
                        </div>
                    </div>

                    {/* Tickets Table */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                                            No. Tiket
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                                            Subjek & Pesan
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                                            Dibuat Pada
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 bg-white">
                                    {tickets.data.length > 0 ? (
                                        tickets.data.map((ticket) => (
                                            <tr
                                                key={ticket.id}
                                                onClick={() => goToTicket(ticket.id)}
                                                className="group cursor-pointer transition-colors hover:bg-blue-50/50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-bold text-blue-600 group-hover:text-blue-700">
                                                        #{ticket.id}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900 mb-0.5">
                                                        {ticket.subject}
                                                    </div>
                                                    <div className="line-clamp-1 text-sm font-medium text-gray-500 max-w-md">
                                                        {ticket.message}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border ${getStatusColor(ticket.status)}`}>
                                                        {getStatusLabel(ticket.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-600">
                                                        {formatDate(ticket.created_at)}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4 text-gray-400">
                                                        <MessageSquare className="h-8 w-8" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Belum Ada Tiket</h3>
                                                    <p className="text-gray-500 text-sm">Anda belum pernah membuat tiket bantuan.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {tickets.links && tickets.links.length > 3 && (
                        <nav className="flex justify-center gap-2 mt-8">
                            <div className="flex flex-wrap gap-1">
                                {tickets.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
                                            link.active
                                                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                                        } ${!link.url ? 'pointer-events-none opacity-50 bg-gray-50' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </nav>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}