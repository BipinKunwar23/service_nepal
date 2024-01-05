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
use Illuminate\Support\Facades\File;

class ServiceProviderController extends Controller
{

    public function createServices(Request $request, $id)
    {

        // $imageNames = [];
        // if (isset($request->images)) {

        //     foreach ($request->images as $file) {

        //         if (isset($file) && $file instanceof UploadedFile) {

        //             $extension = $file->getClientOriginalExtension();

        //             $name = time() . '_' . uniqid() . '.' . $extension;

        //             $file->move('service', $name);
        //             $path = 'service/' . $name;

        //             $imageNames[] = $path;
        //         }
        //     }
        // }

        // if (isset($imageNames)) {
        //     foreach ($imageNames as $image) {
        //         $data = new Image();
        //         $data->service_id = $request->sid;
        //         $data->name = $image;
        //         $data->user_id = $id;
        //         $data->save();
        //     }
        // }
        $user = User::find($id);
        $data = json_decode($request->scopes);
        $collection = collect($data)->keyBy('id')
            ->map(function ($item) use ($request) {
                return collect($item)->put('service_id', $request->sid)->except('id')->toArray();
            });

        $user->scopes()->syncWithoutDetaching($collection);



        // return dd($service);

        // This code is used when we setup multiple services
        // $collection = [];
        // foreach ($data['service'] as $request) {
        //     $collection[$request['id']] = [
        //         'availabe_date' => $request['availabe_date'],
        //         'period' => $request['period'],
        //         'duration' => $request['duration'],
        //         'price' => $request['price'],
        //         'location' => json_encode($request['location']),
        //         'status' => $request['status'],
        //     ];
        // }
        $experience_path = null;
        $training_path = null;
        $project_path = null;


        if ($request->hasFile('experience_certificate')) {
            $file = $request->file('experience_certificate');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('service/experience', $name);
            $experience_path = 'service/experience/' . $name;
        }
        if ($request->hasFile('training_certificate')) {
            $file = $request->file('training_certificate');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('service/training', $name);
            $training_path = 'service/training/' . $name;
        }
        if ($request->hasFile('project_certificate')) {
            $file = $request->file('project_certificate');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('service/project', $name);
            $project_path = 'service/project/' . $name;
        }
        $user->services()->attach($request->sid, [
            'description' => $request->description,
            'additional_info' => $request->additional_info,
            'refund_policy' => $request->refund_policy,
            'terms' => $request->terms,



        ]);


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
        $services = User::find($providerId)->subcategory->find($categoryId);
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
                ->whereHas('subcategory', function ($query) use ($categoryId) {
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
        $providers = User::with('subcategory', 'profile')->get();

        if ($providers) {

            return ProviderResource::collection($providers);
        }
    }


    public function getProviderByCategory($categoryId)
    {
        $providers = User::whereHas('subcategory', function ($subquery) use ($categoryId) {
            $subquery->where('category_id', $categoryId);
        })

            ->with('subcategory', 'profile')->get();

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
        $users = User::whereHas('subcategory', function ($query) use ($subcategoryId) {
            $query->where('subcategories.id', $subcategoryId);
        })->with(['subcategory', 'services' => function ($query) use ($subcategoryId) {
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

        $services = User::with(['subcategory' => function ($query) use ($categoryId, $scopeId, $providerId) {
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


        $services = Subcategory::whereHas('services', function ($mquery) use ($scopeId, $providerId) {
            $mquery->whereHas('scopes', function ($query) use ($scopeId, $providerId) {
                $query->whereIn('scopes.id', $scopeId);
                $query->whereHas('users', function ($subquery) use ($providerId) {
                    $subquery->where('users.id', $providerId);
                });
            });
        })

            ->with(['services' => function ($query) use ($scopeId) {
                $query->whereHas('scopes', function ($subquery) use ($scopeId) {
                    $subquery->whereIn('scopes.id', $scopeId);
                });
            }, 'services.scopes.users' => function ($query) use ($providerId) {
                $query->where('users.id', $providerId);
            }])->find($categoryId);
        if ($services) {
            return new ProviderDetailsResource($services);
        }

        $user = User::whereHas('subcategory', function ($query) use ($categoryId) {
            $query->where('subcategories.id', $categoryId);
        })->whereHas('services', function ($query) use ($categoryId) {
            $query->where('services.subcategory_id', $categoryId);
        })->with(['subcategory' => function ($query) use ($categoryId) {
            $query->where('subcategories.id', $categoryId)->first();
        }, 'services.images', 'profile'])->find($providerId);
        if ($user) {
            return new ProviderDetailsResource($user);
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
