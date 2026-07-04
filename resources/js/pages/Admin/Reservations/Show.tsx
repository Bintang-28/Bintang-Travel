import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { index, edit, print } from '@/routes/admin/reservations';

interface Props {
    reservation: any;
    statusMeta: Array<{ value: string; label: string; color: string }>;
    paymentStatusMeta: Array<{ value: string; label: string }>;
    currency: { symbol: string; code: string };
}

export default function ShowReservation({ reservation, statusMeta, currency }: Props) {
    const statusMap = useMemo(() => {
        const map: Record<string, { label: string; color: string }> = {};
        for (const s of statusMeta || []) map[s.value] = { label: s.label, color: s.color };
        return map;
    }, [statusMeta]);

    const getStatusStyle = (status: string) => {
        const meta = statusMap[status];
        if (!meta) return { bg: 'rgba(107,114,128,0.1)', text: '#6B7280', dot: '#6B7280', label: status };
        const hex = meta.color.replace('#', '');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return { bg: `rgba(${r}, ${g}, ${b}, 0.1)`, text: meta.color, dot: meta.color, label: meta.label };
    };

    const fmtDate = (d?: string) => d ? new Date(d).toLocaleDateString() : '—';
    const fmtMoney = (n?: number | string) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: currency.code || 'IDR', minimumFractionDigits: 0 }).format(Number(n ?? 0));

    return (
        <AdminLayout>
            <Head title={`Reservation ${reservation?.reservation_number || ''}`} />
            <main className="flex-1 p-8 space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold">Reservasi {reservation?.reservation_number}</h1>
                    <div className="flex gap-2">
                        <Link href={index().url}><Button variant="outline">Kembali</Button></Link>
                        <Link href={edit(reservation.id).url}><Button variant="outline">Edit</Button></Link>
                        <a href={print(reservation.id).url} target="_blank" rel="noopener noreferrer"><Button variant="secondary">Cetak</Button></a>
                    </div>
                </div>

                <div className="rounded-md border p-4 flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Status</div>
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: getStatusStyle(reservation.status).bg, color: getStatusStyle(reservation.status).text }}>
                                <span className="size-2 rounded-full" style={{ backgroundColor: getStatusStyle(reservation.status).dot }} />
                                {getStatusStyle(reservation.status).label}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-muted-foreground">Total</div>
                        <div className="text-xl font-semibold">{fmtMoney(reservation.total_amount)}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-md border">
                        <div className="border-b px-4 py-3 font-medium">Klien</div>
                        <div className="p-4 space-y-1">
                            <div className="text-sm">Nama</div>
                            <div className="font-medium">{reservation.user?.name || '—'}</div>
                            <div className="text-sm mt-3">Email</div>
                            <div className="font-medium">{reservation.user?.email || '—'}</div>
                            <div className="text-sm mt-3">Telepon</div>
                            <div className="font-medium">{reservation.user?.phone || '—'}</div>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <div className="border-b px-4 py-3 font-medium">Kendaraan</div>
                        <div className="p-4 space-y-1">
                            <div className="text-sm">Mobil</div>
                            <div className="font-medium">{reservation.car ? `${reservation.car.year} ${reservation.car.make} ${reservation.car.model}` : '—'}</div>
                            <div className="text-sm mt-3">Plat Nomor</div>
                            <div className="font-medium">{reservation.car?.license_plate || '—'}</div>
                        </div>
                    </div>

                    <div className="rounded-md border md:col-span-2">
                        <div className="border-b px-4 py-3 font-medium">Detail Reservasi</div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div><div className="text-sm text-muted-foreground">Tanggal Mulai</div><div className="font-medium">{fmtDate(reservation.start_date)} {reservation.pickup_time}</div></div>
                            <div><div className="text-sm text-muted-foreground">Tanggal Selesai</div><div className="font-medium">{fmtDate(reservation.end_date)} {reservation.return_time}</div></div>
                            <div><div className="text-sm text-muted-foreground">Durasi</div><div className="font-medium">{Number(reservation.total_days)} hari</div></div>
                            <div className="md:col-span-3 mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                                <div className="text-sm font-semibold text-blue-900 mb-4">Metode Pengambilan & Pengembalian</div>
                                {reservation.delivery_type === 'self_pickup' ? (
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-base font-semibold text-gray-900">Ambil Sendiri di Kantor (-)</p>
                                            <p className="text-sm text-gray-500 mt-0.5">Klien akan datang langsung ke lokasi Bintang Travel</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-base font-semibold text-gray-900">Diantar / Dijemput ke Lokasi Klien</p>
                                            <div className="mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                                                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Alamat Pengiriman:</span>
                                                {reservation.delivery_address || 'Belum ada alamat pengiriman yang diberikan'}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {reservation.status === 'cancelled' && (
                                <div>
                                    <div className="text-sm text-muted-foreground">Dibatalkan Pada</div>
                                    <div className="font-medium">{reservation.cancelled_at ? new Date(reservation.cancelled_at).toLocaleString() : '—'}</div>
                                    <div className="text-sm text-muted-foreground mt-2">Alasan</div>
                                    <div className="font-medium">{reservation.cancellation_reason || '—'}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sopir */}
                    <div className="rounded-md border md:col-span-2">
                        <div className="border-b px-4 py-3 font-medium">Sopir</div>
                        <div className="p-4">
                            {reservation.driver ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg shrink-0">
                                        {reservation.driver.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{reservation.driver.name}</div>
                                        <div className="text-sm text-muted-foreground">{reservation.driver.phone}</div>
                                        <div className="text-sm text-muted-foreground">SIM: {reservation.driver.license_number}</div>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
                                            Dengan Sopir
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 text-gray-500">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-700">Tanpa Sopir</div>
                                        <div className="text-xs text-gray-400">Pelanggan mengemudi sendiri</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <div className="border-b px-4 py-3 font-medium">Rincian Biaya</div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between"><div className="text-sm">Tarif per Hari</div><div className="font-medium">{fmtMoney(reservation.daily_rate)}</div></div>
                            <div className="flex items-center justify-between"><div className="text-sm">Subtotal Mobil</div><div className="font-medium">{fmtMoney(reservation.subtotal)}</div></div>
                            {reservation.driver && (
                                <div className="flex items-center justify-between"><div className="text-sm">Biaya Sopir</div><div className="font-medium">{fmtMoney(Number(reservation.total_amount) - Number(reservation.subtotal) + Number(reservation.discount_amount || 0) - Number(reservation.penalty_amount || 0))}</div></div>
                            )}
                            <div className="flex items-center justify-between"><div className="text-sm">Diskon</div><div className="font-medium text-green-600">-{fmtMoney(reservation.discount_amount)}</div></div>
                            {Number(reservation.penalty_amount) > 0 && (
                                <div className="flex items-center justify-between"><div className="text-sm">Denda Keterlambatan</div><div className="font-medium text-red-600">+{fmtMoney(reservation.penalty_amount)}</div></div>
                            )}
                            <div className="border-t pt-2 flex items-center justify-between"><div className="text-sm font-semibold">Total</div><div className="text-lg font-semibold">{fmtMoney(reservation.total_amount)}</div></div>
                        </div>
                    </div>

                    <div className="rounded-md border md:col-span-2">
                        <div className="border-b px-4 py-3 font-medium">Pembayaran</div>
                        <div className="p-4 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Pembayaran</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metode</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bukti</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diproses</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reservation.payments && reservation.payments.length > 0 ? (
                                        reservation.payments.map((p: any) => (
                                            <tr key={p.id}>
                                                <td className="px-4 py-2">{p.payment_number}</td>
                                                <td className="px-4 py-2">{fmtMoney(p.amount)}</td>
                                                <td className="px-4 py-2 capitalize">{(p.payment_method || '').replace('_', ' ')}</td>
                                                <td className="px-4 py-2 capitalize">{p.status}</td>
                                                <td className="px-4 py-2">
                                                    {p.proof_url ? (
                                                        <a href={p.proof_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                                                            <img src={p.proof_url} alt={`Bukti pembayaran ${p.payment_number}`} className="h-12 w-12 rounded object-cover border hover:opacity-80 transition-opacity" />
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400">—</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2">{p.processed_at ? new Date(p.processed_at).toLocaleString() : '—'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={6} className="px-4 py-4 text-center text-gray-500">Belum ada pembayaran.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
}