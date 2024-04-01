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
        Schema::create('browse_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            // $table->unsignedBigInteger('subcategory_id');


            // $table->unsignedBigInteger('subsubcategory_id')->nullable();
            $table->unsignedBigInteger('service_id')->nullable();



            $table->foreign('user_id')->references('id')->on('users');
            // $table->foreign('category_id')->references('id')->on('categories');
            // $table->foreign('subcategory_id')->references('id')->on('subcategories');
            $table->foreign('service_id')->references('id')->on('services');


            // $table->foreign('subsubcategory_id')->references('id')->on('subsubcategories');
            $table->string('action_type');
            $table->string('search_query')->nullable();
            // $table->string('options_selected');



            // $table->integer('budget_range')->default(0)->nullable();
            // $table->integer('max_budget')->default(4000)->nullable();

            // $table->string('location')->default("all")->nullable();
            // $table->float('rating')->default(2.5)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('browse_history');
    }
};
