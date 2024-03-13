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
        Schema::create('subservice_standard', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('subservice_id');
            $table->foreign('subservice_id')->references('id')->on('subservices');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subservice_standard');
    }
};
