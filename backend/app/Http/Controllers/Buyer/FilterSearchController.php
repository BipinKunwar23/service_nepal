<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProviderResource;
use App\Models\Location;
use App\Models\package;
use App\Models\Price;
use App\Models\Scope;
use App\Models\ScopeUser;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FilterSearchController extends Controller
{
    public function searchService(Request $request)
    {
        $search = $request->input('name');
        $services = Service::has('users')->where('name', 'LIKE', $search . '%')->distinct()
            ->get();
        return $services;
    }

    public function getSearchList($keyword)
    {
        $services = ScopeUser::where('keywords', 'LIKE','%'. $keyword . '%')
            ->orwhereHas('service', function ($query) use ($keyword) {
                $query->where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('category', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('subcategory', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            })
            ->select('keywords')->distinct()->get();
        return $services;
    }







    public function getSearchedServices(Request $request)
    {
        $keyword = $request->input('service');



        $service = ScopeUser::where('keywords', 'like', '%' . $keyword . '%')

            ->orwhereHas('service', function ($query) use ($keyword) {
                $query->where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('category', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('subcategory', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            })

            ->with(['user:id,name', 'user.profile:id,user_id,photo'])
            ->select('id', 'title', 'image', 'user_id',)
            ->latest()
            ->get();
        return response()->json($service);
    }

    
    public function getFilterTypes($serviceId)
    {

        $data = ScopeUser::whereHas('service', function ($query) use ($serviceId) {
            $query->where('id', $serviceId);
        });


        $user = User::whereHas('scopes', function ($query) use ($serviceId) {
            $query->where('scopes.service_id', $serviceId);
        })->pluck('id');

        $location = Location::whereHas('users', function ($query) use ($user) {
            $query->whereIn('id', $user);
        })
            ->select('city')->distinct()->get();

        $types = Scope::whereHas('services', function ($query) use ($serviceId) {
            $query->where('id', $serviceId);
        })
            ->select('id', 'name')


            ->get();

        $scopeId = $data->pluck('id');
        $priceId = Price::whereIn('service_id', $scopeId)->pluck('id');
        $min = package::whereIn('price_id', $priceId)->where('package', 'basic')->min('price');
        $max = package::whereIn('price_id', $priceId)->where('package', 'premium')->max('price');

        return response()->json(
            [
                'types' => $types,
                'locations' => $location,
                'prices' => [
                    'min' => isset($min) ? $min : 0,
                    'max' => isset($max) ? $max : 0,

                ]
            ]
        );
    }



    public function getfilteredService(Request $request, $serviceId)
    {

        // $types = $request->input('price');
        // $typeArray = explode(',', $types);
        // return response()->json($typeArray);


        $query = ScopeUser::query();

        $query->whereHas('service', function ($query) use ($serviceId) {
            $query->where('id', $serviceId);
        });



        $query->when($request->has('type'), function ($query) use ($request) {
            $query->whereHas('scope', function ($query) use ($request) {
                $query->whereIn('name',  explode(',', $request->input('type')));
            });
        })

            ->when($request->has('city'), function ($query) use ($request) {
                $query->whereHas('user.locations', function ($query) use ($request) {

                    $query->where('locations.city', $request->input('city'));
                });
            })
            ->when($request->has('rating'), function ($query) use ($request) {
                $query->whereHas('ratings', function ($query) use ($request) {
                    $query->selectRaw('avg(stars) as avg_rating')
                        ->havingRaw('avg_rating >= ?', [$request->input('rating')]);
                });
            })
            ->when($request->has('price'), function ($query) use ($request) {
                $query->whereHas('prices.packages', function ($query) use ($request) {
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
            });

        $services = $query->with(['user:id,name', 'user.profile:id,user_id,photo'])
            ->select('id', 'title', 'image', 'user_id',)
            ->latest()
            ->get();
        return response()->json($services);
    }
}
