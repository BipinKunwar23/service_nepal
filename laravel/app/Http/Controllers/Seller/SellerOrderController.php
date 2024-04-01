<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\AllCustomerOrdersResource;
use App\Http\Resources\OrderDetailResource;
use App\Mail\EmailSend;
use App\Models\Order;
use App\Models\Standard;
use App\Notifications\Order as NotificationsOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class SellerOrderController extends Controller
{
    //
    public function getAllReceivedOrders()
    {

        $orders = Order::whereHas('services', function ($query) {
            $query->where('user_id', Auth::user()->id);
        })->with(['services.option', 'customers'])->orderBy('created_at', 'desc')->get();
        if ($orders) {
            return AllCustomerOrdersResource::collection($orders);
        }
    }
    public function getCostByDay()
    {
        //         $mailData=[
        //             'title'=>"Mail from ProHome",
        //             'body'=>"Bipin Kunwar has send you an order .please visit our site prohome.com"
        //         ];

        //         Mail::to('bipinkunwar23@gmail.com')->send(new EmailSend($mailData));

        //   dd("successfully addes");
        $thirtyDaysAgo = Carbon::now()->subDays(30);


        $orderData = Order::where('status', 'Completed')->selectRaw('DATE(created_at) as date, SUM(cost) as price ')
            ->whereDate('created_at', '>=', $thirtyDaysAgo)
            ->groupBy('date')
            ->get();

        $formattedData = [];

        foreach ($orderData as $order) {
            $timestamp = strtotime($order->date) * 1000; // Convert date to timestamp in milliseconds
            $price = (float) $order->price; // Cast price to float
            $formattedData[] = [$timestamp, $price]; // Push timestamp and price to the formatted data array
        }

        return $formattedData;
    }

    public function viewOrderReceived($orderId)
    {


        $package = Order::find($orderId)->package;
        if ($package) {
            $order = Order::with(['customers.profile', 'services', 'services.option', 'services.service', 'services.packages' => function ($query) use ($package) {
                $query->where('package', $package)->first();
            }, 'services.packages.standards', 'services.description'])->find($orderId);
            $standard = Standard::where('option_id', $order->services->option_id)->with('values')
                ->get();
            $order->services->standards = $standard;
            return response()->json($order);
        }

        $order = Order::with(['customers.profile', 'services', 'services.option', 'services.description', 'services.service'])->find($orderId);

        return response()->json($order);
    }



    public function AcceptOrder($orderId)
    {
        $order = Order::find($orderId);

        if ($order) {
            $order->update(['status' => 'Active']);
        }
        $mailData = [
            'title' => "Mail from ProHome",
            'body' => "Bipin Kunwar has send you an order .please visit our site prohome.com"
        ];
        $email = $buyer->email;


        $mailData = [
            'from' => Auth::user()->email,
            'title' => "Mail from Bipin Kunwar",
            'body' => "Thank you for choosing [Seller's Name] for your home project needs. We are excited to begin working with you and ensure a smooth and satisfactory experience.

                        Below, please find the details of your order along with important information regarding our collaboration:",
        ];

        Mail::to($email)->send(new EmailSend($mailData));
        return response()->json(
            "susscessfully Accepted"
        );
        
    }


    public function CancelOrder($orderId)
    {
        Order::find($orderId)->update(['status' => 'Cancelled']);

        return response()->json(
            "susscessfully cancelled"
        );
    }
    public function CompleteOrder($orderId)
    {
        Order::find($orderId)->update(['status' => 'Completed']);

        return response()->json(
            "susscessfully Completed"
        );
    }
    public function DeleteOrder($orderId)
    {
        Order::find($orderId)->delete();

        return response()->json(
            "susscessfully Completed"
        );
    }
}
