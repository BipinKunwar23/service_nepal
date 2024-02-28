<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\ScopeUser;
use App\Services\ServicesService;
use Illuminate\Http\Request;

class BuyerServiceController extends Controller
{
    protected $service;
    public function __construct(ServicesService $service) {
        $this->service = $service;
    }
    public function getAllServiceCards(){
    
        $services= ScopeUser::with(['user:id,name', 'user.profile:id,user_id,photo'])
        ->select('id', 'title', 'image', 'user_id',)
        ->latest()
        ->get();
        return response()->json($services);
    }

    public function getServiceDetails($serviceId){
        $data=$this->service->viewServiceDetails($serviceId);
        return response()->json($data);
    }
}
