<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Operation extends Model {
    use HasFactory;

    protected $fillable = [
        'directive_name',
        'details',
        'domain_type',
        'is_active',
        'execution_date',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
