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
        Schema::table('reservations', function (Blueprint $table) {
            $table->decimal('daily_rate', 12, 2)->change();
            $table->decimal('subtotal', 14, 2)->change();
            $table->decimal('tax_amount', 12, 2)->change();
            $table->decimal('discount_amount', 12, 2)->change();
            $table->decimal('total_amount', 14, 2)->change();
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->decimal('amount', 14, 2)->change();
            $table->decimal('refunded_amount', 14, 2)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->decimal('daily_rate', 8, 2)->change();
            $table->decimal('subtotal', 10, 2)->change();
            $table->decimal('tax_amount', 8, 2)->change();
            $table->decimal('discount_amount', 8, 2)->change();
            $table->decimal('total_amount', 10, 2)->change();
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->decimal('amount', 10, 2)->change();
            $table->decimal('refunded_amount', 10, 2)->change();
        });
    }
};
