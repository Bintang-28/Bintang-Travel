import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { index, update } from '@/routes/admin/reservations';
import { useEffect } from 'react';

interface Driver {
    id: number;
    name: string;
    phone: string;
    license_number: string;
}

interface Props {
    reservation: any;
    drivers: Driver[];
    enums: {
        statuses: Array<{ value: string; label: string; color: string }>;
    };
}

export default function EditReservation({ reservation, enums, drivers = [] }: Props) {
    const statuses = enums.statuses || [];

    const formatDateForInput = (dateString: string | null | undefined): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const form = useForm({
        start_date: formatDateForInput(reservation?.start_date) || '',
        end_date: formatDateForInput(reservation?.end_date) || '',
        pickup_time: reservation?.pickup_time || '09:00',
        return_time: reservation?.return_time || '18:00',
        delivery_type: reservation?.delivery_type || 'self_pickup',
        delivery_address: reservation?.delivery_address || '',
        discount_amount: reservation?.discount_amount || 0,
        penalty_amount: reservation?.penalty_amount || 0,
        notes: reservation?.notes || '',
        status: reservation?.status || 'pending',
        cancellation_reason: reservation?.cancellation_reason || '',
        driver_id: reservation?.driver_id ? String(reservation.driver_id) : '',
    });

    const calculateSuggestedPenalty = () => {
        if (!reservation?.car?.penalty_per_hour) return 0;
        if (!reservation?.end_date || !reservation?.return_time) return 0;
        if (!form.data.end_date || !form.data.return_time) return 0;

        const originalReturnDateTime = new Date(`${reservation.end_date.split('T')[0]}T${reservation.return_time}`);
        const newReturnDateTime = new Date(`${form.data.end_date}T${form.data.return_time}`);
        
        if (newReturnDateTime <= originalReturnDateTime) return 0;
        
        const diffMs = newReturnDateTime.getTime() - originalReturnDateTime.getTime();
        const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
        
        return diffHours * Number(reservation.car.penalty_per_hour);
    };

    const suggestedPenalty = calculateSuggestedPenalty();

    useEffect(() => {
        const originalEndDate = reservation?.end_date ? reservation.end_date.split('T')[0] : '';
        const originalReturnTime = reservation?.return_time || '';
        
        if (form.data.end_date !== originalEndDate || form.data.return_time !== originalReturnTime) {
            const penalty = calculateSuggestedPenalty();
            form.setData('penalty_amount', penalty);
        }
    }, [form.data.end_date, form.data.return_time]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(update(reservation.id).url);
    };

    return (
        <AdminLayout>
            <Head title={`Edit Reservasi ${reservation?.reservation_number || ''}`} />
            <main className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold">Edit Reservasi</h1>
                    <Link href={index().url}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                {/* Ringkasan */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">No. Reservasi</div>
                        <div className="font-medium">{reservation.reservation_number}</div>
                    </div>
                    <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">Klien</div>
                        <div className="font-medium">{reservation.user?.name} ({reservation.user?.email})</div>
                    </div>
                    <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">Kendaraan</div>
                        <div className="font-medium">
                            {reservation.car ? `${reservation.car.year} ${reservation.car.make} ${reservation.car.model}` : '—'}
                        </div>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Tanggal Mulai */}
                        <div>
                            <Label htmlFor="start_date">Tanggal Mulai</Label>
                            <Input id="start_date" type="date" value={form.data.start_date} onChange={e => form.setData('start_date', e.target.value)} />
                            <InputError message={form.errors.start_date} className="mt-1" />
                        </div>

                        {/* Tanggal Selesai */}
                        <div>
                            <Label htmlFor="end_date">Tanggal Selesai</Label>
                            <Input id="end_date" type="date" value={form.data.end_date} onChange={e => form.setData('end_date', e.target.value)} />
                            <InputError message={form.errors.end_date} className="mt-1" />
                        </div>

                        {/* Jam Pengambilan */}
                        <div>
                            <Label htmlFor="pickup_time">Jam Pengambilan</Label>
                            <Input id="pickup_time" type="time" value={form.data.pickup_time} onChange={e => form.setData('pickup_time', e.target.value)} />
                            <InputError message={form.errors.pickup_time} className="mt-1" />
                        </div>

                        {/* Jam Pengembalian */}
                        <div>
                            <Label htmlFor="return_time">Jam Pengembalian</Label>
                            <Input id="return_time" type="time" value={form.data.return_time} onChange={e => form.setData('return_time', e.target.value)} />
                            <InputError message={form.errors.return_time} className="mt-1" />
                        </div>

                        {/* Metode Pengambilan */}
                        <div>
                            <Label htmlFor="delivery_type">Metode Pengambilan</Label>
                            <select
                                id="delivery_type"
                                value={form.data.delivery_type}
                                onChange={e => form.setData('delivery_type', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            >
                                <option value="self_pickup">Ambil Sendiri di Kantor</option>
                                <option value="delivery">Diantar / Dijemput ke Lokasi Klien</option>
                            </select>
                            <InputError message={form.errors.delivery_type as string} className="mt-1" />
                        </div>

                        {/* Alamat Pengiriman */}
                        {form.data.delivery_type === 'delivery' && (
                            <div>
                                <Label htmlFor="delivery_address">Alamat Pengiriman</Label>
                                <Input id="delivery_address" placeholder="Masukkan alamat lengkap..." value={form.data.delivery_address} onChange={e => form.setData('delivery_address', e.target.value)} />
                                <InputError message={form.errors.delivery_address as string} className="mt-1" />
                            </div>
                        )}

                        {/* Diskon */}
                        <div>
                            <Label htmlFor="discount_amount">Diskon (Rp)</Label>
                            <Input id="discount_amount" type="number" step="0.01" min="0" value={form.data.discount_amount} onChange={e => form.setData('discount_amount', parseFloat(e.target.value) || 0)} />
                            <InputError message={form.errors.discount_amount} className="mt-1" />
                        </div>

                        {/* Denda */}
                        <div>
                            <Label htmlFor="penalty_amount">Total Denda (Rp)</Label>
                            <Input id="penalty_amount" type="number" step="0.01" min="0" value={form.data.penalty_amount} onChange={e => form.setData('penalty_amount', parseFloat(e.target.value) || 0)} />
                            {suggestedPenalty > 0 && (
                                <p className="mt-1 text-xs text-amber-600 font-medium">
                                    Saran Denda Keterlambatan: Rp {suggestedPenalty.toLocaleString('id-ID')}
                                </p>
                            )}
                            <InputError message={form.errors.penalty_amount as string} className="mt-1" />
                        </div>

                        {/* Status */}
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={form.data.status}
                                onChange={e => form.setData('status', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                            >
                                {statuses
                                    .filter(s => !['active', 'no_show'].includes(s.value))
                                    .map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                            <InputError message={form.errors.status} className="mt-1" />
                        </div>

                        {/* Sopir */}
                        <div className="md:col-span-2">
                            <Label htmlFor="driver_id">Sopir</Label>
                            <div className="mt-1">
                                {reservation.driver && (
                                    <div className="mb-3 flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-bold shrink-0">
                                            {reservation.driver.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Sopir saat ini: {reservation.driver.name}</p>
                                            <p className="text-xs text-gray-500">{reservation.driver.phone} — SIM: {reservation.driver.license_number}</p>
                                        </div>
                                    </div>
                                )}
                                <select
                                    id="driver_id"
                                    value={form.data.driver_id}
                                    onChange={e => form.setData('driver_id', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                                >
                                    <option value="">— Tanpa Sopir —</option>
                                    {drivers.map(d => (
                                        <option key={d.id} value={d.id}>
                                            {d.name} — {d.phone}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-xs text-gray-400">Pilih "Tanpa Sopir" untuk menghapus sopir dari reservasi ini.</p>
                            </div>
                            <InputError message={form.errors.driver_id} className="mt-1" />
                        </div>

                        {/* Catatan */}
                        <div className="md:col-span-2">
                            <Label htmlFor="notes">Catatan Internal</Label>
                            <textarea
                                id="notes"
                                rows={4}
                                value={form.data.notes}
                                onChange={e => form.setData('notes', e.target.value)}
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                                placeholder="Catatan internal..."
                            />
                            <InputError message={form.errors.notes} className="mt-1" />
                        </div>

                        {/* Alasan Pembatalan */}
                        {form.data.status === 'cancelled' && (
                            <div className="md:col-span-2">
                                <Label htmlFor="cancellation_reason">Alasan Pembatalan</Label>
                                <textarea
                                    id="cancellation_reason"
                                    rows={3}
                                    value={form.data.cancellation_reason}
                                    onChange={e => form.setData('cancellation_reason', e.target.value)}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                                    placeholder="Mengapa reservasi ini dibatalkan?"
                                />
                                <InputError message={form.errors.cancellation_reason} className="mt-1" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button type="submit" disabled={form.processing} className="!bg-blue-600 !text-white hover:!bg-blue-700">
                            {form.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                        <Link href={index().url}>
                            <Button type="button" variant="outline">Batal</Button>
                        </Link>
                    </div>
                </form>
            </main>
        </AdminLayout>
    );
}