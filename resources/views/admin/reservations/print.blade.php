<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reservasi {{ $reservation->reservation_number }}</title>
    <style>
        @page { margin: 14mm 16mm; }
        * { box-sizing: border-box; }

        body {
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
            font-size: 11px;
            line-height: 1.5;
            margin: 0;
            background: #fff;
        }

        /* ── HEADER ── */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            padding-bottom: 10px;
            border-bottom: 2px solid #E5E7EB;
        }
        .title {
            font-size: 17px;
            font-weight: 700;
            color: #111827;
        }
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            border-radius: 9999px;
            padding: 4px 11px;
            font-size: 10.5px;
            font-weight: 600;
        }

        /* ── SECTION ── */
        .section {
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            margin-bottom: 10px;
            page-break-inside: avoid;
            overflow: hidden;
        }
        .section-header {
            background: #F3F4F6;
            border-bottom: 1px solid #E5E7EB;
            padding: 6px 12px;
            font-weight: 700;
            font-size: 10.5px;
            letter-spacing: 0.3px;
            color: #374151;
            text-transform: uppercase;
        }
        .section-body {
            padding: 10px 12px;
        }

        /* ── GRID ── */
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 16px; }

        /* ── INFO ROW (Label : Nilai) ── */
        .info-row {
            display: flex;
            align-items: baseline;
            padding: 4px 0;
            border-bottom: 1px dashed #F3F4F6;
        }
        .info-row:last-child { border-bottom: none; }
        .info-label {
            color: #6B7280;
            font-size: 10px;
            width: 130px;
            flex-shrink: 0;
        }
        .info-sep {
            color: #9CA3AF;
            margin: 0 6px;
            font-weight: 400;
        }
        .info-value {
            font-weight: 600;
            color: #111827;
            flex: 1;
        }

        /* ── COST ROWS ── */
        .cost-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
            border-bottom: 1px dashed #F3F4F6;
        }
        .cost-row:last-child { border-bottom: none; }
        .cost-label { color: #6B7280; font-size: 10.5px; }
        .cost-value { font-weight: 600; color: #111827; }
        .cost-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 7px 0 3px;
            margin-top: 4px;
            border-top: 2px solid #E5E7EB;
        }
        .cost-total .cost-label { font-weight: 700; font-size: 11.5px; color: #111827; }
        .cost-total .cost-value { font-size: 13px; color: #111827; }

        /* ── TABLE ── */
        table { width: 100%; border-collapse: collapse; }
        thead tr { background: #F9FAFB; }
        th {
            text-align: left;
            padding: 6px 8px;
            font-size: 10px;
            font-weight: 700;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            border-bottom: 1px solid #E5E7EB;
        }
        td {
            padding: 6px 8px;
            font-size: 10.5px;
            color: #374151;
            border-bottom: 1px solid #F3F4F6;
            vertical-align: middle;
        }
        tbody tr:last-child td { border-bottom: none; }

        /* ── UTILS ── */
        .text-muted { color: #9CA3AF; font-style: italic; }
        .mt-block { margin-top: 8px; }
    </style>
</head>
<body>
<div class="container">

    {{-- ════════ HEADER ════════ --}}
    <div class="header">
        <div class="title">Reservasi &nbsp;{{ $reservation->reservation_number }}</div>
        @php
            $statusMap = collect($statusMeta)->keyBy('value');
            $meta      = $statusMap[$reservation->status->value] ?? null;
            $hex       = $meta['color'] ?? '#6B7280';
            $rgb       = [
                hexdec(substr(ltrim($hex,'#'), 0, 2)),
                hexdec(substr(ltrim($hex,'#'), 2, 2)),
                hexdec(substr(ltrim($hex,'#'), 4, 2)),
            ];
        @endphp
        <span class="badge"
              style="background: rgba({{ $rgb[0] }},{{ $rgb[1] }},{{ $rgb[2] }},0.12); color:{{ $hex }}; border: 1px solid rgba({{ $rgb[0] }},{{ $rgb[1] }},{{ $rgb[2] }},0.3);">
            <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:{{ $hex }};"></span>
            {{ $meta['label'] ?? ucfirst(str_replace('_',' ',$reservation->status->value)) }}
        </span>
    </div>

    {{-- ════════ KLIEN & KENDARAAN ════════ --}}
    <div class="section">
        <div class="section-header">Klien &amp; Kendaraan</div>
        <div class="section-body grid-2">
            <div>
                <div class="info-row">
                    <span class="info-label">Nama</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->user->name ?? '—' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->user->email ?? '—' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Telepon</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->user->phone ?? '—' }}</span>
                </div>
            </div>
            <div>
                <div class="info-row">
                    <span class="info-label">Kendaraan</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">
                        @if($reservation->car)
                            {{ $reservation->car->year }} {{ $reservation->car->make }} {{ $reservation->car->model }}
                        @else —
                        @endif
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">Plat Nomor</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->car->license_plate ?? '—' }}</span>
                </div>
            </div>
        </div>
    </div>

    {{-- ════════ DETAIL RESERVASI ════════ --}}
    <div class="section">
        <div class="section-header">Detail Reservasi</div>
        <div class="section-body grid-3">
            <div>
                <div class="info-row">
                    <span class="info-label">Tanggal Mulai</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">
                        {{ optional($reservation->start_date)->format('d-m-Y') }}
                        {{ optional($reservation->pickup_time)->format('H:i') }}
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">Tanggal Selesai</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">
                        {{ optional($reservation->end_date)->format('d-m-Y') }}
                        {{ optional($reservation->return_time)->format('H:i') }}
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">Durasi</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->total_days }} hari</span>
                </div>
            </div>
            <div>
                <div class="info-row">
                    <span class="info-label">Lokasi Penjemputan</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->pickup_location ?? '—' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Lokasi Pengembalian</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->return_location ?? '—' }}</span>
                </div>
            </div>
            <div>
                <div class="info-row">
                    <span class="info-label">Sopir</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->driver->name ?? '—' }}</span>
                </div>
                @if($reservation->driver)
                <div class="info-row">
                    <span class="info-label">No. SIM</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->driver->license_number ?? '—' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Telepon Sopir</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->driver->phone ?? '—' }}</span>
                </div>
                @endif
                @if($reservation->status === \App\Enums\ReservationStatus::CANCELLED)
                <div class="info-row mt-block">
                    <span class="info-label">Dibatalkan Pada</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ optional($reservation->cancelled_at)->format('d-m-Y H:i') ?? '—' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Alasan</span>
                    <span class="info-sep">:</span>
                    <span class="info-value">{{ $reservation->cancellation_reason ?? '—' }}</span>
                </div>
                @endif
            </div>
        </div>
    </div>

    {{-- ════════ PEMBAYARAN ════════ --}}
    <div class="section">
        <div class="section-header">Pembayaran</div>
        <div class="section-body">
            @if($reservation->payments->count() === 0)
                <span class="text-muted">Belum ada pembayaran tercatat.</span>
            @else
                <table>
                    <thead>
                        <tr>
                            <th>No. Pembayaran</th>
                            <th>Jumlah</th>
                            <th>Metode</th>
                            <th>Status</th>
                            <th>Diproses Pada</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($reservation->payments as $p)
                            <tr>
                                <td>{{ $p->payment_number }}</td>
                                <td>{{ $currency }}{{ number_format((float)$p->amount, 2) }}</td>
                                <td>{{ ucfirst(str_replace('_', ' ', $p->payment_method->value ?? $p->payment_method)) }}</td>
                                <td>{{ ucfirst(str_replace('_', ' ', $p->status->value ?? $p->status)) }}</td>
                                <td>{{ optional($p->processed_at)->format('d-m-Y H:i') ?? '—' }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @endif
        </div>
    </div>

    {{-- ════════ RINCIAN BIAYA ════════ --}}
    @php
        $driverFee = (float)$reservation->total_amount - (float)$reservation->subtotal + (float)$reservation->discount_amount;
    @endphp
    <div class="section">
        <div class="section-header">Rincian Biaya</div>
        <div class="section-body">
            <div class="cost-row">
                <span class="cost-label">Tarif Harian</span>
                <span class="cost-value">{{ $currency }}{{ number_format((float)$reservation->daily_rate, 2) }}</span>
            </div>
            <div class="cost-row">
                <span class="cost-label">Subtotal Sewa</span>
                <span class="cost-value">{{ $currency }}{{ number_format((float)$reservation->subtotal, 2) }}</span>
            </div>
            @if($reservation->driver)
            <div class="cost-row">
                <span class="cost-label">Biaya Sopir &nbsp;<span style="color:#9CA3AF;font-weight:400;">({{ $reservation->driver->name }})</span></span>
                <span class="cost-value">{{ $currency }}{{ number_format($driverFee, 2) }}</span>
            </div>
            @endif
            <div class="cost-row">
                <span class="cost-label">Diskon</span>
                <span class="cost-value" style="color:#DC2626;">- {{ $currency }}{{ number_format((float)$reservation->discount_amount, 2) }}</span>
            </div>
            <div class="cost-total">
                <span class="cost-label">Total</span>
                <span class="cost-value">{{ $currency }}{{ number_format((float)$reservation->total_amount, 2) }}</span>
            </div>
        </div>
    </div>

</div>
</body>
</html>