<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profession extends Model
{
    use HasFactory;
    public $fillable=['user_id','occupation','skills','education','training','ceritificate'.'description'];
    protected $casts=[
        'skills'=>'array',
        'education'=>'array',
        'training'=>'array',
        'certificate'=>'array',
        'experience'=>'array',



    ];


    public function user(){
        return $this->belongsTo(Profession::class,'user_id');
    }
}
