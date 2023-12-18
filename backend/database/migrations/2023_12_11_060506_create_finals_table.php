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
        Schema::create('finals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->references('id')->on('orders');
            $table->string('material')->nullable();
            $table->string('payment_condition')->nullable();
            $table->string('prerequisites')->nullable();
            $table->string('confirm_time', 30,)->nullable();
            $table->string('response_time', 30)->nullable();
            $table->string('status_time', 30)->nullable();
            $table->string('acheivement')->nullable();
            $table->string('limitation')->nullable();
            $table->string('risks')->nullable();
            $table->string('waranty')->nullable();
            $table->string('refund')->nullable();
            $table->string('refund_amount')->nullable();
            $table->string('reference_name')->nullable();
            $table->string('reference_contact')->nullable();







            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finals');
    }
};
