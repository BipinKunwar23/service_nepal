<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Mail\EmailSend;
use App\Models\Order;
use App\Models\OrderStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderStatusController extends Controller
{
    public function accept(Request $request, $orderId)
    {
        $status = OrderStatus::create([
            'order_id' => $orderId,
            'current_status' => $request->current_status,
            'expected_completion' => $request->expected_completion,
            'current_status' => 'Active',




            'discount' => $request->discount,
            'duration' => $request->duration,

            'requirements' => $request->requirements,


            'advance_payment' => $request->advance_payment,


            'note' => $request->note,

        ]);
        $order = Order::find($orderId);

        if ($order) {
            $order->update(['status' => 'Active']);
        }
        $email = $order->customers->email;
        $data = $status;

        $mailData = [
            'title' => "Mail from Bipin Kunwar",
            'body' => "Thank you for choosing [Seller's Name] for your home project needs. We are excited to begin working with you and ensure a smooth and satisfactory experience.

                        Below, please find the details of your order along with important information regarding our collaboration:",
            'data' => $status
        ];

        Mail::to($email)->send(new EmailSend($mailData));


        return response()->json([
            'message' => 'successfully created'
        ]);
    }
    public function completed(Request $request, $orderId)
    {
        $progress = OrderStatus::create([
            'order_id' => $orderId,
            'current_status' => $request->current_status,
            'expected_completion' => $request->expected_completion,



            'discount' => $request->discount,
            'requirements' => $request->requirements,


            'payment_method' => $request,
            'advance_payment' => $request->advance_payment,

            'service_delay' => $request->service_delay,
            'delay_reason' => $request->delay_reason,
            'note' => $request->additional_notes,

        ]);


        return response()->json([
            'message' => 'successfully created'
        ]);
    }
}
