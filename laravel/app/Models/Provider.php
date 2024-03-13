<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Catservice;
use App\Models\Category;
use App\Models\catservice_provider;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\ProviderCatservice;

class Provider extends Model
{
    use HasFactory;
    use HasApiTokens;
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($user) {
            $user->password = Hash::make($user->password);
        });
    }
    public $fillable=['first_name','last_name','middle_name','email','password','address','phone_number','gender','is_active','profile','bio'];

    protected $casts=[
        'address'=>'array'
    ];
    public function catservices(){
        return  $this->belongsToMany(CatService::class,'catservice_provider');
    }
   
    
}
