<?php

namespace App\Http\Controllers;

use App\Http\Requests\catservice_providerRequest;
use App\Http\Resources\ProviderResource;
use App\Http\Resources\ServiceResource;
use App\Models\Category;
use App\Models\Catservice;
use App\Models\Provider;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;

use function PHPSTORM_META\map;
use function PHPUnit\Framework\isEmpty;

class CatserviceProviderController extends Controller
{
    public function createServices(catservice_providerRequest $request, $id)
    {

        $users = User::find($id);
        $service = $request->validated();
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
        $users->catservices()->attach($request['cid'], [
            'description' => $request['description'],
            'days' => json_encode($request['days']),
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

    public function getAll()
    {

        $requests = User::has('catservices')->with(['catservices', 'profile'])
            ->get();
        return ProviderResource::collection($requests);
    }


    public function getByCategory($id)
    {
        $services = User::whereHas('catservices', function ($query) use ($id) {
            $query->where('category_id', $id);
        })->with(['catservices', 'profile'])->get();
        // $services = Category::has('services')->with('services.users.profile')->find($id); uses for nested relationship 
        return ProviderResource::collection(($services));
    }


    public function getProviderServices($providersId)
    {
        $services = User::find($providersId)->catservices()->withPivot('description', 'days', 'time', 'charge', 'offers', 'experience', 'image', 'address')->get();

        // return $services;
        return  ServiceResource::collection($services);
    }

    public function providerServiceByCategory($providerId,$categoryId){
        $services = User::find($providerId)->catservices()->withPivot('description', 'days', 'time', 'charge', 'offers', 'experience', 'image', 'address')
        ->where('category_id',$categoryId)
        ->get();

        return  ServiceResource::collection($services);
    }

    public function getProviderCategory($providersId)
    {

 
        $user = User::find($providersId);

        $categories = Category::with(['category:id,name,parent_id', 'category' => function ($query) use ($user) {
            $query->whereHas('catservices', function ($useQuery) use ($user) {
                $useQuery->whereIn('id', $user->catservices->pluck('id'));
            });
        }])
            ->where(function ($query) use ($user) {
                $query->where(function ($subquery) use ($user) {
                    // Check if the category has subcategories
                    $subquery->whereHas('category');
                })
                    ->orWhere(function ($subquery) use ($user) {
                        // Check for indirect relationship with user through service model only if no subcategories
                        $subquery->whereDoesntHave('category')->whereHas('catservices', function ($userQuery) use ($user) {
                            $userQuery->whereIn('id', $user->catservices->pluck('id'));
                        });
                    });
            })->where('parent_id',null)
            ->get(['id', 'name', 'parent_id']);




        return $categories;



    }
}
