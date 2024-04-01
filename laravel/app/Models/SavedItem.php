<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedItem extends Model
{
    use HasFactory;
    protected $table='saved_items';
    protected $fillable=['service_id','list_id'];

    public function list(){
        return $this->belongsTo(Lists::class,'list_id');
    }
}
