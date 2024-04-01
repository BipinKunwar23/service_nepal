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
        Schema::create('list_option_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('option_user_id');
            $table->unsignedBigInteger('list_id');

            $table->foreign('option_user_id')->references('id')->on('option_user');
            $table->foreign('list_id')->references('id')->on('lists');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_option_user');
    }
};
