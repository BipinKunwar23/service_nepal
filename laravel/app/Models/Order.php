<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $fillable = ['customer_id', 'service_id', 'service_date', 'contact_number', 'delivery_city', 'package', 'quantity', 'cost','status'];



    public function customers()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
  
    public function services()
    {
        return $this->belongsTo(OptionUser::class, 'service_id');
    }

    public function images()
    {
        return $this->hasMany(OrderImage::class, 'order_id');
    }
    public function status()
    {
        return $this->hasOne(Status::class, 'order_id');
    }
    public function progress()
    {
        return $this->hasOne(Progress::class, 'order_id');
    }
}
