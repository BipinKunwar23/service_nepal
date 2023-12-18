<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Finals extends Model
{
    use HasFactory;
    public $table="finals";
    public $fillable=['order_id','material','payment_condition','prerequisites','confirm_time','response_time','status_time','acheivement','limitation','risks','waranty','refund','refund_amount','reference_name','reference_contact'];
}
