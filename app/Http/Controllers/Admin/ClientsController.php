<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Enums\PaymentStatus;
use App\Enums\UserRole;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ClientsController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();
        $status = $request->string('status')->toString();

        $query = User::query()
            ->when($search, function ($q) use ($search) {
                $q->where(function ($w) use ($search) {
                    $w->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($q) use ($status) {
                if ($status === 'active') {
                    $q->where('is_active', true);
                } elseif ($status === 'suspended') {
                    $q->where('is_active', false);
                }
            })
            ->withCount(['reservations', 'payments'])
            ->orderBy('name');

        $clients = $query->paginate(10)->withQueryString();

        $statusCounts = [
            'active' => User::where('is_active', true)->count(),
            'suspended' => User::where('is_active', false)->count(),
        ];

        $statuses = [
            'active' => ['label' => 'Active', 'count' => $statusCounts['active'], 'color' => '#10B981'],
            'suspended' => ['label' => 'Suspended', 'count' => $statusCounts['suspended'], 'color' => '#EF4444'],
        ];

        return Inertia::render('Admin/Clients/Index', [
            'clients' => $clients,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
            'statuses' => $statuses,
        ]);
    }

    public function show(User $client): Response
    {
        $totalSpent = Payment::where('user_id', $client->id)
            ->where('status', PaymentStatus::COMPLETED)
            ->sum('amount');

        $reservations = $client->reservations()
            ->with(['car'])
            ->orderByDesc('created_at')
            ->paginate(10, ['*'], 'reservations_page')
            ->withQueryString();

        $payments = $client->payments()
            ->with(['reservation'])
            ->orderByDesc('created_at')
            ->paginate(10, ['*'], 'payments_page')
            ->withQueryString();

        return Inertia::render('Admin/Clients/Show', [
            'client' => [
                'id' => $client->id,
                'name' => $client->name,
                'email' => $client->email,
                'phone' => $client->phone,
                'is_active' => (bool) $client->is_active,
                'created_at' => $client->created_at,
            ],
            'stats' => [
                'total_reservations' => $client->reservations()->count(),
                'total_payments' => $client->payments()->count(),
                'total_spent' => (float) $totalSpent,
            ],
            'reservations' => $reservations,
            'payments' => $payments,
        ]);
    }

    public function suspend(User $client)
    {
        $client->is_active = false;
        $client->save();

        return redirect()
            ->route('admin.clients.show', $client)
            ->with('success', 'Akun berhasil ditangguhkan.');
    }

    public function activate(User $client)
    {
        $client->is_active = true;
        $client->save();

        return redirect()
            ->route('admin.clients.show', $client)
            ->with('success', 'Akun berhasil diaktifkan.');
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Clients/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'string', Rule::in(['admin', 'client'])],
        ]);

        $roleEnum = $validated['role'] === 'admin' ? UserRole::ADMIN : UserRole::CLIENT;

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $roleEnum,
            'is_active' => true,
        ]);

        return redirect()
            ->route('admin.clients.index')
            ->with('success', 'Akun berhasil dibuat.');
    }

    public function edit(User $client): Response
    {
        return Inertia::render('Admin/Clients/Edit', [
            'client' => [
                'id' => $client->id,
                'name' => $client->name,
                'email' => $client->email,
                'phone' => $client->phone,
            ]
        ]);
    }

    public function update(Request $request, User $client)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $client->id],
            'phone' => ['required', 'string', 'max:20'],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        $client->name = $validated['name'];
        $client->email = $validated['email'];
        $client->phone = $validated['phone'];

        if ($request->filled('password')) {
            $client->password = bcrypt($validated['password']);
        }
        
        $client->save();

        return redirect()
            ->route('admin.clients.show', $client)
            ->with('success', 'Data akun berhasil diperbarui.');
    }

    public function destroy(User $client)
    {
        $client->delete();

        return redirect()
            ->route('admin.clients.index')
            ->with('success', 'Akun berhasil dihapus secara permanen.');
    }
}