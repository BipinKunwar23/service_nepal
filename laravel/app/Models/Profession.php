<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profession extends Model
{
    use HasFactory;
    public $fillable=['user_id','occupation','skills','education','training','experience','certificate','description'];
    protected $casts=[
        'skills'=>'array',
        'education'=>'array',
        'training'=>'array',
        'experience'=>'array',
        'certificate'=>'array',



    ];

    public function occupation(){
        return $this->belongsTo(Category::class,'occupation');
    }


    public function user(){
        return $this->belongsTo(Profession::class,'user_id');
    }
}
