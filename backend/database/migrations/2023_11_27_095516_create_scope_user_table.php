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
        Schema::create('scope_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');     
            $table->unsignedBigInteger('scope_id');
            $table->unsignedBigInteger('service_id');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('scope_id')->references('id')->on('scopes');
            $table->foreign('service_id')->references('id')->on('services');
            
            $table->decimal('price',8,2);
            $table->string('unit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scope_user');
    }
};
