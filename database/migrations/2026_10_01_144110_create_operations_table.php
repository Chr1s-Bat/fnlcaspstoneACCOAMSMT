<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('operations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('directive_name'); // e.g., Cease Order / Smuggling Intercept
            $table->text('details')->nullable();
            $table->enum('domain_type', ['Military', 'Smuggling', 'Psyop', 'Marketing', 'Trading']);
            $table->boolean('is_active')->default(true);
            $table->date('execution_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('operations');
    }
};
