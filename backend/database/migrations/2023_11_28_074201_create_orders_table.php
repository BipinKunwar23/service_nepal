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
            $table->unsignedBigInteger('provider_id');
            $table->foreign('customer_id')->references('id')->on('users');
            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('provider_id')->references('id')->on('users');

            $table->date('service_date');
            $table->boolean('emergency');
            $table->string('max_delay')->nullable();
            $table->string('delivery_location');
            $table->string('service_detail')->nullable();
            $table->string('requirements')->nullable();


            $table->string('response_time')->nullable();

            $table->string('name', 40);
            $table->string('email');
            $table->string('number', 12);
            $table->boolean('accept_terms')->default(false);
            $table->string('status',30)->default("Pending");

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
