<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class package extends Model
{
    use HasFactory;
    protected $table="packages";
    protected $fillable=['service_id','package','name','description','price'];

    public function standards(){
        return $this->belongsToMany(Standard::class,'package_standard','package_id','standard_id')->withPivot('value_id');
    }
    public function service(){
        return $this->belongsTo(OptionUser::class,'service_id');
    }
}
