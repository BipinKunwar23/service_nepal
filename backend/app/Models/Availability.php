<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    use HasFactory;
    public $fillable=['user_id','days','cities','time'];
    protected $casts=[
        'days'=>'array',
        'cities'=>'array',
        'time'=>'array',
     


    ];

}
