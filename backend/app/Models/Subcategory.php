<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Service;
use App\Models\Category;

class Subcategory extends Model
{
    // protected $table='subcategories';
    use HasFactory;
    public $fillable = ['name', 'category_id', 'description', 'keywords','icons'];
  

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }
    public function locations()
    {
        return $this->hasMany(Location::class,'subcategory_id');
    }
    public function users(){
        return $this->belongsToMany(User::class,'subcategory_user');
    }
}
