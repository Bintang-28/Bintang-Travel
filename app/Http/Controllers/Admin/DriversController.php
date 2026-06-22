<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriversController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Drivers/Index', [
            'drivers' => Driver::orderBy('name')->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Drivers/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'phone'          => 'required|string|max:20',
            'license_number' => 'required|string|max:50|unique:drivers',
            'status' => 'required|in:available,unavailable,on_duty',
        ]);

        Driver::create($validated);

        return redirect()->route('admin.drivers.index')
            ->with('success', 'Sopir berhasil ditambahkan.');
    }

    public function edit(Driver $driver)
    {
        return Inertia::render('Admin/Drivers/Edit', [
            'driver' => $driver,
        ]);
    }

    public function update(Request $request, Driver $driver)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'phone'          => 'required|string|max:20',
            'license_number' => 'required|string|max:50|unique:drivers,license_number,' . $driver->id,
            'status'         => 'required|in:available,unavailable,on_duty',
        ]);

        $driver->update($validated);

        return redirect()->route('admin.drivers.index')
            ->with('success', 'Data sopir berhasil diperbarui.');
    }

    public function destroy(Driver $driver)
    {
        $driver->delete();

        return redirect()->route('admin.drivers.index')
            ->with('success', 'Sopir berhasil dihapus.');
    }
}