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
        Schema::create('service_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');     
            $table->unsignedBigInteger('service_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('service_id')->references('id')->on('services');
            $table->text('description')->nullable()->default(null);
            $table->string('time')->nullable();
            $table->json('days')->nullable();
            $table->string('currency',40)->nullable();
            $table->string('cities')->nullable();
            $table->string('additional_info')->nullable();
            $table->string('experience')->nullable();
            $table->string('experience_certificate')->nullable();
            $table->string('trainings')->nullable();
            $table->string('training_certificate')->nullable();
            $table->string('projects')->nullable();
            $table->string('project_certificate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_user');
    }
};
