import HomeLayout from '@/layouts/HomeLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useRef, FormEvent } from 'react';
import { ChevronLeft, Send, MessageSquare } from 'lucide-react';

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
    messages: Message[];
    user?: {
        name: string;
    };
}

interface Props {
    ticket: Ticket;
}

const statusColors: Record<TicketStatusType, string> = {
    open: 'bg-blue-100 text-blue-700 border-blue-200',
    in_progress: 'bg-amber-100 text-amber-700 border-amber-200',
    closed: 'bg-gray-100 text-gray-700 border-gray-200',
};

const statusLabels: Record<TicketStatusType, string> = {
    open: 'Dibuka',
    in_progress: 'Sedang Diproses',
    closed: 'Selesai',
};

export default function TicketShow({ ticket }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [ticket.messages?.length]);

    const canSend = data.message.trim().length > 0 && !processing;

    const submitReply = (e?: FormEvent) => {
        if (e) e.preventDefault();
        if (!canSend) return;

        post(`/client/support/${ticket.id}/reply`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('message');
                scrollToBottom();
            },
            onError: (err) => console.error('Gagal mengirim pesan:', err),
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            submitReply();
        }
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    if (!ticket) return null;

    return (
        <HomeLayout>
            <Head title={`Tiket Bantuan #${ticket.id}`} />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl flex flex-col h-[calc(100vh-12rem)]">

                        {/* Header Tiket */}
                        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex-shrink-0">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Link
                                            href="/client/support"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 border border-gray-200 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Link>
                                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight line-clamp-1">
                                            {ticket.subject}
                                        </h1>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 ml-11">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border ${statusColors[ticket.status] || 'bg-gray-100 text-gray-800'}`}>
                                            {statusLabels[ticket.status] || ticket.status}
                                        </span>
                                        <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs">#{ticket.id}</span>
                                            • {formatDate(ticket.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Area Chat */}
                        <div className="flex-1 overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-sm p-6 mb-6">
                            <div className="space-y-6">
                                {!ticket.messages || ticket.messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 opacity-70 min-h-[200px]">
                                        <MessageSquare className="h-12 w-12 mb-3 text-gray-300" />
                                        <p className="text-sm font-medium">Belum ada pesan. Mulailah percakapan di bawah ini.</p>
                                    </div>
                                ) : (
                                    ticket.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.is_admin ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm ${
                                                    message.is_admin
                                                        ? 'rounded-tl-sm bg-gray-100 text-gray-800 border border-gray-200'
                                                        : 'rounded-tr-sm bg-blue-600 text-white'
                                                }`}
                                            >
                                                <p className="whitespace-pre-line text-sm leading-relaxed">
                                                    {message.message}
                                                </p>
                                                <div className={`mt-2 flex items-center gap-1.5 text-[10px] font-medium ${message.is_admin ? 'text-gray-500 justify-start' : 'text-blue-200 justify-end'}`}>
                                                    <span>{formatDate(message.created_at)}</span>
                                                    <span>•</span>
                                                    <span className="font-bold">{message.is_admin ? 'Tim Support' : 'Anda'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} className="h-1" />
                            </div>
                        </div>

                        {/* Form Balasan */}
                        {ticket.status !== 'closed' ? (
                            <div className="flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                                <form onSubmit={submitReply} className="flex items-end gap-3">
                                    <div className="flex-1 relative">
                                        <label htmlFor="message" className="sr-only">Balas pesan</label>
                                        <textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            rows={2}
                                            className={`w-full resize-none rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm transition-colors focus:bg-white focus:outline-none focus:ring-0 ${
                                                errors.message ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'
                                            }`}
                                            placeholder="Ketik balasan Anda di sini... (Tekan Ctrl+Enter untuk mengirim)"
                                            required
                                        />
                                        {errors.message && (
                                            <p className="absolute -top-6 right-0 text-xs font-bold text-red-600 bg-white px-2 rounded-md border border-red-100">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!canSend}
                                        className="flex h-[4.5rem] w-[4.5rem] shrink-0 cursor-pointer items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                                        title="Kirim Pesan"
                                    >
                                        {processing ? (
                                            <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                                        ) : (
                                            <Send className="h-5 w-5 ml-1" />
                                        )}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="flex-shrink-0 bg-gray-50 rounded-2xl border border-gray-200 p-4 text-center">
                                <p className="text-sm font-bold text-gray-500">Tiket ini sudah ditutup. Anda tidak dapat mengirim pesan baru.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}