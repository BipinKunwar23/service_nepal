<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Location;
use App\Models\Option;
use App\Models\OptionUser;
use App\Models\package;
use App\Models\Service;
use App\Models\User;
use App\Services\ServicesService;
use Illuminate\Http\Request;

class UserServiceController extends Controller
{
    protected $service, $rating;

    public function __construct(ServicesService $service)
    {
        $this->service = $service;
    }
   
    public function getAllServiceCards()
    {

        $query = OptionUser::query();
        $services = $this->service->getBuyerServiceCards($query)->paginate(20);
        $catalog = Category::with(['subcategories','subcategories.services','subcategories.services.options'])->get();


        return response()->json([
            'services'=>$services,
            'catalog'=>$catalog
        ]);
    }


    public function getServiceDetails($serviceId,$optionId)
    {
        $data = $this->service->viewServiceDetails($serviceId,$optionId);

        return response()->json($data);
    }
    public function getServicePackage(Request $request, $serviceId)
    {
        $package = $request->input('name');
        $data = OptionUser::with(['packages' => function ($query) use ($package) {
            $query->where('package', $package)->first();
        }, 'packages.standards', 'galleries' => function ($query) {
            $query->first();
        }])
            ->find($serviceId);
        return response()->json($data);
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



        $service = OptionUser::where('keywords', 'like', '%' . $keyword . '%')

            ->orwhereHas('service', function ($query) use ($keyword) {
                $query->where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('category', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('subcategory', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            });
        $data = $this->service->getBuyerServiceCards($service)->paginate(20);
        return response()->json($data);
    }


    public function getFilterTypes($serviceId)
    {

        $data = OptionUser::whereHas('service', function ($query) use ($serviceId) {
            $query->where('id', $serviceId);
        });


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
        $budget = package::whereIn('option_id', $optionId)
            ->selectRaw('MIN(price) as min, MAX(price) as max')
            ->get();

        return response()->json(
            [
                'options' => $options,
                'locations' => $location,
                'budget' => $budget,
            ]
        );
    }



    public function getfilteredService(Request $request, $serviceId)
    {

        // $types = $request->input('price');
        // $typeArray = explode(',', $types);
        // return response()->json($typeArray);



        $query = OptionUser::query();

        $query->whereHas('service', function ($query) use ($serviceId) {
            $query->where('id', $serviceId);
        });



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

        $services = $this->service->getBuyerServiceCards($query)->paginate(20);




        return response()->json($services);
    }
}
