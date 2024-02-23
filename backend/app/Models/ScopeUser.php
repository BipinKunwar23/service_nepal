<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ScopeUser extends Pivot
{
    use HasFactory;
    protected $table='scope_user';
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function category(){
        return $this->belongsTo(Category::class,'category_id');
    }
    public function subcategory(){
        return $this->belongsTo(Subcategory::class,'subcategory_id');
    }
    public function service(){
        return $this->belongsTo(Service::class,'service_id');
    }
    public function scope(){
        return $this->belongsTo(Scope::class,'scope_id');
    }

    public function prices(){
        return $this->hasOne(Price::class,'service_id');
    }
    public function faqs(){
        return $this->hasMany(FAQ::class,'service_id');
    }
    public function requirements(){
        return $this->hasOne(Requirements::class,'service_id');
    }
    public function galleries(){
        return $this->hasMany(gallery::class,'service_id');
    }
    public function ratings(){
        return $this->hasOne(Feedback::class,'service_id');
    }
}
