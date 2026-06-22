import CarCard from '@/components/CarCard';
import HomeLayout from '@/layouts/HomeLayout';
import { Head } from '@inertiajs/react';

interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    price_per_day: string;
    description: string;
    fuel_type: string;
    image_url: string;
    color?: string;
    status?: string;
    license_plate?: string;
    image?: string;
}

interface Props {
    homeCars: Car[];
}

export default function Welcome({ homeCars }: Props) {
    return (
        <>
            <Head>
                <title>Bintang Travel</title>
                <meta
                    name="description"
                    content="Bintang Travel adalah platform penyewaan mobil premium yang menyediakan solusi transportasi terpercaya. Kami menawarkan berbagai pilihan mobil untuk disewakan, mulai dari kelas ekonomi hingga mewah, untuk kebutuhan sewa jangka pendek maupun jangka panjang."
                />
            </Head>

            <HomeLayout>
                <main>
                    {/* Hero Section */}
                    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 lg:py-24">
                        <div className="absolute inset-0 opacity-5">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.15) 1px, transparent 0)',
                                    backgroundSize: '20px 20px',
                                }}
                            ></div>
                        </div>

                        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid items-center gap-16 lg:grid-cols-2">
                                {/* Left Content */}
                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-blue-200">
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                            </svg>
                                            Pengalaman Sewa Mobil Premium
                                        </div>

                                        <h1 className="text-3xl leading-tight font-bold text-gray-900 lg:text-6xl">
                                            Wujudkan <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Perjalanan Impian</span> Anda
                                        </h1>

                                        <p className="max-w-lg text-lg leading-relaxed text-gray-600">
                                            Rasakan kemewahan dan keandalan dengan armada premium kami. Dari pertemuan bisnis hingga petualangan akhir pekan, kami menyediakan kendaraan sempurna untuk setiap perjalanan Anda.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <a
                                            href="/fleet"
                                            className="group cursor-pointer inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-md px-5 py-2 font-semibold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-2xl"
                                        >
                                            <svg className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                            </svg>
                                            Lihat Armada
                                        </a>
                                        <a
                                            href="/about"
                                            className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-gray-300 bg-white text-md px-5 py-2 font-semibold text-gray-700 transition-all duration-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg"
                                        >
                                            Selengkapnya
                                        </a>
                                    </div>
                                </div>

                                {/* Right Image */}
                                <div className="flex justify-center lg:justify-end">
                                    <div className="relative">
                                        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 blur-2xl"></div>
                                        <img
                                            src="/images/hero_image.png"
                                            alt="Premium Car Garage"
                                            className="relative h-auto max-w-full rounded-2xl drop-shadow-2xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Featured Cars Section */}
                    <section id="fleet" className="bg-white py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-20 text-center">
                                <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-blue-200">
                                    Koleksi Premium Kami
                                </div>
                                <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                                    Temukan <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Armada Elit</span> Kami
                                </h2>
                                <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                                    Setiap kendaraan dalam koleksi kami dirawat dengan cermat dan dilengkapi fitur premium untuk memastikan perjalanan Anda luar biasa.
                                </p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {homeCars.map((car) => (
                                    <CarCard key={car.id} car={car} />
                                ))}
                            </div>

                            <div className="mt-16 text-center">
                                <a
                                    href="/fleet"
                                    className="inline-flex cursor-pointer items-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-2xl"
                                >
                                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                    </svg>
                                    Lihat Semua Armada
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section id="services" className="bg-gray-50 py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-20 text-center">
                                <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                                    Mengapa Memilih <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Bintang Travel</span>?
                                </h2>
                                <p className="mx-auto max-w-2xl text-xl text-gray-600">
                                    Kami berkomitmen untuk memberikan pengalaman sewa mobil yang tak tertandingi dengan layanan prima di setiap aspek.
                                </p>
                            </div>

                            <div className="grid gap-12 md:grid-cols-3">
                                <div className="group text-center">
                                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl transition-transform duration-200 group-hover:scale-110">
                                        <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900">Kualitas Premium</h3>
                                    <p className="leading-relaxed text-gray-600">
                                        Setiap kendaraan melalui proses pemeriksaan dan perawatan menyeluruh untuk menjamin keamanan dan kenyamanan Anda.
                                    </p>
                                </div>

                                <div className="group text-center">
                                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl transition-transform duration-200 group-hover:scale-110">
                                        <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900">Dukungan 24/7</h3>
                                    <p className="leading-relaxed text-gray-600">
                                        Tim dukungan pelanggan kami siap sedia sepanjang waktu untuk membantu Anda dengan segala pertanyaan atau kendala selama masa sewa.
                                    </p>
                                </div>

                                <div className="group text-center">
                                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl transition-transform duration-200 group-hover:scale-110">
                                        <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                        </svg>
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900">Nilai Terbaik</h3>
                                    <p className="leading-relaxed text-gray-600">
                                        Harga transparan tanpa biaya tersembunyi. Dapatkan layanan sewa mobil premium dengan nilai kompetitif yang sepadan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Google Maps Section */}
                    <section className="bg-white py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-12 text-center">
                                <div className="mb-4 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-blue-200">
                                    Lokasi Kami
                                </div>
                                <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
                                    Temukan <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Kami di Sini</span>
                                </h2>
                                <p className="mx-auto max-w-2xl text-xl text-gray-600">
                                    Kunjungi kantor kami dan kami siap melayani Anda secara langsung.
                                </p>
                            </div>

                            <div className="grid gap-8 lg:grid-cols-3">
                                {/* Info Kontak */}
                                <div className="space-y-6">
                                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="font-bold text-gray-900">Alamat</h3>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">
                                            Jl. Ponorogo - Trenggalek<br />
                                            Kabupaten Ponorogo, Jawa Timur<br />
                                            Indonesia 63474
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="font-bold text-gray-900">Jam Operasional</h3>
                                        </div>
                                        <div className="space-y-1 text-gray-600 text-sm">
                                            <div className="flex justify-between">
                                                <span>Senin – Jumat</span>
                                                <span className="font-semibold">08.00 – 17.00</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Sabtu</span>
                                                <span className="font-semibold">08.00 – 15.00</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Minggu</span>
                                                <span className="font-semibold text-red-500">Tutup</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <h3 className="font-bold text-gray-900">Kontak</h3>
                                        </div>
                                        <div className="space-y-1 text-gray-600 text-sm">
                                            <p>📞 0856-4880-9656</p>
                                            <p>✉️ Bintangrehan2106@gmail.com</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Google Maps Embed */}
                                <div className="lg:col-span-2">
                                    <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-100 h-full min-h-96">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32.12!2d111.5199706!3d-7.9625548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e790b39ea9ff8c9%3A0xa8735ca3d7956bda!2sBengkel%20Bintang%20Motor!5e1!3m2!1sid!2sid!4v1234567890"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0, minHeight: '400px' }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Lokasi Bintang Travel"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </HomeLayout>
        </>
    );
}