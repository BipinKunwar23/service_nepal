<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $table='notifications';
    protected $casts=[
        'data'=>'array'
    ];
public function sender(){
    return $this->belongsTo(User::class,'sender_id');
}
}
