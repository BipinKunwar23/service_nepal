<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerOrdersResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function placeOrder(Request $req, $customerId,$serviceId)
    {

        
      $messge=  Order::create([

            'user_id' => $customerId,
            'service_id'=>$serviceId,
            'date' => $req->date,
            'time' => $req->time,

            'duration' => $req->duration,
            'location' => $req->location,
            'email'=>$req->email,
            'contact' => $req->number,
            'description' => $req->description,

        ]);
        if($messge){
            return response()->json([
                'message'=>'Successfully Created'
            ]);
        }
    }

    public function getOrders($customerId){
       $orders= Order::with('services')->where('user_id',$customerId)->orderBy('created_at', 'desc')->get();
       if($orders){
        return CustomerOrdersResource::collection($orders);
       }
        return $orders;

    }
}
