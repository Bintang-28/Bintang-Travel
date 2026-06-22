<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VehicleReminder;
use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleReminderController extends Controller
{
    public function index()
    {
        $reminders = VehicleReminder::with('car')
            ->orderBy('due_date')
            ->paginate(10);

        return Inertia::render('Admin/Reminders/Index', [
            'reminders' => $reminders,
        ]);
    }

    public function create()
    {
        $cars = Car::select('id', 'make', 'model', 'year', 'license_plate')->get();

        return Inertia::render('Admin/Reminders/Create', [
            'cars' => $cars,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id'                => 'required|exists:cars,id',
            'label'                 => 'required|string|max:255',
            'due_date'              => 'required|date',
            'reminder_days_before'  => 'required|integer|min:0|max:365',
        ]);

        VehicleReminder::create($validated);

        return redirect()->route('admin.reminders.index')
            ->with('success', 'Pengingat berhasil ditambahkan.');
    }

    public function edit(VehicleReminder $reminder)
    {
        $cars = Car::select('id', 'make', 'model', 'year', 'license_plate')->get();

        return Inertia::render('Admin/Reminders/Edit', [
            'reminder' => $reminder,
            'cars'     => $cars,
        ]);
    }

    public function update(Request $request, VehicleReminder $reminder)
    {
        $validated = $request->validate([
            'car_id'                => 'required|exists:cars,id',
            'label'                 => 'required|string|max:255',
            'due_date'              => 'required|date',
            'reminder_days_before'  => 'required|integer|min:0|max:365',
        ]);

        // notified_at otomatis di-reset oleh model kalau due_date berubah
        $reminder->update($validated);

        return redirect()->route('admin.reminders.index')
            ->with('success', 'Pengingat berhasil diperbarui.');
    }

    public function destroy(VehicleReminder $reminder)
    {
        $reminder->delete();

        return redirect()->route('admin.reminders.index')
            ->with('success', 'Pengingat berhasil dihapus.');
    }
}