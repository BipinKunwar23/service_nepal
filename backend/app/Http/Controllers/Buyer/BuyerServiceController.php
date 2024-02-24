<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\ScopeUser;
use Illuminate\Http\Request;

class BuyerServiceController extends Controller
{
    public function getAllServiceCards(){
    
        $services= ScopeUser::with(['user:id,name', 'user.profile:id,user_id,photo'])
        ->select('id', 'title', 'image', 'user_id',)
        ->latest()
        ->get();
        return response()->json($services);
    }

    public function getServiceDetails(){
        
    }
}
