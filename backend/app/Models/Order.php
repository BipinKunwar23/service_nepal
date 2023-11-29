<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $fillable=['user_id','service_id','date','time','duration','location','email','contact','description'];

    public function users(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function services(){
        return $this->belongsTo(Service::class,'service_id');
    }

}
