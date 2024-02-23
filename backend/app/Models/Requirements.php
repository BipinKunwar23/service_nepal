<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requirements extends Model
{
    use HasFactory;
    protected $table='requirements';
    protected $fillable=['service_id','buyer','material','note','payment_term','service_term'];
    protected $casts=[
        'buyer'=>'array',
        'material'=>'array'
    ];
}
