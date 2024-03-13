<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CatserviceUser extends Pivot
{
    use HasFactory;
    // protected $casts=[
    //     'days'=>'array',
    //     'time'=>'array',
    //     'charge'=>'array'
    // ];
}
