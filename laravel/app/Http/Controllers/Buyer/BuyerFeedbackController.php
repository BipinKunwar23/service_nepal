<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\Order;
use App\Services\RatingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BuyerFeedbackController extends Controller
{
    public $rating;
    public function __construct(RatingService $rating) {
        $this->rating = $rating;
    }

    public function reviewService(Request $request, $sellerId)
    {

        Feedback::create(

            [
                'buyer_id' => Auth::user()->id,
                'seller_id' => $sellerId,
                'stars' => $request->rating,
                'review' => $request->review,
            ]
        );
        return response()->json([
            'message' => 'successfuly added'
        ]);
    }

   




    public function getReviews($sellerId)
    {

        $feedbacks = Feedback::where('seller_id', $sellerId)
            ->with('users.profile')->latest()->get();
        $overallRating = $this->rating->calculateOverallRating($sellerId);
        // return $overallRating;
        return response()->json([
            'overall_stars' => $overallRating,
            'feedbacks' => $feedbacks
        ]);
    }
}
