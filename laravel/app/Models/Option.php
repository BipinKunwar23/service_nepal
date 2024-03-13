<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;
    protected $fillable=['service_id','name','keywords'];
    public function service(){
        return $this->belongsTo(Service::class,'service_id');
    }

}
