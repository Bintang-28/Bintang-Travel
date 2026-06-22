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
        Schema::create('vehicle_maintenances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_id')->constrained()->onDelete('cascade');
            $table->string('type');           // jenis perbaikan
            $table->text('description')->nullable();
            $table->decimal('cost', 12, 2);  // biaya
            $table->string('vendor')->nullable(); // nama bengkel
            $table->date('service_date');
            $table->date('next_service_date')->nullable();
            $table->integer('odometer_km')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_maintenances');
    }
};
