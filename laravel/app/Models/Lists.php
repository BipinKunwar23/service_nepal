<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lists extends Model
{
    use HasFactory;
    protected $table='lists';
    protected $fillable=['user_id','name','description'];

    public function services(){
        return $this->belongsToMany(OptionUser::class,'list_option_user','list_id','option_user_id');

    }

}
