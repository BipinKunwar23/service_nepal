<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $fillable = ['customer_id', 'service_id', 'provider_id', 'service_date', 'response_time', 'emergency', 'max_delay', 'delivery_location', 'service_detail', 'requirements', 'accept_terms','status', 'name', 'email', 'number'];

    protected $casts = [
        'emergency' => 'boolean',
    ];

    public function customers()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
    public function providers()
    {
        return $this->belongsTo(User::class, 'provider_id');
    }
    public function services()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
    public function scopes()
    {
        return $this->belongsToMany(Scope::class, 'order_scope')->withPivot('size');
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
