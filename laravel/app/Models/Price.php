<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    use HasFactory;
    protected $fillable=['service_id','additional','delivery','emergency','refund'];
    protected $casts=[
        'additional'=>'array'
    ];

    public function packages(){
        return $this->hasMany(package::class,'price_id');
    }
}
