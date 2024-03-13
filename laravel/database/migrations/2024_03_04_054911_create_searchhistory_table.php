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
        Schema::create('searchhistory', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            // $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('subcategory_id');
            // $table->unsignedBigInteger('subsubcategory_id')->nullable();
            $table->unsignedBigInteger('service_id')->nullable();



            $table->foreign('user_id')->references('id')->on('users');
            // $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('subcategory_id')->references('id')->on('subcategories');
            $table->foreign('service_id')->references('id')->on('services');

            // $table->foreign('subsubcategory_id')->references('id')->on('subsubcategories');


            $table->integer('min_budget')->default(0);
            $table->integer('max_budget')->default(4000);

            $table->string('location')->default("all");
            $table->float('rating')->default(2.5);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('searchhistory');
    }
};
