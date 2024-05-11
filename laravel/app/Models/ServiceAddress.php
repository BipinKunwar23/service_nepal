<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceAddress extends Model
{
    use HasFactory;
    protected $table='service_address';
    public $fillable = ['user_id','location_id', 'name', 'email', 'address', 'scheduled_date','phone_number'];
    public function orders()
    {
        return $this->hasMany(Order::class,'address_id');
    }

}
