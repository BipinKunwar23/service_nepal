<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\OptionUser;
use App\Models\package;
use App\Models\ScopeUser;
use App\Models\User;
use App\Services\ServicesService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BuyerServiceController extends Controller
{
    protected $service;
    public function __construct(ServicesService $service)
    {
        $this->service = $service;
    }
    public function getAllServiceCards()
    {

        $services = OptionUser::with(['user:id,name', 'user.profile:id,user_id,photo','galleries'=>function($query){
            $query->select('id', 'service_id', 'image')->get();
         
        }])
            ->select('id', 'title', 'image','option_id', 'user_id',)
            ->latest()
            ->paginate(20);
        return response()->json($services);
    }


    public function getServiceDetails($serviceId)
    {
        $data = $this->service->viewServiceDetails($serviceId);
        return response()->json($data);
    }
    public function getServicePackage(Request $request, $serviceId)
    {
        $package=$request->input('name');
       $data= OptionUser::with(['packages'=>function($query) use($package){
        $query->where('package',$package)->first();
       },'packages.standards','galleries'=>function($query){
        $query->first();
       }])
       ->find($serviceId);
        return response()->json($data);
    }

    public function getRecommendedServices()
    {
        $query = OptionUser::query();

        //Recommend service by locaiton//
        $location = User::find(Auth::user()->id)->profile->address;

        $user = User::find(Auth::user()->id);

    
        if ($location) {


            $query->whereHas('user.locations', function ($query) use ($location, $user) {
                $matchingLocations = $user->locations()->where('city', 'LIKE', '%' . $location . '%')->exists();
                if ($matchingLocations) {

                    $query->where('locations.city', 'LIKE', '%' . $location . '%');
                }
            });
        }


        return $query->get();
        $services = $query->with(['user:id,name', 'user.profile:id,user_id,photo'])
            ->select('id', 'title', 'image', 'user_id',)
            ->latest()
            ->get();

        return response()->json($services);
    }
}
