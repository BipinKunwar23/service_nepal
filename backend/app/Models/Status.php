<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;
    public $fillable=['order_id','isOrder','isOCancel','isAgreement','isACancel','isInitial','isICancel','isFinal','isFCancel','isProgress'];
}
