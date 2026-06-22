<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VehicleMaintenance extends Model
{
    use HasFactory;

    protected $table = 'vehicle_maintenances';

    protected $fillable = [
    'car_id',
    'type',
    'description',
    'cost',
    'vendor',
    'service_date',
    'estimated_completion_date',
    'next_service_date',
    'completed_at',
    'odometer_km',
    ];

    protected $casts = [
        'service_date'               => 'date',
        'estimated_completion_date'  => 'date',
        'next_service_date'          => 'date',
        'completed_at'               => 'date',
        'cost'                       => 'decimal:2',
        'odometer_km'                => 'integer',
    ];

    // Relasi ke tabel cars
    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}