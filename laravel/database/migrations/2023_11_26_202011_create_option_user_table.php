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
        Schema::create('option_user', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('option_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade')->onUpdate('cascade');


            $table->string('title');
            $table->string('keywords');
           
            $table->string('status')->default('draft');



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('option_user');
    }
};
