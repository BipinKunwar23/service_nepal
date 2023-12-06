<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scope extends Model
{
    use HasFactory;

    public $fillable=['name'];

    public function users(){
        return $this->belongsToMany(User::class,'scope_user');
    }
    public function services(){
        return $this->belongsTo(Service::class,'service_id');
    }
    public function orders(){
        return $this->belongsTo(Order::class,'order_scope');
    }
}
