import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface Message {
    id: number;
    message: string;
    is_admin: boolean;
    created_at: string;
}

type TicketStatusType = 'open' | 'in_progress' | 'closed';

interface Ticket {
    id: number;
    subject: string;
    status: TicketStatusType;
    created_at: string;
    guest_name?: string;
    guest_email?: string;
    message?: string;
    messages: Message[];
    user?: { name: string };
}

interface Props {
    ticket: Ticket;
    isGuest?: boolean;
}

const statusColors: Record<TicketStatusType, string> = {
    open: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-gray-100 text-gray-800',
};

const statusLabels: Record<TicketStatusType, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed',
};

export default function ShowTicket({ ticket, isGuest }: Props) {
    const form = useForm({ message: '' });
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [btnProcessing, setBtnProcessing] = useState(false);

    if (!ticket) return null;

    const canSend = form.data.message.trim().length > 0 && !form.processing;

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    };

    useEffect(() => {
        if (ticket?.messages) scrollToBottom();
    }, [ticket?.messages?.length]);

    const submitReply = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (isGuest || !canSend) return;

        form.post(`/admin/support/tickets/${ticket.id}/reply`, {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('message');
                scrollToBottom();
            },
            onError: (errors) => console.error('Failed to send message:', errors),
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.key === 'Enter') submitReply();
    };

    const closeTicket = () => {
        setBtnProcessing(true);
        router.post(`/admin/support/tickets/${ticket.id}/close`, {}, {
            onFinish: () => setBtnProcessing(false),
        });
    };

    const formatDate = (dateString: string): string =>
        new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    return (
        <AdminLayout>
            <Head title={`Ticket #${ticket.id}`} />
            <div className="p-6 bg-slate-50 min-h-screen">
                {/* Ticket Header */}
                <div className="mb-6 w-full rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{ticket.subject}</h1>
                            <div className="mt-2 flex items-center">
                                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusColors[ticket.status] ?? 'bg-gray-100 text-gray-800'}`}>
                                    {statusLabels[ticket.status] ?? ticket.status}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">
                                    #{ticket.id} • {formatDate(ticket.created_at)}
                                </span>
                            </div>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <Link href="/admin/support">
                                <Button variant="outline">Back</Button>
                            </Link>
                            {ticket.status !== 'closed' && (
                                <Button onClick={closeTicket} variant="secondary" disabled={btnProcessing}>
                                    {btnProcessing ? 'Closing...' : 'Close Ticket'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Chat Interface */}
                    <div className="h-[500px] space-y-4 overflow-y-auto p-6 rounded-2xl bg-white border border-gray-100 shadow-inner mb-6">
                        <div className="space-y-4">
                            {!ticket.messages || ticket.messages.length === 0 ? (
                                <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-500">
                                    Belum ada pesan. Mulai percakapan di bawah ini.
                                </div>
                            ) : (
                                ticket.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.is_admin ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-xl rounded-2xl px-5 py-3 shadow-sm ${
                                            message.is_admin
                                                ? 'rounded-tr-none bg-blue-600 text-white'
                                                : 'rounded-tl-none bg-gray-100 text-gray-800 border border-gray-200'
                                        }`}>
                                            <p className="whitespace-pre-line leading-relaxed">{message.message}</p>
                                            <p className={`mt-2 text-[10px] text-right font-medium ${
                                                message.is_admin ? 'text-blue-200' : 'text-gray-400'
                                            }`}>
                                                {formatDate(message.created_at)}
                                                <span className="ml-1">
                                                    • {message.is_admin ? 'Admin (Anda)' : ticket.user?.name ?? 'Klien'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                {/* Reply Form */}
                {ticket.status !== 'closed' && (
                    <form
                        onSubmit={submitReply}
                        className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm items-end"
                    >
                        <div className="flex-1">
                            <label htmlFor="message" className="sr-only">Balas tiket</label>
                            <textarea
                                id="message"
                                value={form.data.message}
                                onChange={(e) => form.setData('message', e.target.value)}
                                onKeyDown={handleKeyDown}
                                rows={3}
                                className={`w-full resize-none rounded-xl border-2 bg-gray-50 p-3 transition-colors focus:bg-white focus:border-blue-600 focus:ring-0 ${
                                    form.errors.message
                                        ? 'border-red-500'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                placeholder="Tulis balasan Anda... (Tekan Ctrl+Enter untuk mengirim)"
                                required
                            />
                            {form.errors.message && (
                                <p className="mt-1 text-sm font-medium text-red-600">{form.errors.message}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="flex h-[76px] w-24 cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-4 py-2 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                            disabled={!canSend}
                        >
                            {form.processing ? (
                                <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : (
                                'Kirim'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
}