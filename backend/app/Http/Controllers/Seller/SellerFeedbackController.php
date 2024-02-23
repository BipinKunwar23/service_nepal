<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\Order;
use Illuminate\Http\Request;

class SellerFeedbackController extends Controller
{
    //
    public function crateServiceProvider(Request $request, $serviceId)
    {

        Feedback::updateOrCreate(
            [
                'customer_id' => $request->customerId,
                'service_id' => $serviceId,

            ],

            [
                'customer_id' => $request->customerId,
                'service_id' => $serviceId,
                'rating' => $request->rating,
            ]
        );

        return response()->json([
            'message' => 'successfuly added'
        ]);
    }

    public function reviewServiceProvider(Request $request, $providerId)
    {

        Feedback::updateOrCreate(
            [
                'customer_id' => $request->customerId,
                'provider_id' => $providerId,

            ],

            [
                'customer_id' => $request->customerId,
                'provider_id' => $providerId,
                'review' => $request->review,
            ]
        );
        return response()->json([
            'message' => 'successfuly added'
        ]);
    }

    public function calculateOverallRating($userId, $subcategoryId)
    {
        // Calculate overall rating directly in the database query
        $providers = Order::whereHas('providers', function ($query) use ($userId) {
            $query->where('id', $userId);
        })
            ->where('service_id', $subcategoryId)
            ->pluck('customer_id')->unique();
        $customersCounts = $providers->count();

        $ratedUser = Feedback::where('provider_id', $userId)
            ->selectRaw('COUNT(rating) as stars')

            ->first()
            ->stars;
        $notratesStars = 0;
        $notRatedUsers = 0;
        if ($customersCounts > $ratedUser) {
            $notRatedUsers = $customersCounts - $ratedUser;
            $notratesStars = $notRatedUsers * 1;
        }

        $starCounts = Feedback::where('provider_id', $userId)

            ->selectRaw('SUM(rating) as star_counts')
            ->first()
            ->star_counts;

            $overallRating = ($starCounts + $notratesStars) / ($ratedUser + $notRatedUsers);






        return intval($overallRating);
    }


  

    public function getAllFeedback($userId, $subcategoryId)
    {


        $feedbacks = Feedback::whereHas('provider', function ($query) use ($userId) {
            $query->where('id', $userId);
        })->with('customers.profile')->get();
        $overallRating = $this->calculateOverallRating($userId, $subcategoryId);
        // return $overallRating;
        return response()->json([
            'overall_stars'=>$overallRating,
            'feedbacks'=>$feedbacks
        ]);
    }
}
