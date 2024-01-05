<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    use HasFactory;
    public $fillable = [
        'order_id',
        'current_status',
        'expected_completion',
        'upcoming_works',
        'delivery_charge',
        'emergency_charge',
        'additional_charge',
        'discount',
        'payment_method',
        'qrcode',
        'esewa',
        'total_cost',
        'paid_amount',
        'service_delay',
        'delay_reason',
        'issue_challenge',
        'image',
        'additional_notes',
      



    ];
    protected $casts = [
        'upcoming_works' => 'array',
        'payment_method' => 'array',

    ];
    public $table = 'progresses';

    public function orders()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
    public function works()
    {
        return $this->belongsToMany(Scope::class, 'progress_scope')->withPivot('work');
    }
    public function materials()
    {
        return $this->hasMany(Material::class, 'progress_id');
    }
}
