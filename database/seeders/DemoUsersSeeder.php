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
        // Admin
        User::query()->updateOrCreate(
            ['email' => 'bintangadmin@example.com'],
            [
                'name' => 'Admin Utama',
                'password' => Hash::make('00000000'),
                'role' => UserRole::ADMIN,
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
