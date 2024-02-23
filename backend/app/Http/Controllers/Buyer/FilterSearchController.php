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


    public function searchLocation()
    {
        $places = DB::table('service_user')->select('cities')->distinct()->get();
        $cities = [];
        foreach ($places as $place) {
            $cities[] = json_decode($place->cities);
        }
        return response()->json(
            $cities
        );
        // $places=User::whereHas('services',function ($query){
        //     $query->whereNotNull('service_user.address');
        // })->with('services')->get();
        // if($places){
        //     return ServiceLocaitonResource::collection($places);
        // }
    }

    public function searchCategoryLocation($categoryId)
    {

        $addresses = DB::table('service_user')
            ->join('users', 'service_user.user_id', '=', 'users.id')
            ->join('services', 'service_user.service_id', '=', 'services.id')
            ->join('subcategories', 'services.subcategory_id', '=', 'subcategories.id')
            ->join('categories', 'subcategories.category_id', '=', 'categories.id')
            ->where('categories.id', $categoryId)
            ->select('service_user.cities')
            ->distinct()
            ->get();
        return response()->json(
            json_decode($addresses)
        );
    }

    public function getFilterTypes($serviceId)
    {

       $data= ScopeUser::whereHas('service', function ($query) use ($serviceId) {
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


    public function searchProviderByService(Request $request)
    {
        $keyword = $request->input('name');
        // $words=explode(' ',$keyword);

        // return $words;
        $providers = User::whereHas('subcategory', function ($query) use ($keyword) {
            $query->where('keywords', 'like', '%' . $keyword . '%')
                ->orWhereJsonContains('available_cities', ['city' => $keyword]);
        })
            ->orWhereHas('subcategory.category', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('subcategory.services', function ($query) use ($keyword) {
                $query->Where('keywords', 'like', '%' . $keyword . '%');
            })
            ->orWhereHas('subcategory.services.scopes', function ($query) use ($keyword) {
                $query->Where('name', 'like', '%' . $keyword . '%');
            })
            ->with(['profile', 'subcategory' => function ($query) use ($keyword) {
                $query->where('keywords', $keyword)
                    ->orWhereHas('category', function ($query) use ($keyword) {
                        $query->where('keywords', 'like', '%' . $keyword . '%');
                    })
                    ->orWhereHas('services', function ($query) use ($keyword) {
                        $query->where('keywords', 'like', '%' . $keyword . '%');
                    })
                    ->orWhereHas('services.scopes', function ($query) use ($keyword) {
                        $query->where('name', 'like', '%' . $keyword . '%');
                    });
            }])
            ->get();


        return $providers;
    }

    public function filterService(Request $request, $serviceId)
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
                
                $query->where('locations.city',$request->input('city'));
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
                if($typeArray[0]==='low'){

                    $query->where('price','<=',$typeArray[1]);
                }
                if($typeArray[0]==='mid'){

                    $query->where('price','>=',$typeArray[1])->where('price','<=',$typeArray[2]);
                }
                
                if($typeArray[0]==='high'){

                    $query->where('price','>=',$typeArray[1]);
                }
                if($typeArray[0]==='custom'){

                    $query->where('price','>=',$typeArray[1])->where('price','<=',$typeArray[2]);

                }
            });
        });

       $services= $query->with(['user:id,name', 'user.profile:id,user_id,photo'])
        ->select('id', 'title', 'image', 'user_id',)
        ->latest()
        ->get();
        return response()->json($services);

       
        $query = User::query();
        $query->has('subcategories');


        $query->when($request->has('category'), function ($query) use ($request) {
            $query->whereHas('subcategories', function ($query) use ($request) {
                $query->where('category_id', $request->input('category'));
            });
        })
            ->when($request->has('location'), function ($query) use ($request) {
                $query->whereHas('subcategories', function ($query) use ($request) {
                    $query->whereJsonContains('available_cities', ['city' => $request->input('location')]);
                });
            })
            ->when($request->has('rating'), function ($query) use ($request) {
                $query->whereHas('feedbacks', function ($query) use ($request) {
                    $query->selectRaw('avg(rating) as avg_rating')
                        ->havingRaw('avg_rating >= ?', [$request->input('rating')]);
                });
            })
            ->when($request->has('price'), function ($query) use ($request) {
                $query->where('price', $request->input('price')); // Replace 'price' with your actual column name
            });

        $results = $query->with(['subcategories' => function ($query) use ($request) {
            $query->when($request->has('category'), function ($query) use ($request) {
                $category = $request->input('category');
                $query->where('category_id', $category);
            })
                ->when($request->has('subcategory'), function ($query) use ($request) {
                    $subcategory = $request->input('subcategory');
                    $query->where('subcategories.id', $subcategory);
                });
            $query->select('subcategories.id', 'name');
        }, 'subcategories.locations:id,subcategory_id,user_id,city', 'profile', 'feedbacks' => function ($query) {
            $query->selectRaw('provider_id, AVG(rating) as avg_rating')
                ->groupBy('provider_id');
        }])->select('id', 'name')->get();


        foreach ($results as $key => $user) {
            foreach ($user->subcategories as $key => $subcategory) {
                $userId = $subcategory->pivot->user_id;
                $filteredLocations = $subcategory->locations->where('user_id', $userId)->values();

                $subcategory->setRelation('locations', $filteredLocations);
            }
        }
        if ($results) {
            return ProviderResource::collection($results);
        }
    }
}
