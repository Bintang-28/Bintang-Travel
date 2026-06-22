<?php

namespace App\Enums;

enum CarStatus: string
{
    case AVAILABLE   = 'available';
    case RENTED      = 'rented';
    case MAINTENANCE = 'maintenance';

    public function label(): string
    {
        return match ($this) {
            self::AVAILABLE   => 'Tersedia',
            self::RENTED      => 'Sedang Dirental',
            self::MAINTENANCE => 'Sedang Diperbaiki',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::AVAILABLE   => 'Kendaraan siap untuk disewa.',
            self::RENTED      => 'Kendaraan sedang digunakan oleh penyewa.',
            self::MAINTENANCE => 'Kendaraan sedang dalam perbaikan atau perawatan.',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::AVAILABLE   => '#10B981',
            self::RENTED      => '#F59E0B',
            self::MAINTENANCE => '#EF4444',
        };
    }
}