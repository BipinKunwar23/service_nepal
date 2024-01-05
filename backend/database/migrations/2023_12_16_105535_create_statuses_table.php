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
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->references('id')->on('orders');
            $table->boolean('isOrder')->default(false);
            $table->boolean('isOCancel')->default(false);
            $table->boolean('isOAccept')->default(false);

            $table->boolean('isCInitial')->default(false);
            $table->boolean('isPInitial')->default(false);
            $table->boolean('isInitial')->default(false);


            $table->boolean('isIAccept')->default(false);
            $table->boolean('isICancel')->default(false);

            $table->boolean('isCFinal')->default(false);
            $table->boolean('isPFinal')->default(false);
            $table->boolean('isFinal')->default(false);


            $table->boolean('isFAccept')->default(false);

            $table->boolean('isFCancel')->default(false);

            $table->boolean('IsProgress')->default(false);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statuses');
    }
};
