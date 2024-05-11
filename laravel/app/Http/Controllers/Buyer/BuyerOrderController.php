<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerOrdersResource;
use App\Http\Resources\ViewCustomerOrderResource;
use App\Mail\EmailSend;
use App\Models\Location;
use App\Models\OptionUser;
use App\Models\Order;
use App\Models\OrderImage;
use App\Models\ServiceAddress;
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


        $order = Order::create([

            'customer_id' => Auth::user()->id,
            'service_id' => $serviceId,
            'address_id' => $req->addressId,
            'package' => $req->package,
            'quantity' => $req->quantity,
            'cost' => $req->cost,


            // 'emergency' => filter_var($req->emergency, FILTER_VALIDATE_BOOLEAN)


        ]);

        $service = OptionUser::find($serviceId);
        $sellerId = $service->user_id;
        $seller = User::find($sellerId);
        $buyer = Auth::user();

        // $data = [
        //     'user' => $buyer->name,
        //     'photo' => $buyer->profile->photo? $buyer->profile->photo : null,
        //     'subject' => 'has sent you an order',
        //     'service' => $service->option->name
        // ];
        // $seller->notify(new NotificationsOrder($data));
        // $email = $service->user->email;

        // $mailData = [
        //     'from' => Auth::user()->email,
        //     'title' => "Required  for service " . $service->option->name,
        //     'service' => [
        //         'name' => $service->option->name,
        //         'image' => $service->description->image

        //     ],
        //     'order' => $order,

        //     'address' => $order->address
        // ];

        // Mail::to($email)->send(new EmailSend($mailData));


        return response()->json([
            'message' => 'Your Order is Successfull'
        ]);
    }
    public function saveServiceAddress(Request $req)
    {

        ServiceAddress::create([

            'user_id' => Auth::user()->id,
            'location_id' => $req->locationId,
            'name' => $req->name,
            'address' => $req->address,
            'email' => $req->email,


            'phone_number' => $req->phone_number,
            'scheduled_date' => $req->scheduled_date,




        ]);



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

    public function viewSellerLocation($sellerId)
    {
        $locations = Location::where('user_id', $sellerId)->select('id', 'city')->get();
        return response()->json($locations);
    }

    public function viewServiceAddress()
    {
        $address = ServiceAddress::where('user_id', Auth::user()->id)->latest()->first();
        if ($address) {

            return response()->json($address);
        }
        $user = User::with('profile')->find(Auth::user()->id);
        return response()->json(
            [
                'name' => $user->name,
                'email' => $user->email,
                'location' => $user->profile->address,
                'phone_number' => $user->profile->phone_number,

            ]
        );
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
