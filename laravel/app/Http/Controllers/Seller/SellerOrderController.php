<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\AllCustomerOrdersResource;
use App\Http\Resources\OrderDetailResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SellerOrderController extends Controller
{
    //
    public function getAllReceivedOrders()
    {

        $orders = Order::whereHas('services', function ($query){
            $query->where('user_id', Auth::user()->id);
        })->with(['services.scope','customers'])->orderBy('created_at', 'desc')->get();
        if ($orders) {
            return AllCustomerOrdersResource::collection($orders);
        }
    }

    public function viewOrderReceived($orderId)
    {
        $order = Order::whereHas('providers', function ($query) use ($orderId) {
            $query->where('id', Order::find($orderId)->provider_id);
        })
            ->with([
                'images',
                'services',
                'status',
                'providers.scopes' => function ($query) use ($orderId) {
                    $query->whereIn('scope_user.scope_id', function ($subquery) use ($orderId) {
                        $subquery->select('scope_id')
                            ->from('order_scope') // Adjust the pivot table name if needed
                            ->where('order_id', $orderId);
                    });
                },
                'scopes'
            ])

            ->find($orderId);


        return new OrderDetailResource($order);
    }



    public function AcceptOrder($orderId)
    {
        Order::find($orderId)->update(['status' => 'Accepted']);
        return response()->json(
            "susscessfully accepted"
        );
    }


    public function CancelOrder($orderId)
    {
        Order::find($orderId)->update(['status' => 'Cancelled']);

        return response()->json(
            "susscessfully cancelled"
        );
    }
}
