import AdminLayout from '@/layouts/AdminLayout';
import { router, usePage } from '@inertiajs/react';
import { Chart, registerables } from 'chart.js';
import { useMemo, useEffect, useRef, useState } from 'react';

Chart.register(...registerables);

export default function Reports() {
    const page = usePage<any>();
    const { kpis, carsState, financialChart, carsPerformance, currentPeriod, periodOptions } = page.props;

    const [selectedPeriod, setSelectedPeriod] = useState(currentPeriod);
    const [sortField, setSortField] = useState<string>('total_revenue');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const chartCanvas = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    const sortedCarsPerformance = useMemo(() => {
        return [...carsPerformance].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            return sortDirection === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
        }).slice(0, 10);
    }, [carsPerformance, sortField, sortDirection]);

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const period = e.target.value;
        setSelectedPeriod(period);
        router.get('/admin/reports', { period }, {
            preserveState: false,
            preserveScroll: false,
            only: ['kpis', 'carsState', 'financialChart', 'carsPerformance', 'currentPeriod'],
        });
    };

    const sortTable = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    useEffect(() => {
        if (!chartCanvas.current || !financialChart) return;
        if (chartInstance.current) chartInstance.current.destroy();

        const ctx = chartCanvas.current.getContext('2d');
        if (!ctx) return;

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: financialChart.labels,
                datasets: financialChart.datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: { padding: 20, usePointStyle: true, pointStyle: 'circle' }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        callbacks: {
                            label: (item) => {
                                return ` ${item.dataset.label}: Rp ${Number(item.raw).toLocaleString('id-ID')}`;
                            }
                        }
                    }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.06)' },
                        ticks: {
                            callback: (value) => 'Rp ' + Number(value).toLocaleString('id-ID')
                        }
                    }
                }
            },
        });

        return () => chartInstance.current?.destroy();
    }, [financialChart]);

    const kpiCards = [
        {
            label: kpis.totalRevenue.label,
            val: kpis.totalRevenue.formatted,
            color: 'bg-green-500',
            textColor: 'text-green-700',
            bgLight: 'bg-green-50',
        },
        {
            label: kpis.totalMaintenance.label,
            val: kpis.totalMaintenance.formatted,
            color: 'bg-red-500',
            textColor: 'text-red-700',
            bgLight: 'bg-red-50',
        },
        {
            label: kpis.netProfit.label,
            val: kpis.netProfit.formatted,
            color: kpis.netProfit.isNegative ? 'bg-orange-500' : 'bg-blue-500',
            textColor: kpis.netProfit.isNegative ? 'text-orange-700' : 'text-blue-700',
            bgLight: kpis.netProfit.isNegative ? 'bg-orange-50' : 'bg-blue-50',
        },
        {
            label: kpis.platformVisits.label,
            val: kpis.platformVisits.formatted,
            color: 'bg-indigo-500',
            textColor: 'text-indigo-700',
            bgLight: 'bg-indigo-50',
        },
        {
            label: kpis.activeReservations.label,
            val: kpis.activeReservations.formatted,
            color: 'bg-yellow-500',
            textColor: 'text-yellow-700',
            bgLight: 'bg-yellow-50',
        },
        {
            label: kpis.newClients.label,
            val: kpis.newClients.formatted,
            color: 'bg-purple-500',
            textColor: 'text-purple-700',
            bgLight: 'bg-purple-50',
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6 px-8 py-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Laporan & Analitik</h2>
                    <div className="flex items-center space-x-2">
                        <label htmlFor="period" className="text-sm font-medium text-gray-700">Periode:</label>
                        <select
                            id="period"
                            value={selectedPeriod}
                            onChange={handlePeriodChange}
                            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
                        >
                            {periodOptions.map((opt: any) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {kpiCards.map((item, i) => (
                        <div key={i} className={`overflow-hidden rounded-xl border bg-white shadow-sm p-5`}>
                            <div className="flex items-center gap-4">
                                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${item.color}`} />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{item.label}</p>
                                    <p className={`mt-0.5 text-xl font-bold ${item.textColor}`}>{item.val}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Financial Chart */}
                <div className="rounded-xl border bg-white shadow-sm p-6">
                    <h3 className="mb-4 text-base font-semibold text-gray-800">Arus Keuangan</h3>
                    <div className="relative h-80">
                        <canvas ref={chartCanvas} />
                    </div>
                </div>

                {/* Cars Performance Table */}
                <div className="rounded-xl border bg-white shadow-sm p-6">
                    <h3 className="mb-4 text-base font-semibold text-gray-800">Performa Kendaraan</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        { label: 'Kendaraan', field: 'car_name' },
                                        { label: 'Status', field: 'status' },
                                        { label: 'Reservasi', field: 'total_reservations' },
                                        { label: 'Total Pendapatan', field: 'total_revenue' },
                                        { label: 'Utilisasi', field: 'utilization_rate' },
                                        { label: 'Rata-rata/Reservasi', field: 'average_per_reservation' },
                                    ].map((col) => (
                                        <th
                                            key={col.field}
                                            onClick={() => sortTable(col.field)}
                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                                        >
                                            <span className="flex items-center gap-1">
                                                {col.label}
                                                {sortField === col.field && (
                                                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {sortedCarsPerformance.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                            Tidak ada data untuk periode ini.
                                        </td>
                                    </tr>
                                ) : (
                                    sortedCarsPerformance.map((car: any) => (
                                        <tr key={car.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-medium text-gray-900">{car.car_name}</div>
                                                <div className="text-xs text-gray-400">{car.license_plate}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className="inline-flex rounded-full px-2.5 py-1 text-xs font-medium text-white"
                                                    style={{ backgroundColor: car.status_color }}
                                                >
                                                    {car.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{car.total_reservations}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-green-700">{car.formatted_revenue}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{car.utilization_rate}%</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{car.formatted_average_per_reservation}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}