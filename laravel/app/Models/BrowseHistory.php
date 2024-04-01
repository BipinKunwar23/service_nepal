<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrowseHistory extends Model
{
    use HasFactory;
    protected $table='browse_history';
    protected $fillable=['user_id','service_id','action_type','search_query'];

}
