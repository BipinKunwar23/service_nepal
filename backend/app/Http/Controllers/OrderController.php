<?php

namespace App\Http\Controllers;

use App\Http\Resources\AllCustomerOrdersResource;
use App\Http\Resources\CustomerOrdersResource;
use App\Http\Resources\OrderDetailResource;
use App\Http\Resources\ProviderOrderProfileResource;
use App\Http\Resources\ScopeResource;
use App\Http\Resources\ViewCustomerOrderResource;
use App\Models\Order;
use App\Models\OrderImage;
use App\Models\Scope;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\UploadedFile;


use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function placeOrder(Request $req, $customerId, $serviceId, $providerId)
    {

        $order =  Order::create([

            'customer_id' => $customerId,
            'service_id' => $serviceId,
            'provider_id' => $providerId,

            'date' => $req->date,
            // 'emergency' => filter_var($req->emergency, FILTER_VALIDATE_BOOLEAN) ? 1 : 0,
            'emergency'=>(bool)$req->emergency,

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

        Status::create([
            'order_id'=>$order->id,
            'isAgreement'=>(bool) $req->isAgreement
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
                $data->order_id = $order->id;

                $data->save();
            }
        }

        return response()->json([
            'message' => 'Successfully Created'
        ]);
    }

    public function getCustomerOrders($customerId)
    {
        $orders = Order::with('services', 'providers.profile')->where('customer_id', $customerId)->orderBy('created_at', 'desc')->get();
        // return $orders;
        if ($orders) {
            return CustomerOrdersResource::collection($orders);
        }
        return $orders;
    }
    public function getReceivedOrders($providerId)
    {

        $orders = Order::whereHas('services.users', function ($query) use ($providerId) {
            $query->where('users.id', $providerId);
        })->with('services')->orderBy('created_at', 'desc')->get();
        if ($orders) {
            return AllCustomerOrdersResource::collection($orders);
        }
    }

    public function viewOrderReceived($orderId)
    {

        $order = Order::with('images', 'services','status')->find($orderId);

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
    public function viewCustomerOrder($orderId)
    {

        $order = Order::with(['images', 'services', 'providers.profile','status'])->find($orderId);
        $scope = $order->scopes;
        $users = User::with(['scopes' => function ($subquery) use ($scope) {
            $subquery->whereIn('scopes.id', $scope);
        }])->find($order->provider_id);
        return response()->json([
            'order' => new ViewCustomerOrderResource($order),
            'scopes' => ScopeResource::collection($users->scopes)
        ]);
    }


    public function AcceptOrder($orderId)
    {
        Status::where('order_id', $orderId)->update(['isOrder' => true]);
        return response()->json(
            "susscessfully accepted"
        );
    }

    public function CancelOrder($orderId)
    {
        Status::where('order_id', $orderId)->update(['isOCancel'=>true]);

        return response()->json(
            "susscessfully cancelled"
        );
    }
}
