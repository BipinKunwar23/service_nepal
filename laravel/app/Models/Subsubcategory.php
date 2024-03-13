<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subsubcategory extends Model
{
    use HasFactory;
    protected $table='subsubcategories';
    public $fillable = ['name', 'subcategory_id', 'keywords'];

}
