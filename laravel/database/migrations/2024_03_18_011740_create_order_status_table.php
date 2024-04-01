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
        Schema::create('order_status', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->string('current_status', 50)->nullable();
            $table->date('expected_completion')->nullable();
            $table->string('duration')->nullable();

            $table->string('discount')->nullable();
            $table->string('requirements')->nullable();


            $table->string('payment_schedule')->nullable();

            $table->string('advance_payment')->nullable();

            $table->string('service_delay')->nullable();

            $table->string('delay_reason')->nullable();
            $table->string('note')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_status');
    }
};
