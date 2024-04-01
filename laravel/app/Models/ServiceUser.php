<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ServiceUser extends Pivot
{
    use HasFactory;
    protected $table='service_user';
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    // public function category(){
    //     return $this->belongsTo(Category::class,'category_id');
    // }
    // public function subcategory(){
    //     return $this->belongsTo(Subcategory::class,'subcategory_id');
    // }
    public function service(){
        return $this->belongsTo(Service::class,'service_id');
    }
    // public function option(){
    //     return $this->belongsTo(Option::class,'option_id');
    // }

    public function packages(){
        return $this->hasMany(package::class,'service_id');
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
        return $this->hasMany(Feedback::class,'service_id');
    }
    public function orders(){
        return $this->hasMany(Order::class,'service_id');
    }
    public function standards(){
        return $this->belongsToMany(Standard::class,'service_user_standard','service_user_id','standard_id')->withPivot('value_id','package');
    }

    public function values(){
        return $this->belongsToMany(StandardValue::class,'service_user_standard','service_user_id','value_id');
    }
   
    public function lists(){
        return $this->belongsToMany(Lists::class,'list_service_user','service_user_id','list_id');

    }

}
