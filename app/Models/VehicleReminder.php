<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleReminder extends Model
{
    protected $fillable = [
        'car_id',
        'label',
        'due_date',
        'reminder_days_before',
        'notified_at',
    ];

    protected $casts = [
        'due_date'              => 'date',
        'reminder_days_before'  => 'integer',
        'notified_at'           => 'datetime',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }

    /**
     * Reset notified_at otomatis kalau due_date diubah,
     * supaya reminder "hidup lagi" untuk tanggal yang baru.
     */
    protected static function booted(): void
    {
        static::updating(function (VehicleReminder $reminder) {
            if ($reminder->isDirty('due_date')) {
                $reminder->notified_at = null;
            }
        });
    }
}