<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;
    protected $fillable=['seller_id','buyer_id','stars','review'];
    public $table='feedbacks';

  
    public function users(){
        return  $this->belongsTo(User::class,'buyer_id');
      }
      public function seller(){
        return  $this->belongsTo(User::class,'seller_id');
      }
}
