<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerOrdersResource;
use App\Http\Resources\ViewCustomerOrderResource;
use App\Mail\EmailSend;
use App\Models\OptionUser;
use App\Models\Order;
use App\Models\OrderImage;
use App\Models\Standard;
use App\Models\User;
use App\Notifications\Order as NotificationsOrder;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

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
      

        $service = OptionUser::find($serviceId);
        $sellerId = $service->user_id;
        $seller = User::find($sellerId);
        $buyer=Auth::user();
        $data = [
            'user' => $buyer->name,
            'photo' => $buyer->profile->photo,
            'subject' => 'has sent you an order',
            'service' => $service->option->name
        ];
        $seller->notify(new NotificationsOrder($data));
        $mailData = [
            'title' => "Mail from ProHome",
            'body' => "Bipin Kunwar has send you an order .please visit our site prohome.com"
        ];

        // Mail::to('bipinkunwar23@gmail.com')->send(new EmailSend($mailData));

        return response()->json([
            'message' => 'Your Order is Successfull'
        ]);
    }

    public function getAllOrders()
    {

        $orders = Order::where('customer_id', Auth::user()->id)->orderBy('created_at', 'desc')
            ->with(['services.option', 'services.user'])
            ->get();
        if ($orders) {
            return CustomerOrdersResource::collection($orders);
        }
    }

    public function viewOrder($orderId)
    {

        $package = Order::find($orderId)->package;

        $order = Order::with(['services.user.profile', 'services.option', 'services.packages' => function ($query) use ($package) {
            $query->where('package', $package)->first();
        }, 'services.packages.standards', 'services.galleries' => function ($query) {
            $query->first();
        }])->find($orderId);
        $standard = Standard::where('option_id', $order->services->option_id)->with('values')
            ->get();
        $order->services->standards = $standard;
        return response()->json($order);
    }
}
