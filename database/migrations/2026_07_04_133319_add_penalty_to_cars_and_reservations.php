<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->decimal('penalty_per_hour', 10, 2)->default(0)->after('price_per_day');
        });

        Schema::table('reservations', function (Blueprint $table) {
            $table->decimal('penalty_amount', 14, 2)->default(0)->after('discount_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn('penalty_amount');
        });

        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn('penalty_per_hour');
        });
    }
};
