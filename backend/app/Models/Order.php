<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $fillable=['user_id','service_id','date','emergency','delay','scopes','location','service','size','name','response','email','number'];

    protected $casts=[
        'scopes'=>'array',
        'emergency' => 'boolean',
    ];

    public function users(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function services(){
        return $this->belongsTo(Service::class,'service_id');
    }
    public function scopes(){
            return $this->belongsToMany(Scope::class,'order_scope');
    }
    public function images(){
        return $this->hasMany(OrderImage::class,'order_id');
    }

}
