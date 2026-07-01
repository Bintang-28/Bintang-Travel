<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check() || Auth::user()->role === UserRole::CLIENT) {
            abort(403, 'Unauthorized action.');
        }

        $user = Auth::user();
        $routeName = $request->route() ? $request->route()->getName() : null;

        // If route name is not set, let them pass
        if (!$routeName) {
            return $next($request);
        }

        // Define permissions per role
        switch ($user->role) {
            case UserRole::SUPER_ADMIN:
                // Super Admin has access to everything
                return $next($request);

            case UserRole::ADMIN:
                // Admin: Cars, Drivers, Maintenance, Reminders, Reservations, Support
                $allowedPrefixes = [
                    'admin.cars.',
                    'admin.drivers.',
                    'admin.maintenance.',
                    'admin.reminders.',
                    'admin.reservations.',
                    'admin.support.',
                ];
                break;

            case UserRole::OWNER:
                // Owner: Payments, Reports
                $allowedPrefixes = [
                    'admin.payments.',
                    'admin.reports.',
                ];
                break;

            default:
                abort(403, 'Unauthorized action.');
        }

        // Check if the current route name matches any of the allowed prefixes
        foreach ($allowedPrefixes as $prefix) {
            if (str_starts_with($routeName, $prefix)) {
                return $next($request);
            }
        }

        // Also allow the home/redirect route
        if ($routeName === 'admin.home') {
            return $next($request);
        }

        abort(403, 'Unauthorized action.');
    }
}
