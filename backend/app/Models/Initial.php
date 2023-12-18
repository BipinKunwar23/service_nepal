<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Initial extends Model
{
    use HasFactory;
    public $fillable=['order_id','available_date','available_time','completion_date','durations','delays','delay_reason','delivery_charge','size','total','discount','additional','emergency','advance_payment','payment_method','payment_time','bank','account_name','account_no'];


}
