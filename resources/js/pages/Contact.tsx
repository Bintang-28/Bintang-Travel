import HomeLayout from '@/layouts/HomeLayout';
import { useForm, Link } from '@inertiajs/react';
import { guestContact } from "@/routes/contact";
import { useState, useEffect } from 'react';
import { fleet, about } from '@/routes';

export default function Contact() {
    const { data, setData, post, errors, reset, processing } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [notification, setNotification] = useState({
        show: false,
        message: '',
        isError: false
    });

    // Menangani animasi notifikasi
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const sendTicket = (e: React.FormEvent) => {
        e.preventDefault();
        post(guestContact().url, {
            onSuccess: () => {
                reset();
                setNotification({ show: true, message: 'Yeay! Pesan Anda berhasil terkirim. Tim kami akan segera menghubungi Anda.', isError: false });
            },
            onError: () => {
                setNotification({ show: true, message: 'Ups! Ada yang salah. Silakan periksa kembali formulir Anda.', isError: true });
            }
        });
    };

    return (
        <HomeLayout>
            <div className="min-h-screen bg-slate-50 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-96 bg-blue-600 rounded-b-[4rem] md:rounded-b-[8rem] shadow-xl z-0 transform -skew-y-2 origin-top-left"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                {/* Toast Notification */}
                <div className={`fixed top-24 right-4 z-50 transition-all duration-500 transform ${notification.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    <div className={`flex items-center gap-3 p-4 rounded-xl text-white shadow-2xl max-w-sm ${notification.isError ? 'bg-red-500' : 'bg-green-500'}`}>
                        {notification.isError ? (
                            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ) : (
                            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        )}
                        <p className="text-sm font-medium">{notification.message}</p>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24">
                    {/* Header Section */}
                    <div className="mb-16 text-center text-white">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl drop-shadow-md">
                            Mari Berbincang
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-blue-100 font-medium">
                            Punya pertanyaan seputar layanan kami? Atau sekadar ingin menyapa? Kami selalu antusias mendengarkan dari Anda.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 items-start">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-3xl border border-gray-100 bg-white p-8 md:p-10 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-blue-500/10 hover:-translate-y-1">
                                <h2 className="mb-8 text-3xl font-bold text-gray-800 flex items-center gap-3">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    Kirim Pesan
                                </h2>

                                <form className="space-y-6" onSubmit={sendTicket}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name Field - Floating Label Style */}
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                id="name"
                                                className="peer w-full rounded-xl border-2 border-gray-200 bg-transparent px-4 pb-2.5 pt-6 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 transition-colors"
                                                placeholder=" "
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            <label htmlFor="name" className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold">
                                                Nama Lengkap
                                            </label>
                                            {errors.name && <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{errors.name}</span>}
                                        </div>

                                        {/* Email Field - Floating Label Style */}
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                id="email"
                                                className="peer w-full rounded-xl border-2 border-gray-200 bg-transparent px-4 pb-2.5 pt-6 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 transition-colors"
                                                placeholder=" "
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <label htmlFor="email" className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold">
                                                Alamat Email
                                            </label>
                                            {errors.email && <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{errors.email}</span>}
                                        </div>
                                    </div>

                                    {/* Subject Field - Floating Label Style */}
                                    <div className="relative group mt-8">
                                        <input
                                            type="text"
                                            id="subject"
                                            className="peer w-full rounded-xl border-2 border-gray-200 bg-transparent px-4 pb-2.5 pt-6 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 transition-colors"
                                            placeholder=" "
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                        />
                                        <label htmlFor="subject" className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold">
                                            Subjek (Misal: Info Rental Harian)
                                        </label>
                                        {errors.subject && <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{errors.subject}</span>}
                                    </div>

                                    {/* Message Field - Floating Label Style */}
                                    <div className="relative group mt-8">
                                        <textarea
                                            id="message"
                                            rows={5}
                                            className="peer w-full resize-none rounded-xl border-2 border-gray-200 bg-transparent px-4 pb-2.5 pt-6 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 transition-colors"
                                            placeholder=" "
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                        ></textarea>
                                        <label htmlFor="message" className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold">
                                            Ceritakan detail kebutuhan Anda...
                                        </label>
                                        {errors.message && <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{errors.message}</span>}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {processing ? (
                                                    <>
                                                        <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                        Memproses...
                                                    </>
                                                ) : (
                                                    <>
                                                        Kirim Pesan Sekarang
                                                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Contact Information Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Main Info Card */}
                            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <h3 className="mb-6 text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                                    Informasi Kontak
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="flex w-12 h-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Telepon Darurat</h4>
                                            <p className="mt-1 text-gray-600 font-medium">085648809656</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="flex w-12 h-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Email Resmi</h4>
                                            <p className="mt-1 text-gray-600 font-medium">Bintangrehan2106@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="flex w-12 h-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Kantor Pusat</h4>
                                            <p className="mt-1 text-gray-600 leading-relaxed">
                                                Jl. Ponorogo - Trenggalek<br />Ponorogo, Jawa Timur, 63474
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Business Hours Card */}
                            <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-slate-800 to-gray-900 p-8 text-white shadow-xl">
                                <h3 className="mb-4 text-xl font-bold flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Jam Operasional
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-300">
                                    <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                                        <span>Senin - Jumat</span>
                                        <span className="font-semibold text-white">08:00 - 20:00</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                                        <span>Sabtu</span>
                                        <span className="font-semibold text-white">09:00 - 18:00</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>Minggu</span>
                                        <span className="font-semibold text-blue-400">10:00 - 16:00</span>
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