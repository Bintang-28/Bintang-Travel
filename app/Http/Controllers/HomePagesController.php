<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\VehicleMaintenance;


class HomePagesController extends Controller
{
    public function index()
    {
        $homeCars = Car::select('id', 'make', 'model', 'year', 'price_per_day', 'description', 'fuel_type', 'status', 'maintenance_note')
            ->addSelect(['estimated_completion_date' => VehicleMaintenance::select('estimated_completion_date')
                ->whereColumn('car_id', 'cars.id')
                ->whereNull('completed_at')
                ->latest('service_date')
                ->limit(1)
            ])
            ->with(['reservations' => function ($q) {
                $q->where('status', 'active')
                ->orderBy('end_date', 'desc')
                ->select('id', 'car_id', 'end_date', 'status');
            }])
            ->latest('created_at')
            ->limit(3)
            ->get();

        return inertia('Welcome', compact('homeCars'));
    }

    public function fleet(Request $request)
    {
    $query = Car::select('id', 'make', 'model', 'year', 'price_per_day', 'description', 'fuel_type', 'status', 'maintenance_note')
        ->addSelect(['estimated_completion_date' => VehicleMaintenance::select('estimated_completion_date')
            ->whereColumn('car_id', 'cars.id')
            ->whereNull('completed_at')
            ->latest('service_date')
            ->limit(1)
        ])
        ->with(['reservations' => function ($q) {
            $q->where('status', 'active')
              ->orderBy('end_date', 'desc')
              ->select('id', 'car_id', 'end_date', 'status');
        }]);

        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('make', 'ilike', "%{$searchTerm}%")
                    ->orWhere('model', 'ilike', "%{$searchTerm}%")
                    ->orWhere('description', 'ilike', "%{$searchTerm}%");
            });
        }

        if ($request->filled('make')) {
            $query->where('make', $request->make);
        }

        if ($request->filled('fuel_type')) {
            $query->where('fuel_type', $request->fuel_type);
        }

        if ($request->filled('year')) {
            $query->where('year', $request->year);
        }

        if ($request->filled('min_price')) {
            $query->where('price_per_day', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price_per_day', '<=', $request->max_price);
        }

        $cars = $query->paginate(10)->withQueryString();

        // Filter options dari semua mobil
        $makes = Car::distinct()->pluck('make')->toArray();
        $fuelTypes = Car::distinct()->pluck('fuel_type')->toArray();
        $years = Car::distinct()->orderBy('year', 'desc')->pluck('year')->toArray();

        $filters = $request->only(['search', 'make', 'fuel_type', 'min_price', 'max_price', 'year']);

        return inertia('Fleet', compact('cars', 'makes', 'fuelTypes', 'years', 'filters'));
    }

    public function about()
    {
        return inertia('About');
    }

    public function contact()
    {
        return inertia('Contact');
    }

    public function guestContact(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $ticket = Ticket::create([
            'guest_name' => $request->name,
            'guest_email' => $request->email,
            'subject' => $request->subject,
        ]);

        $ticket->messages()->create([
            'message' => $request->message,
        ]);

        return redirect()->route('contact')->with('success', 'Message sent successfully!');
    }
}