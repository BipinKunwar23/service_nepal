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
        Schema::create('progress_scope', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('progress_id');
            $table->unsignedBigInteger('scope_id');     
            $table->foreign('progress_id')->references('id')->on('progresses');
            $table->foreign('scope_id')->references('id')->on('scopes');
            $table->string('work')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progress_scope');
    }
};
