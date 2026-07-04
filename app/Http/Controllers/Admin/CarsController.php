<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Enums\CarColor;
use App\Enums\CarStatus;
use App\Enums\FuelType;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class CarsController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->input('status');
        
        $statusCounts = Car::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        $cars = Car::query()->with('files')
            ->when($request->string('search')->toString(), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('make', 'like', "%{$search}%")
                        ->orWhere('model', 'like', "%{$search}%")
                        ->orWhere('license_plate', 'like', "%{$search}%");
                });
            })
            ->when($status && $status !== 'all', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        $statuses = collect(CarStatus::cases())->mapWithKeys(function ($status) use ($statusCounts) {
            return [
                $status->value => [
                    'label' => $status->label(),
                    'count' => $statusCounts[$status->value] ?? 0,
                    'color' => $status->color(),
                ]
            ];
        })->toArray();

        return Inertia::render('Admin/Cars/Index', [
            'cars' => $cars,
            'filters' => [
                'search' => $request->string('search')->toString(),
                'status' => $status,
            ],
            'statuses' => $statuses,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Cars/Edit', [
            'car' => null,
            'imageFiles' => [],
            'enums' => [
                'colors' => CarColor::forFrontend(),
                'fuelTypes' => FuelType::forFrontend(),
                'statuses' => array_map(fn($status) => [
                    'value' => $status->value,
                    'label' => $status->label(),
                    'color' => $status->color()
                ], CarStatus::cases()),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'make' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'min:1900', 'max:2100'],
            'license_plate' => ['required', 'string', 'max:255', 'unique:cars,license_plate'],
            'color' => ['required', 'string', Rule::enum(CarColor::class)],
            'price_per_day' => ['required', 'numeric', 'min:0'],
            'penalty_per_hour' => ['required', 'numeric', 'min:0'],
            'mileage' => ['required', 'integer', 'min:0'],
            'transmission' => ['required', Rule::in(['automatic', 'manual'])],
            'seats' => ['required', 'integer', 'min:1'],
            'fuel_type' => ['required', 'string', Rule::enum(FuelType::class)],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'string', Rule::enum(CarStatus::class)],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ]);

        $car = Car::create(collect($validated)->except(['image'])->toArray());

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('cars', 'public');
            
            $car->files()->create([
                'collection' => 'image',
                'path' => $path,
                'original_name' => $file->getClientOriginalName(), 
                'filename' => $file->hashName(),
                'mime_type' => $file->getClientMimeType(), 
                'size' => $file->getSize(), 
            ]);
        }

        return redirect()
            ->route('admin.cars.index')
            ->with('success', 'Mobil berhasil ditambahkan.');
    }

    public function edit(Car $car): Response
    {
        $imageFiles = $car->files()
            ->where('collection', 'image')
            ->get()
            ->map(fn ($f) => [
                'id' => $f->id,
                'url' => Storage::url($f->path),
            ]);

        return Inertia::render('Admin/Cars/Edit', [
            'car' => $car,
            'imageFiles' => $imageFiles,
            'enums' => [
                'colors' => CarColor::forFrontend(),
                'fuelTypes' => FuelType::forFrontend(),
                'statuses' => array_map(fn($status) => [
                    'value' => $status->value,
                    'label' => $status->label(),
                    'color' => $status->color()
                ], CarStatus::cases()),
            ],
        ]);
    }

    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'make' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'min:1900', 'max:2100'],
            'license_plate' => [
                'required', 'string', 'max:255', Rule::unique('cars', 'license_plate')->ignore($car->id),
            ],
            'color' => ['required', 'string', Rule::enum(CarColor::class)],
            'price_per_day' => ['required', 'numeric', 'min:0'],
            'penalty_per_hour' => ['required', 'numeric', 'min:0'],
            'mileage' => ['required', 'integer', 'min:0'],
            'transmission' => ['required', Rule::in(['automatic', 'manual'])],
            'seats' => ['required', 'integer', 'min:1'],
            'fuel_type' => ['required', 'string', Rule::enum(FuelType::class)],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'string', Rule::enum(CarStatus::class)],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'image_removed_files' => ['nullable', 'array'],
            'image_removed_files.*' => ['integer'],
        ]);

        $car->update(collect($validated)->except(['image', 'image_removed_files'])->toArray());

        if ($request->filled('image_removed_files')) {
            $filesToRemove = $car->files()->whereIn('id', $request->image_removed_files)->get();
            foreach ($filesToRemove as $file) {
                Storage::disk('public')->delete($file->path);
                $file->delete();
            }
        }

        if ($request->hasFile('image')) {
            $oldFiles = $car->files()->where('collection', 'image')->get();
            foreach ($oldFiles as $oldFile) {
                Storage::disk('public')->delete($oldFile->path);
                $oldFile->delete();
            }

            $file = $request->file('image');
            $path = $file->store('cars', 'public');
            
            $car->files()->create([
                'collection' => 'image',
                'path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'filename' => $file->hashName(),
                'mime_type' => $file->getClientMimeType(),
                'size' => $file->getSize(),
            ]);
        }

        return redirect()
            ->route('admin.cars.index')
            ->with('success', 'Data mobil berhasil diperbarui.');
    }

    public function destroy(Car $car)
    {
        $files = $car->files()->get();
        foreach ($files as $file) {
            Storage::disk('public')->delete($file->path);
        }
        
        $car->delete();

        return redirect()
            ->back()
            ->with('success', 'Mobil berhasil dihapus.');
    }
}