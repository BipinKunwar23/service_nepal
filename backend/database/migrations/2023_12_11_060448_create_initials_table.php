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
        Schema::create('initials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->references('id')->on('orders');
            $table->date('available_date');
            $table->string('available_time',40);
            $table->date('completion_date');
            $table->string('durations',20);
            $table->string('delays',20);
            $table->string('delay_reason');
            $table->string('delivery_charge');
            $table->string('size');
            $table->string('total');
            $table->string('discount');
            $table->string('additional');
            $table->string('emergency');
            $table->string('advance_payment')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_time')->nullable();
            $table->string('bank')->nullable();
            $table->string('account_name')->nullable();
            $table->string('account_no')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('initials');
    }
};
