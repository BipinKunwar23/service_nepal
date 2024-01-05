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
        Schema::create('progresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->references('id')->on('orders');
            $table->string('current_status', 50);
            $table->date('expected_completion')->nullable();
            $table->json('upcoming_works')->nullable();
            $table->string('delivery_charge')->nullable();
            $table->string('emergency_charge')->nullable();
            $table->string('discount')->nullable();

            $table->string('additional_charge')->nullable();
            $table->json('payment_method')->nullable();
            $table->string('qrcode')->nullable();
            $table->string('esewa')->nullable();
            $table->string('total_cost')->nullable();
            $table->string('paid_amount')->nullable();
            $table->date('payment_due_date')->nullable();
            $table->string('service_delay')->nullable();

            $table->string('delay_reason')->nullable();
            $table->string('image')->nullable();
            $table->string('additional_notes')->nullable();
            $table->string('issue_challenge')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progresses');
    }
};
