<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Requests\serviceRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CatServiceResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ServiceScopeResource;
use App\Http\Resources\SubCategoryResoruce;
use App\Http\Resources\UnitScopeResource;
use App\Models\Category;
use App\Models\Location;
use App\Models\package;
use App\Models\Price;
use App\Models\Scope;
use App\Models\ScopeUser;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Subcategory;
use App\Models\User;
use App\Services\ServicesService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
  protected $services;
  public function __construct(ServicesService $services)
  {
    $this->services = $services;
  }

  public function create(Request $request, $id)
  {
    $value = Service::create([
      'subcategory_id' => $id,
      'name' => $request->name,
      'type' => $request->type,

      'keywords' => $request->keywords,

    ]);


    return response()->json([
      'message' => 'successfully created'
    ], 200);
  }

  public function viewById($id)
  {
    $services = Service::find($id);
    return response()->json($services);
  }

  public function updateService(Request $request, Service $service)
  {
    $validate = $request->validate([
      'name' => ['required'],
      'keywords' => 'required',
      'type' => 'required'
    ]);




    $service->fill(collect($validate)->toArray())->save();
    return response()->json([
      'message' => 'successfully updated'
    ], 200);
  }
  public function delete(Service $service)
  {
    $service->delete();
    return response()->json([
      'message' => 'deleted successfully'
    ], 200);
  }


  public function getAllServices()
  {
    $service = Service::get();
    return response()->json($service);
  }
  public function getBySubCategory($subcategoryId)
  {

    $service = Service::where('subcategory_id', $subcategoryId)->get();
    return response()->json($service);
    // if ($service) {
    //   return CatServiceResource::collection($service);
    // }
  }







  // public function getServicesByServiceId($serviceId)
  // {
  //   $data = ScopeUser::whereHas('service', function ($query) use ($serviceId) {
  //     $query->where('id', $serviceId);
  //   })
  //     ->with(['user:id,name', 'user.profile:id,user_id,photo'])
  //     ->select('id', 'title', 'image', 'user_id',)
  //     ->latest()
  //     ->get();

  //   $user = User::whereHas('scopes', function ($query) use ($serviceId) {
  //     $query->where('scopes.service_id', $serviceId);
  //   })->pluck('id');

  //   $location = Location::whereHas('users', function ($query) use ($user) {
  //     $query->whereIn('id', $user);
  //   })
  //     ->select('city')->distinct()->get();

  //   $types = Scope::whereHas('services', function ($query) use ($serviceId) {
  //     $query->where('id', $serviceId);
  //   })
  //     ->select('id', 'name')


  //     ->get();

  //   $scopeId = $data->pluck('id');
  //   $priceId = Price::whereIn('service_id', $scopeId)->pluck('id');
  //   $min = package::whereIn('price_id', $priceId)->where('package', 'basic')->min('price');
  //   $max = package::whereIn('price_id', $priceId)->where('package', 'premium')->max('price');

  //   return response()->json([
  //     'services' => $data,
  //     'types' => $types,
  //     'locations' => $location,
  //     'prices' => [
  //       'min' => isset($min) ? $min : 0,
  //       'max' => isset($max) ? $max : 0,

  //     ]
  //   ]);
  // }


}
