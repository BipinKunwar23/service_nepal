<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProviderResource;
use App\Models\BrowseHistory;
use App\Models\Description;
use App\Models\Feedback;
use App\Models\Location;
use App\Models\Option;
use App\Models\OptionUser;
use App\Models\package;
use App\Models\Price;
use App\Models\Scope;
use App\Models\ScopeUser;
use App\Models\Service;
use App\Models\User;
use App\Services\ServicesService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use React\Http\Browser;

class FilterSearchController extends Controller
{
    public $services;
    public function __construct(ServicesService $services)
    {
        $this->services = $services;
    }
    public function searchService(Request $request)
    {
        $search = $request->input('name');
        $services = Service::has('users')->where('name', 'LIKE', $search . '%')->distinct()
            ->get();
        return $services;
    }

    public function getSearchList($keyword)
    {
        $services = OptionUser::where('keywords', 'LIKE', '%' . $keyword . '%')
            ->orwhereHas('service', function ($query) use ($keyword) {
                $query->where('keywords', 'like', '%' . $keyword . '%');
            })

            ->orWhereHas('service.subcategory', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('service.subcategory.category', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            })
            ->select('keywords')->distinct()->get();
        return response()->json($services);
    }







    public function getSearchedServices(Request $request)
    {
        $keyword = $request->input('service');



        $service = OptionUser::where('status', "Active")->where('keywords', 'like', '%' . $keyword . '%')

            ->orwhereHas('service', function ($query) use ($keyword) {
                $query->where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('service.subcategory', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('service.subcategory.category', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            });
        $data = $this->services->getBuyerServiceCards($service)->paginate(20);
        return response()->json($data);
    }

    public function getFilterTypes($serviceId)
    {
      


        $data = OptionUser::whereHas('service', function ($query) use ($serviceId) {
            $query->where('id', $serviceId);
        })->where('status', 'Active');

        $user = User::whereHas('options', function ($query) use ($serviceId) {
            $query->where('option_user.service_id', $serviceId);
        })->pluck('id');

        $location = Location::whereHas('users', function ($query) use ($user) {
            $query->whereIn('id', $user);
        })
            ->select('city')->distinct()->get();

        $options = Option::whereHas('service', function ($query) use ($serviceId) {
            $query->where('id', $serviceId);
        })
            ->select('id', 'name')


            ->get();

        $optionId = $data->pluck('id');
        $service = Service::find($serviceId);
        if ($service->type === "general") {
            $budget = package::whereHas('service', function ($query) use ($optionId) {
                $query->where('status', 'Active')->whereIn('id', $optionId);
            })
                ->selectRaw('MIN(price) as min, AVG(price) as mid, MAX(price) as max')
                ->get();
        } else {
            $budget = Description::whereHas('service', function ($query) use ($optionId) {
                $query->where('status', 'Active')->whereIn('id', $optionId);
            })

                ->selectRaw('MIN(price) as min, AVG(price) as mid, MAX(price) as max')
                ->get();
        }
        $minPrice = $budget[0]->min;
        $midPrice = intval($budget[0]->mid);
        $maxPrice = $budget[0]->max;

        // Compute quartiles (Q1, Q2 (median), Q3)
        $q1 = $minPrice + 0.25 * ($midPrice - $minPrice); // Q1
        $q3 = $midPrice + 0.25 * ($maxPrice - $midPrice);

        $rating=Feedback::whereHas('seller',function($query) use($serviceId){
            $query->whereHas('options',function($query) use($serviceId){
                $query->where('option_user.service_id',$serviceId);
            });
        })
        ->selectRaw('COUNT(stars) as count, stars')
            ->groupBy('stars')
        ->get();

        return response()->json(
            [
                'options' => $options,
                'locations' => $location,
                'budget' => [
                    'low' => $q1,
                    'high' => $q3,
                ],
                'rating'=>$rating
            ]
        );
    }



    public function getfilteredService(Request $request, $serviceId)
    {

         $type=Service::find($serviceId)->type;

        if (!$request->all()) {
            BrowseHistory::create([
                'service_id' => $serviceId,
                'user_id' => Auth::user()->id,
                'action_type' => 'view'
            ]);
        }



        $query = OptionUser::query();

        $query->whereHas('service', function ($query) use ($serviceId) {
            $query->where('id', $serviceId);
        })->where('status', 'Active');



        $query->when($request->has('type'), function ($query) use ($request) {
            $query->whereHas('option', function ($query) use ($request) {
                $query->whereIn('name',  explode(',', $request->input('type')));
            });
        })

            ->when($request->has('city'), function ($query) use ($request) {
                $query->whereHas('user.locations', function ($query) use ($request) {

                    $query->where('locations.city', $request->input('city'));
                });
            })
            ->when($request->has('rating'), function ($query) use ($request) {
                $query->whereHas('user.feedbacks', function ($query) use ($request) {
                  
                    $query->whereIn('stars',explode(',', $request->input('rating')));
                });
            })
            ->when($request->has('price'), function ($query) use ($request, $type ) {
                if($type==="general"){
                    $query->whereHas('packages', function ($query) use ($request) {
                        $types = $request->input('price');
                        $typeArray = explode(',', $types);
                        if ($typeArray[0] === 'low') {
    
                            $query->where('price', '<=', $typeArray[1]);
                        }
                        if ($typeArray[0] === 'mid') {
    
                            $query->where('price', '>=', $typeArray[1])->where('price', '<=', $typeArray[2]);
                        }
    
                        if ($typeArray[0] === 'high') {
    
                            $query->where('price', '>=', $typeArray[1]);
                        }
                        if ($typeArray[0] === 'custom') {
    
                            $query->where('price', '>=', $typeArray[1])->where('price', '<=', $typeArray[2]);
                        }
                    });

                }
                else {
                    $query->whereHas('description', function ($query) use ($request) {
                        $types = $request->input('price');
                        $typeArray = explode(',', $types);
                        if ($typeArray[0] === 'low') {
    
                            $query->where('price', '<=', $typeArray[1]);
                        }
                        if ($typeArray[0] === 'mid') {
    
                            $query->where('price', '>=', $typeArray[1])->where('price', '<=', $typeArray[2]);
                        }
    
                        if ($typeArray[0] === 'high') {
    
                            $query->where('price', '>=', $typeArray[1]);
                        }
                        if ($typeArray[0] === 'custom') {
    
                            $query->where('price', '>=', $typeArray[1])->where('price', '<=', $typeArray[2]);
                        }
                    });
                }
            });

        $services = $this->services->getBuyerServiceCards($query)->paginate(20);




        return response()->json($services);
    }
}
