<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Super Admin (Full access)
        User::query()->updateOrCreate(
            ['email' => 'bintangadmin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('00000000'),
                'role' => UserRole::SUPER_ADMIN,
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // Admin (Input Data only)
        User::query()->updateOrCreate(
            ['email' => 'bintangdata@example.com'],
            [
                'name' => 'Admin Input Data',
                'password' => Hash::make('00000000'),
                'role' => UserRole::ADMIN,
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // Kepala Travel (Reservations only)
        User::query()->updateOrCreate(
            ['email' => 'bintangtravel@example.com'],
            [
                'name' => 'Kepala Travel',
                'password' => Hash::make('00000000'),
                'role' => UserRole::KEPALA_TRAVEL,
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // Owner (Payments & Reports only)
        User::query()->updateOrCreate(
            ['email' => 'bintangowner@example.com'],
            [
                'name' => 'Owner Keuangan',
                'password' => Hash::make('00000000'),
                'role' => UserRole::OWNER,
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // Client
        User::query()->updateOrCreate(
            ['email' => 'bintangclient@example.com'],
            [
                'name' => 'Client Pertama',
                'password' => Hash::make('00000000'),
                'role' => UserRole::CLIENT,
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
