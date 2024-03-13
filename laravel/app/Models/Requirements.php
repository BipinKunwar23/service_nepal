<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requirements extends Model
{
    use HasFactory;
    protected $table='requirements';
    protected $fillable=['service_id','term','note'];
    protected $casts=[
        'term'=>'array',
    ];
}
