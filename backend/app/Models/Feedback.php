<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;
    protected $fillable=['service_id','customer_id','rating','review'];
    public $table='feedbacks';

    // public function services(){
    //   return  $this->hasOne(ScopeUser::class,'scope_user');
    // }
   
}
