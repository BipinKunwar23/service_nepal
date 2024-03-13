<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Standard extends Model
{
    use HasFactory;
    public function values(){
        return $this->hasMany(StandardValue::class,'standard_id');
    }
}
