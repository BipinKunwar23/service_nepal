<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScopeResource;
use App\Models\Order;
use App\Models\Scope;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;

class OrderScopeController extends Controller
{
    public function create (Request $request, $orderId){
        $order = Order::find($orderId);
        $data = $request->all();
      
            $order->scopes()->sync($data);

            return response()->json([
                'message' => 'successflully created'
            ]);
    }

    public function showByProviderOrder($orderId,$providerId){
      $orders=Order::find($orderId)->scopes->pluck('id');
      $scopes=User::find($providerId)->scopes->whereIn('id',$orders);
      return ScopeResource::collection($scopes);
    }
}
