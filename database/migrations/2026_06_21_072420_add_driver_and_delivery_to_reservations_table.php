<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->enum('delivery_type', ['self_pickup', 'delivery'])->default('self_pickup')->after('return_location');
            $table->string('delivery_address')->nullable()->after('delivery_type');
            $table->foreignId('driver_id')->nullable()->constrained('drivers')->nullOnDelete()->after('delivery_address');
        });
    }

    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropForeign(['driver_id']);
            $table->dropColumn(['delivery_type', 'delivery_address', 'driver_id']);
        });
    }
};