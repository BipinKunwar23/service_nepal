<?php

namespace App\Http\Controllers;

use App\Http\Requests\catservice_providerRequest;
use App\Http\Resources\ProvideCardSubcatgResource;
use App\Http\Resources\ProviderDetailsResource;
use App\Http\Resources\ProviderResource;
use App\Http\Resources\ScopeResource;
use App\Http\Resources\ServiceDetailsResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ViewServiceResource;
use App\Models\Category;
use App\Models\Image;
use App\Models\Scope;
use App\Models\Service;
use App\Models\Subcategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class ServiceProviderController extends Controller
{

    public function createServices(Request $request)
    {

        $user = User::find(Auth::user()->id);

        $data = $request->all();
        $collection = collect($data)->keyBy('scopeId')
            ->map(function ($item)  {
                return [
                    'title'=>$item->title,
                    'service_id'=>$item->serviceId ,
                    'subcategory_id'=>$item->subcategoryId ,
                    'category_id'=>$item->categoryId 
                ];
            });

        $user->scopes()->syncWithoutDetaching($collection);



        
        return response()->json([
            'message' => 'successfully Added'
        ]);
    }






    public function getServicesByPorviderId($providersId)
    {
        $services = User::find($providersId)->services()->get();
        if ($services) {

            return  ServiceResource::collection($services);
        }
    }

    public function getCategoryDetailByProviderId($providerId, $categoryId)
    {
        $services = User::find($providerId)->subcategories->find($categoryId);
        if ($services) {

            return response()->json($services);
        }
        return false;
    }

    public function viewProviderServicesById($providerId, $serviceId)

    {

        $service = User::find($providerId)->services()->with('images')->find($serviceId);
        $scope = User::find($providerId)->scopes->where('service_id', $serviceId);
        return response()->json([
            'services' => new ViewServiceResource($service),
            'scopes' => ScopeResource::collection($scope)

        ]);
    }

    public function getServicesByCategory($providerId, $categoryId)
    {
        $category = Category::find($categoryId);
        $user = User::find($providerId);

        if ($category && $user) {
            $services = $user->services()
                ->whereHas('subcategories', function ($query) use ($categoryId) {
                    $query->where('category_id', $categoryId);
                })
                ->get();

            // Now $services contains the services for the given Category Id and User Id.
        }
        if ($services) {

            return  ServiceResource::collection($services);
        }
    }
    public function getServicesBySubCategory($providerId, $subcategoryId)
    {

        $services = User::find($providerId)->services()
            ->where('subcategory_id', $subcategoryId)
            ->get();
        if ($services) {

            return  ServiceResource::collection($services);
        }
    }

    public function editProviderService(Request $request, $providerId)
    {
        $users = User::find($providerId);


        $path = null;

        if ($request->hasFile('image')) {
            $destination = $users->services->find($request->input('sid'))->pivot->image;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('service/image', $name);
            $path = 'service/image/' . $name;
        } else {
            $path = $users->services->find($request->input('sid'))->pivot->image;
        }
        $users->services()->updateExistingPivot($request['sid'], [
            'description' => $request['description'],
            'days' => $request['days'],
            'time' => $request['time'],
            'charge' => $request['charge'],
            'offers' => $request['offers'],
            'experience' => $request['experience'],
            'image' => $path,
            'address' => $request['address'],
        ]);


        return response()->json([
            'message' => 'successfully updated'
        ]);
        return $users;
    }

    public function deleteService($serviceId, $providerId)
    {
        $user = User::find($providerId);
        $user->services()->detach($serviceId);
        return response()->json([
            'message' => 'successfully deleted'

        ]);
    }



    public function getAllProvider()
    {



        // $services=User::with('services')->pluck('id');
        // $providers=User::with(['subcategory.services'=>function($query) use ($services){
        //     $query->whereIn('services.id',$services);
        // }])->get();
        // return $providers;
        $providers = User::with('subcategories', 'profile')->get();

        if ($providers) {

            return ProviderResource::collection($providers);
        }
    }


    public function getProviderByCategory($categoryId)
    {
        $providers = User::whereHas('subcategories', function ($subquery) use ($categoryId) {
            $subquery->where('category_id', $categoryId);
        })

            ->with('subcategories', 'profile')->get();

        if ($providers) {

            return ProviderResource::collection($providers);
        }

        // $providers = User::whereHas('services', function ($query) use ($categoryId) {
        //     $query->whereHas('subcategory', function ($subquery) use ($categoryId) {
        //         $subquery->where('category_id', $categoryId);
        //     });
        // })->with(['services', 'profile'])->get();
        // if ($providers) {

        //     return ProviderResource::collection(($providers));
        // }
    }

    public function getProviderBySubCategory($subcategoryId)
    {
        $serviceId = User::with('services')->pluck('id');
        $users = User::whereHas('subcategories', function ($query) use ($subcategoryId) {
            $query->where('subcategories.id', $subcategoryId);
        })->with(['subcategories', 'services' => function ($query) use ($subcategoryId) {
            $query->where('services.subcategory_id', $subcategoryId);
        }, 'profile'])->get();


        $providers = $users->map(function ($user) {
            $user->category = $user->subcategory->first();
            unset($user->subcategory); // Remove the 'subcategories' array
            return $user;
        });



        if ($providers) {

            return ProvideCardSubcatgResource::collection(($providers));
        }
    }




    public function getProviderDetails($providerId, $categoryId)
    {
        $scopeId = User::find($providerId)->scopes->pluck('id');

        $services = User::with(['subcategories' => function ($query) use ($categoryId, $scopeId, $providerId) {
            $query->with([
                'services' => function ($query) use ($scopeId) {
                    $query->has('scopes');
                    $query->whereHas('scopes', function ($subquery) use ($scopeId) {
                        $subquery->whereIn('scopes.id', $scopeId);
                    });
                },
                'services.scopes' => function ($query) use ($scopeId) {
                    $query->whereIn('scopes.id', $scopeId);
                },
                'services.scopes.users' => function ($query) use ($providerId) {
                    $query->where('users.id', $providerId);
                }

            ])
            ->where('subcategories.id', $categoryId)
            ->first()
            ;
        }, 'profile'])

            ->find($providerId);
        if ($services) {
            return new ProviderDetailsResource($services);
        }


      
    }

    public function searchByService(Request $request)
    {
        $name = $request->input('name');
        $providers = User::whereHas('services', function ($query) use ($name) {
            $query->where('name', $name);
        })->with(['services' => function ($query) {
            $query->take(3);
        }, 'profile'])
            ->get();
        if ($providers) {

            return ProviderResource::collection($providers);
        }
    }

    public function getProviderServiceScope($providerId, $serviceId)
    {
        $scope = User::find($providerId)->scopes->where('service_id', $serviceId);
        if ($scope) {
            return ScopeResource::collection($scope);
        }
    }
}
