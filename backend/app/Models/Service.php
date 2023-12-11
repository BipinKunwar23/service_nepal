<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Subcategory;
class Service extends Model
{
    use HasFactory;
    public $fillable = ['name', 'description', 'image','icons', 'subcategory_id','keywords','units'];
   
    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class,'subcategory_id');
    }
    public function users()
    {
        return $this->belongsToMany(User::class)
        ->withPivot('description', 'days', 'time',  'experience', 'cities');
    }
    public function scopes(){
        return $this->hasMany(Scope::class);
    }
    public function images(){
        return $this->hasMany(Image::class,'service_id');
    }
    public function orders(){
        return $this->hasMany(Order::class,'service_id');
    }
}
