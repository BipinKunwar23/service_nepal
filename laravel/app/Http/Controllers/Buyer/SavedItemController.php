<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\OptionUser;
use App\Models\SavedItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavedItemController extends Controller
{
    public function addFavourite($serviceId)
    {
        SavedItem::create([
            'user_id' => Auth::user()->id,
            'service_id' => $serviceId,
            'saved_items_id' => 2
        ]);

        return response()->json('successfully added');
    }
    public function addWishList($serviceId)
    {
        SavedItem::create([
            'user_id' => Auth::user()->id,
            'service_id' => $serviceId,
            'saved_items_id' => 1

        ]);

        return response()->json('successfully added');
    }
    public function getSavedItems($serviceId)
    {
        $services = OptionUser::whereHas('saved_items', function ($query) {
            $query->where('user_id', Auth::user()->id);
        })->with(['user:id,name', 'user.profile:id,user_id,photo', 'galleries' => function ($query) {
            $query->select('id', 'service_id', 'image')->get();
        }])
            ->select('id', 'title', 'image', 'option_id', 'user_id',)
            ->latest()
            ->paginate(20);
        return response()->json($services);


        return response()->json('successfully added');
    }
}
