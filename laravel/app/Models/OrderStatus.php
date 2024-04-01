<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    use HasFactory;
    protected $table = 'order_status';
    public $fillable = [
        'order_id',
        'current_status',
        'expected_completion',
        'duration',
        'discount',
        'requirements',
        'payment_method',
        'payment_schedule',
        'advance_payment',
        'service_delay',
        'delay_reason',
        'note',





    ];
}
