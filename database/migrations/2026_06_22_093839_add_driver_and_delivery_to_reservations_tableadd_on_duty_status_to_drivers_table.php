<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Laravel menamai check constraint enum secara default: {table}_{column}_check
        DB::statement("ALTER TABLE drivers DROP CONSTRAINT IF EXISTS drivers_status_check");
        DB::statement("ALTER TABLE drivers ADD CONSTRAINT drivers_status_check CHECK (status IN ('available', 'unavailable', 'on_duty'))");
    }

    public function down(): void
    {
        DB::statement("UPDATE drivers SET status = 'unavailable' WHERE status = 'on_duty'");
        DB::statement("ALTER TABLE drivers DROP CONSTRAINT IF EXISTS drivers_status_check");
        DB::statement("ALTER TABLE drivers ADD CONSTRAINT drivers_status_check CHECK (status IN ('available', 'unavailable'))");
    }
};