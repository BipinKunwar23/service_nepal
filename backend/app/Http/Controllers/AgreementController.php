<?php

namespace App\Http\Controllers;

use App\Models\Finals;
use App\Models\Initial;
use App\Models\Order;
use App\Models\Status;
use Illuminate\Http\Request;

class AgreementController extends Controller
{
    public function initialAgreement(Request $request, $orderId)
    {
        $collection = collect($request->all())->put('order_id', $orderId)->all();
        Initial::create($collection);
        Status::where('order_id', $orderId)->update(['isInitial' => true]);
        return response()->json([
            'message' => 'Initial agreement successfull',
        ]);
    }
    public function finalAgreement(Request $request, $orderId)
    {
        $collection = collect($request->all())->put('order_id', $orderId)->all();
        Finals::create($collection);
        Status::where('order_id', $orderId)->update(['isFinal' => true]);

        return response()->json([
            'message' => 'Final agreement successfull',
        ]);
    }

    public function viewInitialAgreement($orderId)
    {
        $initial = Initial::where('order_id', $orderId)->first();
        return response()->json($initial);
    }

    public function viewFinalAgreement($orderId)
    {
        $final = Finals::where('order_id', $orderId)->first();
        return response()->json($final);
    }
    public function AcceptInitialAgreement($orderId)
    {
        Status::where('order_id', $orderId)->update(['isIAccept' => true]);

        return response()->json(
            "susscessfully cancelled"
        );
    }
}
