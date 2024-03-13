<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SearchHistory;
use Illuminate\Support\Facades\Auth;

class SearchHistoryController extends Controller
{

    public function createSearchRecord(Request $request, $serviceId)
    {
        $search = SearchHistory::create(
            [
                'user_id' => Auth::user()->id,
                'subcategory_id' => $serviceId,
                'min_budget' => $request->input('min_budget', 0),
                'max_budget' => $request->input('max_budget', 4000),
                'location' => $request->input('location', 'all'),
                'rating' => $request->input('rating', 2.5)
            ]
        );
        return response()->json($search->id);
    }
    public function upadatRating(Request $request, $searchId)
    {
        $search = SearchHistory::find($searchId);
        $search->update(['rating' => $request->rating]);
    }
    public function updateLocation(Request $request, $searchId)
    {
        $search = SearchHistory::find($searchId);
        $search->update(['location' => $request->rating]);
    }

    public function updateBudget(Request $request, $searchId)
    {
        $search = SearchHistory::find($searchId);
        $search->update(['min_budget' => $request->rating]);
    }
    // public function viewUserSearchHistory($subcategoryId){
    //     $searchResult=SearchHistory::where('subcategory_id',$subcategoryId)->where('')
    // }
}
