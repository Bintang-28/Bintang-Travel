import { Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import logobintangtravel from '@/assets/logobintangtravel.png';
import axios from 'axios';
import { MessageCircle, X, Send, MessageSquare, Paperclip, Image as ImageIcon } from 'lucide-react';

interface Props {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
    const $page = usePage();
    const role = ($page.props.auth as any)?.user?.role;
    // Gunakan URL string secara langsung
    const dashboardLink = role !== 'client' ? '/admin' : '/client/reservations';
    const user = ($page.props.auth as any)?.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Support Chat Widget State
    const [chatOpen, setChatOpen] = useState(false);
    const [activeTicket, setActiveTicket] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToChatBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Load active ticket if logged in
    const fetchActiveChat = async () => {
        if (!user) return;
        try {
            const response = await axios.get('/client/support-chat/active');
            if (response.data && response.data.id) {
                setActiveTicket(response.data);
                setMessages(response.data.messages || []);
            } else {
                setActiveTicket(null);
                setMessages([]);
            }
        } catch (error) {
            console.error('Error fetching active chat:', error);
        }
    };

    // Fetch active chat on mount and periodically if open
    useEffect(() => {
        if (user) {
            fetchActiveChat();
        }
    }, [user]);

    // Auto-open support chat if open_chat=true is present in the URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('open_chat') === 'true') {
            setChatOpen(true);
            const url = new URL(window.location.href);
            url.searchParams.delete('open_chat');
            window.history.replaceState({}, '', url.pathname + url.search);
        }
    }, []);

    useEffect(() => {
        let interval: any;
        if (chatOpen && user) {
            scrollToChatBottom();
            interval = setInterval(() => {
                fetchActiveChat();
            }, 4000); // Poll every 4 seconds
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [chatOpen, user]);

    useEffect(() => {
        if (chatOpen) {
            scrollToChatBottom();
        }
    }, [messages.length]);

    const handleSendChat = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((!newMessage.trim() && !attachment) || isSending) return;

        setIsSending(true);
        const msgText = newMessage;
        const attachedFile = attachment;
        
        setNewMessage('');
        setAttachment(null);

        const formData = new FormData();
        if (msgText) formData.append('message', msgText);
        if (attachedFile) formData.append('attachment', attachedFile);

        try {
            if (activeTicket && activeTicket.id) {
                // Reply to existing ticket
                const response = await axios.post(`/client/support-chat/${activeTicket.id}/reply`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (response.data) {
                    setMessages((prev) => [...prev, response.data]);
                }
            } else {
                // Create new ticket
                setLoadingChat(true);
                const response = await axios.post('/client/support-chat/create', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (response.data && response.data.id) {
                    setActiveTicket(response.data);
                    setMessages(response.data.messages || []);
                } else {
                    setActiveTicket(null);
                    setMessages([]);
                }
                setLoadingChat(false);
            }
            scrollToChatBottom();
        } catch (error) {
            console.error('Error sending message:', error);
            setNewMessage(msgText); // Restore message
            if (attachedFile) setAttachment(attachedFile);
        } finally {
            setIsSending(false);
        }
    };

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    const handleLogout = () => {
        // Gunakan URL string secara langsung
        router.post('/logout');
    };

    return (
        <div>
            <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3">
                            <img
                                src={logobintangtravel}
                                alt="Logo Bintang Travel"
                                className="h-12 w-12 object-contain"
                            />
                            <p className="font-extrabold text-xl text-gray-900 tracking-tight hidden sm:block">
                                Bintang<span className="text-blue-600">Travel</span>
                            </p>
                        </Link>

                        {/* Navigation */}
                        <div className="hidden items-center space-x-8 md:flex">
                            <Link
                                href="/"
                                className={`font-bold transition-colors hover:text-blue-600 ${$page.url === '/' ? 'text-blue-600' : 'text-gray-600'}`}
                            >
                                Halaman Utama
                            </Link>
                            <Link
                                href="/fleet"
                                className={`font-bold transition-colors hover:text-blue-600 ${$page.url.startsWith('/fleet') ? 'text-blue-600' : 'text-gray-600'}`}
                            >
                                Armada
                            </Link>
                            <Link
                                href="/about"
                                className={`font-bold transition-colors hover:text-blue-600 ${$page.url === '/about' ? 'text-blue-600' : 'text-gray-600'}`}
                            >
                                Tentang Kami
                            </Link>
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-3">
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white pl-2 pr-4 py-1.5 text-sm font-bold text-gray-700 transition-all duration-200 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
                                    >
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-700 font-bold text-xs">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden md:block">{user.name?.split(' ')[0]}</span>
                                        <svg className={`h-4 w-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl z-50">
                                            <div className="p-3 border-b border-gray-100 mb-1">
                                                <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                                <p className="text-xs font-medium text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <div className="space-y-1">            
                                                {role !== 'client' && (
                                                    <Link
                                                        href="/admin"
                                                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-50/50 hover:bg-blue-100 transition-colors"
                                                        onClick={() => setDropdownOpen(false)}
                                                    >
                                                        <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                                        </svg>
                                                        Halaman Admin
                                                    </Link>
                                                )}

                                                <Link
                                                    href="/client/reservations"
                                                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                    Pesanan Saya
                                                </Link>
                                                <Link
                                                    href="/settings/profile"
                                                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Profile
                                                </Link>
                                                
                                                <div className="h-px bg-gray-100 my-2"></div>
                                                
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Keluar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center px-4 sm:px-6 py-2.5 text-sm font-bold text-gray-700 transition-colors duration-200 hover:text-blue-600"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="inline-flex items-center rounded-xl bg-blue-600 px-4 sm:px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>

                    </nav>
                    {/* Mobile Menu */}
                        {mobileMenuOpen && (
                            <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl font-bold text-sm transition-colors ${$page.url === '/' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}>Halaman Utama</Link>
                                <Link href="/fleet" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl font-bold text-sm transition-colors ${$page.url.startsWith('/fleet') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}>Armada</Link>
                                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl font-bold text-sm transition-colors ${$page.url === '/about' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}>Tentang Kami</Link>

                                {user ? (
                                    <div className="pt-3 border-t border-gray-100 space-y-1">
                                        <div className="px-4 py-2">
                                            <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        {role !== 'client' && (
                                            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors">Halaman Admin</Link>
                                        )}
                                        <Link href="/client/reservations" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Pesanan Saya</Link>
                                        <Link href="/settings/profile" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Profile</Link>
                                        <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">Keluar</button>
                                    </div>
                                ) : (
                                    <div className="pt-3 border-t border-gray-100">
                                        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">Masuk</Link>
                                        <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors mt-2">Daftar Sekarang</Link>
                                    </div>
                                )}
                            </div>
                        )}
                </div>
            </header>

            {children}

            {/* Footer */}
            <footer className="bg-gray-900 py-16 text-white border-t-4 border-blue-600">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 md:grid-cols-4">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={logobintangtravel}
                                    alt="Logo Bintang Travel"
                                    className="h-14 w-14 object-contain"
                                />
                                <div>
                                    <h3 className="text-xl font-extrabold tracking-tight">Bintang<span className="text-blue-400">Travel</span></h3>
                                    <p className="text-[10px] font-bold tracking-widest text-gray-400">PREMIUM CAR RENTAL</p>
                                </div>
                            </div>
                            <p className="leading-relaxed text-gray-400 text-sm font-medium">
                                Layanan sewa mobil yang menyediakan kendaraan aman dan nyaman untuk semua kebutuhan transportasi Anda dengan layanan pelanggan yang luar biasa.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-bold tracking-wide">Layanan</h4>
                            <ul className="space-y-3 text-sm font-medium text-gray-400">
                                <li>Sewa Mobil Mewah</li>
                                <li>Sewa Jangka Panjang</li>
                                <li>Solusi Perusahaan</li>
                                <li>Antar Jemput Bandara</li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-bold tracking-wide">Bantuan</h4>
                            <ul className="space-y-3 text-sm font-medium text-gray-400">
                                <li>Pusat Bantuan</li>
                                <li>Syarat & Ketentuan</li>
                                <li>Kebijakan Privasi</li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-bold tracking-wide">Info Kontak</h4>
                            <div className="space-y-4 text-sm font-medium text-gray-400">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800">
                                        <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span>085648809656</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800">
                                        <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span>Bintangrehan2106@gmail.com</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800">
                                        <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span>Jl. Ponorogo - Trenggalek</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-gray-800 pt-8">
                        <p className="text-gray-500 text-sm font-medium text-center">
                            &copy; 2026 Bintang Travel. Hak Cipta Dilindungi.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating Chat Widget */}
            {/* Floating Chat Widget */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
                {/* Chat Panel */}
                <div className={`mb-4 w-96 max-w-[calc(100vw-2rem)] h-[480px] rounded-3xl bg-white border border-gray-100 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto ${
                    chatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between text-white shadow-md flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white border border-white/10">
                                    CS
                                </div>
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                            </div>
                            <div className="text-left">
                                <h4 className="font-extrabold text-sm tracking-wide">Customer Service</h4>
                                <p className="text-[10px] font-semibold text-blue-100">Bintang Travel • Online</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setChatOpen(false)}
                            className="rounded-full p-1.5 hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4">
                        {!user ? (
                            /* Unauthenticated State */
                            <div className="my-auto flex flex-col items-center justify-center text-center p-6 space-y-4">
                                <div className="h-16 w-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-md">
                                    <MessageSquare className="h-9 w-9" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-900 text-lg">Hubungi Customer Service</h5>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                        Silakan masuk ke akun Anda terlebih dahulu untuk memulai percakapan dengan admin.
                                    </p>
                                </div>
                                <Link 
                                    href="/login" 
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all cursor-pointer pointer-events-auto"
                                >
                                    Masuk Sekarang
                                </Link>
                            </div>
                        ) : !activeTicket && !loadingChat ? (
                            /* Logged In, No Active Chat */
                            <div className="my-auto flex flex-col items-center justify-center text-center p-6 space-y-4">
                                <div className="h-16 w-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-md">
                                    <MessageCircle className="h-9 w-9" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-900 text-lg">Ada yang Bisa Kami Bantu?</h5>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                        Halo <strong>{user.name?.split(' ')[0]}</strong>! Tulis pesan pertama Anda di bawah ini untuk bertanya langsung kepada admin Bintang Travel.
                                    </p>
                                </div>
                            </div>
                        ) : loadingChat ? (
                            /* Loading Chat Creation */
                            <div className="my-auto flex flex-col items-center justify-center text-center p-6">
                                <svg className="h-8 w-8 animate-spin text-blue-600 mb-2" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <p className="text-sm font-semibold text-gray-600">Menghubungkan obrolan...</p>
                            </div>
                        ) : (
                            /* Chat Active with Messages */
                            <>
                                <div className="text-center flex-shrink-0">
                                    <span className="inline-block px-3 py-1 rounded-full bg-slate-200/50 text-[10px] font-bold text-gray-500 border border-slate-200">
                                        Percakapan Aktif #{activeTicket.id}
                                    </span>
                                </div>
                                {messages.map((message) => (
                                    <div 
                                        key={message.id} 
                                        className={`flex ${message.is_admin ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm text-sm leading-relaxed text-left ${
                                            message.is_admin 
                                                ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-none' 
                                                : 'bg-blue-600 text-white rounded-tr-none'
                                        }`}>
                                            {message.attachment_path && (
                                                <a href={`/storage/${message.attachment_path}`} target="_blank" rel="noopener noreferrer">
                                                    <img 
                                                        src={`/storage/${message.attachment_path}`} 
                                                        alt="Attachment" 
                                                        className="mb-2 max-w-full rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity" 
                                                    />
                                                </a>
                                            )}
                                            {message.message && <p className="whitespace-pre-line">{message.message}</p>}
                                            <span className={`block text-[9px] mt-1 text-right ${
                                                message.is_admin ? 'text-gray-400' : 'text-blue-200'
                                            }`}>
                                                {new Date(message.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Chat Footer Input */}
                    {user && (
                        <div className="flex flex-col bg-white border-t border-gray-100 flex-shrink-0 pointer-events-auto">
                            {attachment && (
                                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between bg-blue-50/50">
                                    <div className="flex items-center text-sm text-blue-600 font-medium truncate">
                                        <ImageIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">{attachment.name}</span>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => setAttachment(null)}
                                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-white transition-colors cursor-pointer"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                            <form onSubmit={handleSendChat} className="p-4 flex items-center gap-2">
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                                    className="hidden" 
                                    accept="image/*"
                                />
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors cursor-pointer"
                                >
                                    <Paperclip className="h-5 w-5" />
                                </button>
                                <input 
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={activeTicket ? "Ketik pesan..." : "Tulis pertanyaan pertama..."}
                                    disabled={isSending}
                                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-0"
                                />
                                <button 
                                    type="submit"
                                    disabled={(!newMessage.trim() && !attachment) || isSending}
                                    className="h-10 w-10 flex-shrink-0 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Send className="h-4.5 w-4.5" />
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-blue-600/40 focus:outline-none pointer-events-auto cursor-pointer"
                >
                    {chatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                </button>
            </div>
        </div>
    );
}