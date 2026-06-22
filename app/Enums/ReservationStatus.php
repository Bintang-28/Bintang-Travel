<?php

namespace App\Enums;

enum ReservationStatus: string
{
    case PENDING   = 'pending';
    case CONFIRMED = 'confirmed';
    case ACTIVE    = 'active';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
    case NO_SHOW   = 'no_show';

    public function label(): string
    {
        return match ($this) {
            self::PENDING   => 'Menunggu Konfirmasi',
            self::CONFIRMED => 'Dikonfirmasi',
            self::ACTIVE    => 'Sedang Berjalan',
            self::COMPLETED => 'Selesai',
            self::CANCELLED => 'Dibatalkan',
            self::NO_SHOW   => 'Tidak Hadir',
        };
    }

    public static function statusColors(): array
    {
        return [
            self::PENDING->value   => '#F59E0B',
            self::CONFIRMED->value => '#10B981',
            self::ACTIVE->value    => '#3B82F6',
            self::COMPLETED->value => '#111827',
            self::CANCELLED->value => '#EF4444',
            self::NO_SHOW->value   => '#6B7280',
        ];
    }

    public static function getMeta(): array
    {
        return array_map(function ($case) {
            return [
                'value' => $case->value,
                'label' => $case->label(),
                'color' => self::statusColors()[$case->value] ?? '#6B7280',
            ];
        }, self::cases());
    }
}