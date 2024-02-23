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
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('price_id');
            $table->foreign('price_id')->references('id')->on('prices');
            $table->string('package');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('price')->nullable();
            $table->string('size')->nullable();
            $table->string('numbers')->nullable();
            $table->string('materials')->nullable();
            $table->string('revision')->nullable();
            $table->string('finishing')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
