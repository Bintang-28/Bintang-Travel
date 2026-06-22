import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import logobintangtravel from '@/assets/logobintangtravel.png';

interface Props {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
    const $page = usePage();
    const role = ($page.props.auth as any)?.user?.role;
    // Gunakan URL string secara langsung
    const dashboardLink = role === 'admin' ? '/admin/cars' : '/client/reservations';
    const user = ($page.props.auth as any)?.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                            <Link
                                href="/contact"
                                className={`font-bold transition-colors hover:text-blue-600 ${$page.url === '/contact' ? 'text-blue-600' : 'text-gray-600'}`}
                            >
                                Kontak
                            </Link>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-3">
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
                                                {role === 'admin' && (
                                                    <Link
                                                        href="/admin/cars"
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
                    </nav>
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
                                <li><Link href="/fleet" className="transition-colors hover:text-blue-400">Sewa Mobil Mewah</Link></li>
                                <li><Link href="/fleet" className="transition-colors hover:text-blue-400">Sewa Jangka Panjang</Link></li>
                                <li><Link href="/fleet" className="transition-colors hover:text-blue-400">Solusi Perusahaan</Link></li>
                                <li><Link href="/fleet" className="transition-colors hover:text-blue-400">Antar Jemput Bandara</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-bold tracking-wide">Bantuan</h4>
                            <ul className="space-y-3 text-sm font-medium text-gray-400">
                                <li><Link href="/contact" className="transition-colors hover:text-blue-400">Hubungi Kami</Link></li>
                                <li><Link href="/client/support" className="transition-colors hover:text-blue-400">Pusat Bantuan</Link></li>
                                <li><a href="#" className="transition-colors hover:text-blue-400">Syarat & Ketentuan</a></li>
                                <li><a href="#" className="transition-colors hover:text-blue-400">Kebijakan Privasi</a></li>
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
        </div>
    );
}