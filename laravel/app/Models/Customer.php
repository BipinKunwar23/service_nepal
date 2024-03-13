<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens as SanctumHasApiTokens;


class Customer extends Model
{
    use HasFactory;
    use SanctumHasApiTokens;
    

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($user) {
            $user->password = Hash::make($user->password);
        });
    }
    public $fillable=['first_name','last_name','email','address','password','phone_number','is_active'];

    protected $casts=[
        'address'=>'array'
    ];
}
