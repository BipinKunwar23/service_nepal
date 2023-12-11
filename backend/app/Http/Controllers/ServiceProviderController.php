<?php

namespace App\Http\Controllers;

use App\Http\Requests\catservice_providerRequest;
use App\Http\Resources\ProviderDetailsResource;
use App\Http\Resources\ProviderResource;
use App\Http\Resources\ScopeResource;
use App\Http\Resources\ServiceDetailsResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ViewServiceResource;
use App\Models\Category;
use App\Models\Image;
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

        $imageNames = [];
        if (isset($request->images)) {

            foreach ($request->images as $file) {

                if (isset($file) && $file instanceof UploadedFile) {

                    $extension = $file->getClientOriginalExtension();

                    $name = time() . '_' . uniqid() . '.' . $extension;

                    $file->move('service', $name);
                    $path = 'service/' . $name;

                    $imageNames[] = $path;
                }
            }
        }

        if (isset($imageNames)) {
            foreach ($imageNames as $image) {
                $data = new Image();
                $data->service_id = $request->sid;
                $data->name = $image;
                $data->user_id = $id;
                $data->save();
            }
        }
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
        $user->services()->attach($request['sid'], [
            'description' => $request['description'],
            'time' => $request['time'],
            'days' => $request['days'],
            'currency' => $request['currency'],
            'cities' => $request['cities'],
            'additional_info' => $request['additional_info'],
            'experience' => $request['experience'],
            'experience_certificate' => $experience_path,
            'trainings' => $request['trainings'],
            'training_certificate' => $training_path,
            'projects' => $request['projects'],
            'project_certificate' => $project_path,



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

    public function getServiceById($providerId, $serviceId)
    {
        $services = User::find($providerId)->services->find($serviceId);

        if ($services) {

            return new ServiceDetailsResource($services);
        }
        $collection = Service::select(['id', 'name', 'description', 'icons', 'units'])->with('scopes:id,name,service_id')->find($serviceId);
        $collection['pivot'] = null;
        return response()->json($collection);
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

        $providers = User::has('services')->with(['services' => function ($query) {
            $query->take(3);
        }, 'profile'])
            ->get();
        if ($providers) {

            return ProviderResource::collection($providers);
        }
    }


    public function getProviderByCategory($categoryId)
    {
        $providers = User::whereHas('services', function ($query) use ($categoryId) {
            $query->whereHas('subcategory', function ($subquery) use ($categoryId) {
                $subquery->where('category_id', $categoryId);
            });
        })->with(['services', 'profile'])->get();
        if ($providers) {

            return ProviderResource::collection(($providers));
        }
    }

    public function getProviderBySubCategory($subcategoryId)
    {
        $providers = User::whereHas('services', function ($query) use ($subcategoryId) {
            $query->where('subcategory_id', $subcategoryId);
        })->with(['services', 'profile'])->get();
        if ($providers) {

            return ProviderResource::collection(($providers));
        }
    }




    public function getProviderDetails($providerId)
    {
        $user = User::with(['services.images', 'profile'])->find($providerId);
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
