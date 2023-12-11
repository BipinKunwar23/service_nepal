<?php

namespace App\Http\Controllers;

use App\Http\Resources\AllCustomerOrdersResource;
use App\Http\Resources\CustomerOrdersResource;
use App\Http\Resources\OrderDetailResource;
use App\Http\Resources\ScopeResource;
use App\Models\Order;
use App\Models\OrderImage;
use App\Models\Scope;
use App\Models\User;
use Illuminate\Http\UploadedFile;


use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function placeOrder(Request $req, $customerId, $serviceId)
    {


        $orders =  Order::create([

            'user_id' => $customerId,
            'service_id' => $serviceId,

            'date' => $req->date,
            'emergency' => filter_var($req->emergency, FILTER_VALIDATE_BOOLEAN) ? 1 : 0,

            'delay' => $req->delay,
            'location' => $req->location,
            'scopes' => $req->scopes,
            'service' => $req->service,
            'size' => $req->size,
            'response' => $req->response,
            'name' => $req->name,

            'email' => $req->email,
            'number' => $req->number,

        ]);

        $imageNames = [];
        if (isset($req->images)) {

            foreach ($req->images as $file) {

                if (isset($file) && $file instanceof UploadedFile) {

                    $extension = $file->getClientOriginalExtension();

                    $name = time() . '_' . uniqid() . '.' . $extension;

                    $file->move('order', $name);
                    $path = 'order/' . $name;

                    $imageNames[] = $path;
                }
            }
        }

        if (isset($imageNames)) {
            foreach ($imageNames as $image) {
                $data = new OrderImage();
                $data->name = $image;
                $data->order_id = $orders->id;

                $data->save();
            }
        }

        return response()->json([
            'message' => 'Successfully Created'
        ]);
    }

    public function getOrders($customerId)
    {
        $orders = Order::with('services')->where('user_id', $customerId)->orderBy('created_at', 'desc')->get();
        if ($orders) {
            return CustomerOrdersResource::collection($orders);
        }
        return $orders;
    }
    public function getProviderReceivedOrders($providerId)
    {

        $orders = Order::whereHas('services.users', function ($query) use ($providerId) {
            $query->where('users.id', $providerId);
        })->with('services')->orderBy('created_at', 'desc')->get();
        if ($orders) {
            return AllCustomerOrdersResource::collection($orders);
        }
    }

    public function viewOrderDetails($orderId)
    {
        
        $order = Order::with('images','services')->find($orderId);
       
        $scope = $order->scopes;
       
            $users = User::whereHas('services.orders', function ($query) use ($orderId) {
                $query->where('orders.id', $orderId);
            })->with(['scopes' => function ($subquery) use ($scope) {
                $subquery->whereIn('scopes.id', $scope);
            }])->first();
        

            return response()->json([
                'order' => new OrderDetailResource($order),
                'scopes' => ScopeResource::collection($users->scopes)
            ]);
        
    }
}
