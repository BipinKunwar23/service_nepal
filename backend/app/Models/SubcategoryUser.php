<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class SubcategoryUser extends Pivot
{
    use HasFactory;
    // protected $table='subcategory_user';
    protected $casts=[
        'available_cities'=>'array',
        'available_time'=>'array',
        'available_days'=>'array',

    ];
    
}
