import HomeLayout from '@/layouts/HomeLayout';
import { fleet } from '@/routes';
import { Link } from '@inertiajs/react';

export default function About() {
    return (
        <HomeLayout>
            <div className="min-h-screen bg-slate-50">
                {/* Hero Section with Pattern */}
                <div className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-32">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                    <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600 opacity-20 blur-[100px]"></div>
                    <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
                    
                    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                        <span className="mb-4 inline-block rounded-full bg-blue-500/20 px-4 py-1.5 text-sm font-semibold text-blue-300 backdrop-blur-sm border border-blue-500/30">
                            Lebih dari Sekadar Penyewaan
                        </span>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl drop-shadow-lg">
                            Tentang Bintang <span className="text-blue-500">Travel</span>
                        </h1>
                        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
                            Mitra tepercaya Anda dalam layanan sewa mobil premium, memberikan solusi transportasi yang aman, nyaman, dan terpercaya.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
                    {/* Story & Owner Photo Section */}
                    <div className="mb-24">
                        <div className="grid items-center gap-16 lg:grid-cols-12">
                            <div className="lg:col-span-7 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                                    <h2 className="text-3xl font-bold text-gray-900">Cerita Perjalanan Kami</h2>
                                </div>
                                <div className="space-y-4 text-lg leading-relaxed text-gray-600">
                                    <p>
                                        Didirikan pada tahun 2010, Oleh Bapak Tri Setyo Utomo atau lebih dikenal dengan Bapak Ninang. Bintang Travel dimulai dengan misi sederhana: menyediakan layanan sewa mobil yang terpercaya, terjangkau, dan ternyaman bagi wisatawan maupun penduduk lokal.
                                    </p>
                                    <p>
                                        Kami memahami bahwa setiap perjalanan memiliki maknanya tersendiri—baik itu perjalanan bisnis penting, liburan keluarga yang ditunggu-tunggu, atau sekadar perjalanan harian. Itulah sebabnya kami membangun reputasi kami di atas pilar kepercayaan, kualitas tanpa kompromi, dan layanan pelanggan yang luar biasa.
                                    </p>
                                </div>
                            </div>

                            {/* Foto Pemilik */}
                            <div className="lg:col-span-5">
                                <div className="relative">
                                    {/* Dekoratif frame belakang */}
                                    <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border-4 border-blue-200 pointer-events-none"></div>
                                    <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/5]">
                                        <img
                                            src="/images/Pemilik.jpeg"
                                            alt="Bapak Tri Setyo Utomo — Pendiri Bintang Travel"
                                            className="h-full w-full object-cover object-center"
                                        />
                                        {/* Caption overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent px-6 py-5">
                                            <p className="font-bold text-white text-lg leading-tight">Bapak Tri Setyo Utomo</p>
                                            <p className="text-blue-300 text-sm font-medium">Pendiri & Pemilik Bintang Travel</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Values Section */}
                    <div className="mb-24">
                        <div className="mb-14 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900">Misi & Nilai Kami</h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                Kami berkomitmen untuk memberikan pengalaman mobilitas yang luar biasa sambil mempertahankan standar keamanan, kenyamanan, dan integritas tertinggi.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="group rounded-3xl bg-white p-8 text-center shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-200">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Keandalan Tinggi</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Setiap kendaraan di armada kami dirawat, dibersihkan, dan diperiksa secara berkala untuk memastikan keselamatan di setiap kilometer perjalanan Anda.
                                </p>
                            </div>

                            <div className="group rounded-3xl bg-white p-8 text-center shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-200">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Transparansi Penuh</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Tidak ada biaya tersembunyi, tidak ada kejutan. Kami percaya pada harga yang transparan dan komunikasi yang jujur di awal dengan semua pelanggan kami.
                                </p>
                            </div>

                            <div className="group rounded-3xl bg-white p-8 text-center shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-200">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Pelayanan Eksekutif</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Kami terus berupaya melampaui ekspektasi melalui layanan responsif, kendaraan berkualitas premium, dan solusi inovatif untuk perjalanan Anda.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mb-24">
                        <div className="mb-14 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900">Driver Kami</h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                Temui para profesional berpengalaman di balik pengemudi Bintang Travel yang memastikan layanan luar biasa bagi setiap pelanggan.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                { name: 'Yitno', role: 'Driver', img: '/images/team/Yitno.png', desc: 'Berpengalaman lebih dari 15 tahun di bidang pengemudi dengan dedikasi tinggi.' },
                                { name: 'Siswanto', role: 'Driver', img: '/images/team/Siswanto.png', desc: 'Pakar manajemen armada dan logistik dengan 12 tahun pengalaman.' },
                                { name: 'Rosyid', role: 'Driver', img: '/images/team/Rosyid.png', desc: 'Berdedikasi memastikan pelanggan memiliki pengalaman sewa yang luar biasa.' }
                            ].map((member, idx) => (
                                <div key={idx} className="group text-center">
                                    <div className="relative mx-auto mb-6 h-40 w-40">
                                        <div className="absolute inset-0 rounded-full border-4 border-blue-100 transition-colors group-hover:border-blue-500"></div>
                                        <img
                                            className="h-full w-full rounded-full object-cover p-1 transition-transform duration-300 group-hover:scale-105"
                                            src={member.img}
                                            alt={`Foto ${member.name}`}
                                        />
                                    </div>
                                    <h4 className="mb-1 text-xl font-bold text-gray-900">{member.name}</h4>
                                    <p className="mb-3 font-semibold text-blue-600">{member.role}</p>
                                    <p className="text-sm text-gray-500 leading-relaxed px-4">{member.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-8 py-16 text-center text-white md:px-12 md:py-20 shadow-2xl">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                        <div className="relative z-10">
                            <h2 className="mb-6 text-3xl font-extrabold md:text-4xl">
                                Siap untuk Memulai Perjalanan Anda?
                            </h2>
                            <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100">
                                Rasakan langsung perbedaan layanan Bintang Travel hari ini. Jelajahi armada eksklusif kami dan pesan kendaraan sempurna Anda hanya dalam beberapa klik.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Link
                                    href={fleet().url}
                                    className="rounded-xl bg-white px-8 py-4 font-bold text-blue-600 transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1"
                                >
                                    Eksplorasi Armada
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}