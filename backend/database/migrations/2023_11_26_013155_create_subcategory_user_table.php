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
        Schema::create('subcategory_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');     
            $table->unsignedBigInteger('subcategory_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('subcategory_id')->references('id')->on('subcategories');
            $table->string('profession');
            $table->string('description')->nullable();
            $table->json('available_time');
            $table->json('available_days');
            $table->json('available_cities');
            $table->date('available_date');
            $table->string('special_availability')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_structure')->nullable();
            $table->string('payment_instructions')->nullable();

            $table->string('currency_symbol');
            $table->string('delivery_method')->nullable();
            $table->string('delivery_charge')->nullable();
            
            $table->string('education')->nullable();
            $table->string('experience')->nullable();
            $table->string('training')->nullable();
            $table->string('project')->nullable();
            $table->string('limitation')->nullable();
            $table->string('terms')->nullable();
            $table->string('measures')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subcategory_user');
    }
};
