<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qualification extends Model
{
    use HasFactory;
    public $fillable=['education','special_degree','profession','skills','training','expertise','experience','projects','recent_workshop','prvious_work','researches','certification','license','gallery','provider_id'];

    public $casts=[
    'education'=>'array',
    'special_degree'=>'array',
    'skills'=>'array',
    'training'=>'array',
    'expertise'=>'array',
    'experience'=>'array',
    'projects'=>'array',
    'recent_workshop'=>'array',
    'prvious_work'=>'array',
    'researches'=>'array',
    'gallery'=>'array'];
}
