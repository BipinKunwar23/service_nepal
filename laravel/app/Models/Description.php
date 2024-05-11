<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Description extends Model
{
    use HasFactory;
    protected $table='descriptions';
    protected $fillable=['service_id','description','price','image','note'];
    public function service(){
        return $this->belongsTo(OptionUser::class,'service_id');
    }
}
