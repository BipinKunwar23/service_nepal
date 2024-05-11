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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('address_id');

            $table->foreign('customer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('option_user')->onDelete('cascade');
            $table->foreign('address_id')->references('id')->on('service_address')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('quantity');
            $table->integer('cost');
            $table->string('package', 20)->nullable();
            $table->string('status', 30)->default("Pending");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
