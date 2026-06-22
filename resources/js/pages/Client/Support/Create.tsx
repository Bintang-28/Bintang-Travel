import HomeLayout from '@/layouts/HomeLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Info, ChevronLeft, Send } from 'lucide-react';

export default function CreateTicket() {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        message: '',
    });

    const canSubmit = data.subject.trim().length > 0 && data.message.trim().length > 0 && !processing;

    const submitTicket = (e: FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        post('/client/support', {
            onError: (err) => console.error('Gagal membuat tiket:', err),
        });
    };

    return (
        <HomeLayout>
            <Head title="Buat Tiket Bantuan" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">

                        {/* Page Header */}
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                    Buat Tiket Bantuan Baru
                                </h1>
                                <p className="mt-1 text-sm text-gray-500 font-medium">
                                    Butuh bantuan? Kirimkan tiket keluhan Anda dan tim kami akan segera membalasnya.
                                </p>
                            </div>
                            <Link
                                href="/client/support"
                                className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Kembali ke Daftar
                            </Link>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3 items-start">
                            {/* Ticket Form */}
                            <div className="md:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
                                <form onSubmit={submitTicket} className="space-y-6">
                                    {/* Subject Field */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-1.5">
                                            Subjek / Judul Masalah <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="subject"
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className={`block w-full rounded-xl border-2 px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-0 ${
                                                errors.subject
                                                ? 'border-red-300 bg-red-50 focus:border-red-500'
                                                : 'border-gray-100 bg-gray-50 focus:border-blue-500 focus:bg-white'
                                            }`}
                                            placeholder="Contoh: Kendala proses pembayaran..."
                                            required
                                            maxLength={255}
                                        />
                                        {errors.subject && (
                                            <p className="mt-1.5 text-sm font-medium text-red-600">{errors.subject}</p>
                                        )}
                                        <p className="mt-1.5 text-right text-xs font-medium text-gray-400">
                                            {data.subject.length}/255 karakter
                                        </p>
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1.5">
                                            Detail Pesan <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            rows={8}
                                            className={`block w-full resize-y rounded-xl border-2 px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-0 ${
                                                errors.message
                                                ? 'border-red-300 bg-red-50 focus:border-red-500'
                                                : 'border-gray-100 bg-gray-50 focus:border-blue-500 focus:bg-white'
                                            }`}
                                            placeholder="Jelaskan secara detail masalah atau pertanyaan Anda di sini..."
                                            required
                                        ></textarea>
                                        {errors.message && (
                                            <p className="mt-1.5 text-sm font-medium text-red-600">{errors.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                        <Link
                                            href="/client/support"
                                            className="rounded-xl px-5 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100"
                                        >
                                            Batal
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={!canSubmit}
                                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                                        >
                                            {processing ? (
                                                <>
                                                    <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                                                    Mengirim...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4" />
                                                    Kirim Tiket
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Sidebar: Help Text */}
                            <div className="md:col-span-1 rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-6 shadow-sm">
                                <div className="flex items-center gap-2 border-b border-blue-100 pb-3 mb-4">
                                    <Info className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-bold text-gray-900">
                                        Tips Menulis Tiket
                                    </h3>
                                </div>

                                <ul className="space-y-4 text-sm font-medium text-gray-600">
                                    <li className="flex items-start gap-2.5">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-black text-blue-700">1</span>
                                        <span>Gunakan subjek yang singkat, jelas, dan mewakili masalah Anda.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-black text-blue-700">2</span>
                                        <span>Sertakan detail yang relevan seperti Nomor Reservasi jika berkaitan dengan pesanan.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-black text-blue-700">3</span>
                                        <span>Jelaskan kronologi kejadian secara berurutan agar tim kami mudah memahaminya.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-black text-blue-700">4</span>
                                        <span>Tim support kami umumnya merespon dalam waktu maksimal 24 jam kerja.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}