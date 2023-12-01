<?php

namespace App\Http\Controllers;

use App\Http\Requests\catservice_providerRequest;
use App\Http\Resources\ProviderDetailsResource;
use App\Http\Resources\ProviderResource;
use App\Http\Resources\ServiceDetailsResource;
use App\Http\Resources\ServiceResource;
use App\Models\Category;
use App\Models\Service;
use App\Models\Subcategory;
use App\Models\User;
use Illuminate\Http\Request;

class ServiceProviderController extends Controller
{

    public function createServices(catservice_providerRequest $request, $id)
    {

        $users = User::find($id);
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

        $path = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('service/image', $name);
            $path = 'service/image/' . $name;
        }
        $users->services()->attach($request['sid'], [
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
            'message' => 'successfully added'
        ]);
    }






    public function getServicesByPorviderId($providersId)
    {
        $services = User::find($providersId)->services()->get();
        if ($services) {

            return  ServiceResource::collection($services);
        }
    }

    public function getServiceById($providerId,$serviceId)
    {
        $services = User::find($providerId)->services->find($serviceId);
        if ($services) {
            
            return new ServiceDetailsResource($services);
        }
        $value=Service::select(['id','name'])->find($serviceId);
        $collection=collect($value)->put('pivot',null)->toArray();
        return response()->json($collection);
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
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('service/image', $name);
            $path = 'service/image/' . $name;
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

        $providers = User::has('services')->with(['services'=>function($query){
            $query->take(3);
        },'profile'])
            ->get();
        if ($providers) {

            return ProviderResource::collection($providers);
        }
    }


    public function getProviderByCategory($categoryId)
    {
        $providers = User::whereHas('services', function ($query) use ($categoryId) {
            $query->whereHas('subcategory',function($subquery) use ($categoryId){
                $subquery->where('category_id',$categoryId);
            });
        })->with(['services','profile'])->get();
        if ($providers) {

            return ProviderResource::collection(($providers));
        }
    }

    public function getProviderBySubCategory($subcategoryId)
    {
        $providers = User::whereHas('services', function ($query) use ($subcategoryId) {
            $query->where('subcategory_id', $subcategoryId);
        })->with(['services','profile'])->get();
        if ($providers) {

            return ProviderResource::collection(($providers));
        }
    }


    
  
public function getProviderDetails($providerId){
    $user=User::with(['services','profile'])->find($providerId);
    if($user){
        return new ProviderDetailsResource($user);
    }
}

    public function SearchService(Request $request){
        $search=$request->input('name');
        $services = Service::has('users')->where('name','LIKE',$search.'%')->distinct()
            ->get();
        return $services;
    }

    public function searchedProviders(Request $request){
        $name=$request->input('name');
        $providers = User::whereHas('services',function($query) use ($name) {
            $query->where('name',$name);
        })->with(['services'=>function($query){
            $query->take(3);
        },'profile'])
            ->get();
        if ($providers) {

            return ProviderResource::collection($providers);
        }
    }
   
}
