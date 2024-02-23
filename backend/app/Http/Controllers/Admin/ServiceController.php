<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Requests\serviceRequest;
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
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
  protected $services;
  public function __construct(ServicesService $services) {
     $this->services=$services;
 }

  public function create(Request $request, $id)
  {
    $path = null;

    if ($request->hasFile('icons')) {
      $file = $request->file('icons');
      $extension = $file->getClientOriginalExtension();
      $name = time() . '.' . $extension;
      $file->move('catservice/icons', $name);
      $path = 'catservice/icons/' . $name;
    }

    $value = Service::create([
      'subcategory_id' => $id,
      'name' => $request->name,
      'description' => $request->description,
      'keywords' => $request->keywords,
      'units' => $request->units,
      'icons' => $path,

    ]);
    $serviceId = $value->id;
    $scopes = json_decode($request->scopes);
    foreach ($scopes as $scope) {
      $value = new Scope();
      $value->name = $scope->name;
      $value->service_id = $serviceId;

      $value->save();
    }

    return response()->json([
      'message' => 'successfully created'
    ], 200);
  }

  public function viewServiceById($id)
  {
    $services = Service::find($id);
    return response()->json($services);
  }

  public function updateService(Request $request, Service $service)
  {
    $validate = $request->validate([
      'name' => ['required', Rule::unique('services', 'name')->ignore($service->id)],

      'description' => 'sometimes',
      'image' => 'sometimes',
      'subcategory_id' => 'required',
      'keywords' => 'sometimes'

    ]);
    if ($request->hasFile('icons')) {
      $destination = $service->icons;
      if (File::exists($destination)) {
        File::delete($destination);
      }
      $file = $request->file('icons');
      $extension = $file->getClientOriginalExtension();
      $name = time() . '.' . $extension;
      $file->move('category/icons', $name);
      $path = 'category/icons/' . $name;
    } else {
      $path = $service->icons;
    }

    $service->fill(collect($validate)->put('icons', $path)->toArray())->save();

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
 
 
  public function getAllServices(){
    $service= $this->services->getAllServices();
    return response()->json($service);

 }
  public function getBysubcategory($subcategoryId)
  {

    $service = Service::whereHas('subcategory', function ($query) use ($subcategoryId) {
      $query->where('id', $subcategoryId);
    })->get();
    if ($service) {
      return SubCategoryResoruce::collection($service);
    }
  }
  public function getByCategory($id)
  {

    $service = Service::whereHas('subcategory', function ($query) use ($id) {
      $query->where('category_id', $id);
    })
      ->get();
    if ($service) {
      return response()->json([
        'services' => CatServiceResource::collection($service)
      ]);
    }
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
