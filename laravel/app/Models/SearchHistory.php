<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchHistory extends Model
{
    use HasFactory;
    protected $table="searchhistory";
    protected $fillable=['user_id','service_id','subcategory_id','rating','min_budget','max_budget','location'];
}
