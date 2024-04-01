<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OptionService extends Model
{
    use HasFactory;
    protected $table='option_service';
     protected $fillable=['service_id','description','price','image','note'];
}
