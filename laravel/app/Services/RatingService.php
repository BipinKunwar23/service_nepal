<?php

namespace App\Services;

use App\Models\Feedback;

class RatingService{

    public function calculateOverallRating($serviceId)
    {
        $overallRating = Feedback::where('seller_id', $serviceId)
            ->selectRaw('AVG(stars) as stars')
            ->first();
            if ($overallRating) {
                // Convert the stars value to a fixed decimal value with one decimal place
                $fixedDecimalValue = number_format($overallRating->stars, 1);
                
                return $fixedDecimalValue;
            }
    }

}