<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VehicleMaintenance;
use App\Models\Car;
use App\Enums\CarStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function index()
    {
        $maintenances = VehicleMaintenance::with('car')
            ->latest('service_date')
            ->paginate(10);

        return Inertia::render('Admin/Maintenance/Index', [
            'maintenances' => $maintenances,
        ]);
    }

    public function create()
    {
        $cars = Car::select('id', 'make', 'model', 'year', 'license_plate')->get();

        return Inertia::render('Admin/Maintenance/Create', [
            'cars' => $cars,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
        'car_id'                    => 'required|exists:cars,id',
        'type'                      => 'required|string|max:255',
        'description'               => 'nullable|string',
        'cost'                      => 'required|numeric|min:0',
        'vendor'                    => 'nullable|string|max:255',
        'service_date'              => 'required|date',
        'estimated_completion_date' => 'nullable|date|after_or_equal:service_date',
        'next_service_date'         => 'nullable|date|after:service_date',
        'completed_at'              => 'nullable|date',
        'odometer_km'                => 'nullable|integer|min:0',
    ]);

        VehicleMaintenance::create($validated);

        // Ubah status + simpan keterangan dari field type
        Car::where('id', $validated['car_id'])->update([
            'status'           => CarStatus::MAINTENANCE,
            'maintenance_note' => $validated['type'], // ← "Ganti Ban", "Ganti Oli", dll
        ]);

        return redirect()->route('admin.maintenance.index')
            ->with('success', 'Data perbaikan berhasil disimpan.');
    }

    public function edit(VehicleMaintenance $maintenance)
    {
        $cars = Car::select('id', 'make', 'model', 'year', 'license_plate')->get();

        return Inertia::render('Admin/Maintenance/Edit', [
            'maintenance' => $maintenance->load('car'),
            'cars'        => $cars,
        ]);
    }

    public function update(Request $request, VehicleMaintenance $maintenance)
    {
        $validated = $request->validate([
        'car_id'                    => 'required|exists:cars,id',
        'type'                      => 'required|string|max:255',
        'description'               => 'nullable|string',
        'cost'                      => 'required|numeric|min:0',
        'vendor'                    => 'nullable|string|max:255',
        'service_date'              => 'required|date',
        'estimated_completion_date' => 'nullable|date|after_or_equal:service_date',
        'next_service_date'         => 'nullable|date|after:service_date',
        'completed_at'              => 'nullable|date',
        'odometer_km'                => 'nullable|integer|min:0',
    ]);

        $oldCarId = $maintenance->car_id;
        $maintenance->update($validated);

        if (!empty($validated['completed_at'])) {
            // Selesai service → hapus note, kembalikan ke available
            Car::where('id', $validated['car_id'])->update([
                'status'           => CarStatus::AVAILABLE,
                'maintenance_note' => null,
            ]);
        } elseif ($oldCarId !== (int) $validated['car_id']) {
            // Ganti mobil → kembalikan mobil lama, set mobil baru ke maintenance
            Car::where('id', $oldCarId)->update([
                'status'           => CarStatus::AVAILABLE,
                'maintenance_note' => null,
            ]);
            Car::where('id', $validated['car_id'])->update([
                'status'           => CarStatus::MAINTENANCE,
                'maintenance_note' => $validated['type'],
            ]);
        } else {
            // Update note jika type berubah
            Car::where('id', $validated['car_id'])->update([
                'maintenance_note' => $validated['type'],
            ]);
        }

        return redirect()->route('admin.maintenance.index')
            ->with('success', 'Data perbaikan berhasil diperbarui.');
    }

    public function destroy(VehicleMaintenance $maintenance)
    {
        $carId = $maintenance->car_id;
        $maintenance->delete();

        $stillInMaintenance = VehicleMaintenance::where('car_id', $carId)
            ->whereNull('completed_at')
            ->exists();

        if (!$stillInMaintenance) {
            Car::where('id', $carId)->update([
                'status'           => CarStatus::AVAILABLE,
                'maintenance_note' => null,
            ]);
        }

        return redirect()->route('admin.maintenance.index')
            ->with('success', 'Data perbaikan berhasil dihapus.');
    }
}