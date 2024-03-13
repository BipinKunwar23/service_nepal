<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BuyerFeedbackController extends Controller
{

    public function reviewService(Request $request, $serviceId)
    {

        Feedback::create(

            [
                'buyer_id' => Auth::user()->id,
                'service_id' => $serviceId,
                'stars' => $request->rating,
                'review' => $request->review,
            ]
        );
        return response()->json([
            'message' => 'successfuly added'
        ]);
    }

    public function calculateOverallRating($serviceId)
    {
        $overallRating = Feedback::where('service_id', $serviceId)
            ->selectRaw('AVG(stars) as stars')
            ->first();
            if ($overallRating) {
                // Convert the stars value to a fixed decimal value with one decimal place
                $fixedDecimalValue = number_format($overallRating->stars, 1);
                
                return $fixedDecimalValue;
            }
    }




    public function getReviews($serviceId)
    {

        $feedbacks = Feedback::where('service_id', $serviceId)
            ->with('users.profile')->get();
        $overallRating = $this->calculateOverallRating($serviceId);
        // return $overallRating;
        return response()->json([
            'overall_stars' => $overallRating,
            'feedbacks' => $feedbacks
        ]);
    }
}
