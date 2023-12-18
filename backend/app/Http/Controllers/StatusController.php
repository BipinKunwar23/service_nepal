<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function AcceptOrder($orderId)
    {
        Status::where('order_id', $orderId)->update('isOrder', true);
    }

    public function CancelOrder($orderId)
    {
        Status::where('order_id', $orderId)->update('isOCancel', true);
    }
}
