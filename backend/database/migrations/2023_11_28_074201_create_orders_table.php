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

            $table->foreign('customer_id')->references('id')->on('users');
            $table->foreign('service_id')->references('id')->on('scope_user');
            $table->string('delivery_city');



            $table->string('contact_number', 12);
            $table->date('service_date');
            $table->date('quantity');
            $table->date('cost');
            $table->string('package', 20);
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
