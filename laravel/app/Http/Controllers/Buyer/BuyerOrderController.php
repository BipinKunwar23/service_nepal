<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerOrdersResource;
use App\Http\Resources\ViewCustomerOrderResource;
use App\Models\Order;
use App\Models\OrderImage;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

class BuyerOrderController extends Controller
{
    public function placeOrder(Request $req, $serviceId)
    {
        Order::create([

            'customer_id' => Auth::user()->id,
            'service_id' => $serviceId,
            'delivery_city' => $req->delivery_city,
            'contact_number' => $req->contact_number,
            'service_date' => $req->service_date,
            'package' => $req->package,
            'quantity' => $req->quantity,
            'cost' => $req->cost,


            // 'emergency' => filter_var($req->emergency, FILTER_VALIDATE_BOOLEAN)


        ]);

        return response()->json([
            'message' => 'Your Order is Successfull'
        ]);
    }

    public function getAllOrders()
    {
        $orders = Order::where('customer_id', Auth::user()->id)->orderBy('created_at', 'desc')
            ->with(['services.options','services.user'])
            ->get();
        // return $orders;
        if ($orders) {
            return CustomerOrdersResource::collection($orders);
        }
        return $orders;
    }

    public function viewOrder($orderId)
    {


        $order = Order::whereHas('providers', function ($query) use ($orderId) {
            $query->where('id', Order::find($orderId)->provider_id);
        })
            ->with([
                'images',
                'services',
                'providers.profile',
                'status',
                'providers.scopes' => function ($query) use ($orderId) {
                    $query->whereIn('scope_user.scope_id', function ($subquery) use ($orderId) {
                        $subquery->select('option_id')
                            ->from('order_scope') // Adjust the pivot table name if needed
                            ->where('order_id', $orderId);
                    });
                },
                'scopes'
            ])

            ->find($orderId);
        // return $order;

        return new ViewCustomerOrderResource($order);
    }
}
