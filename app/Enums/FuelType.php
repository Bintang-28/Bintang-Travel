<?php

namespace App\Enums;

enum FuelType: string
{
    case PERTALITE = 'pertalite';
    case PERTAMAX = 'pertamax';
    case SOLAR = 'solar';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function toArray(): array
    {
        return [
            self::PERTALITE->value,
            self::PERTAMAX->value,
            self::SOLAR->value,
        ];
    }

    public static function forFrontend(): array
    {
        return self::toArray();
    }
}