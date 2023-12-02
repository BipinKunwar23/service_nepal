<?php

namespace App\Http\Controllers;

use App\Http\Requests\serviceRequest;
use App\Http\Resources\CatServiceResource;
use App\Http\Resources\ServiceResource;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Subcategory;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
  public function create(serviceRequest $request, $id)
  {
      $path=null;

    if ($request->hasFile('icons')) {
      $file = $request->file('icons');
      $extension = $file->getClientOriginalExtension();
      $name = time() . '.' . $extension;
      $file->move('catservice/icons', $name);
      $path = 'catservice/icons/' . $name;
    }

    Service::create([
      'subcategory_id' => $id,
      'name' => $request->name,
      'description' => $request->description,
      'keywords' => $request->keywords,
      'icons' => $path,

    ]);


    return response()->json([
      'message' => 'successfully created'
    ], 200);
  }

  public function viewServiceById($id)
  {
    $services = Service::find($id);
    return response()->json($services);
  }

  public function updateService(Request $req, Service $service)
  {
    $validate = $req->validate([
      'name' => ['required', Rule::unique('services', 'name')->ignore($service->id)],

      'description' => 'sometimes',
      'image' => 'sometimes',
      'subcategory_id' => 'required'

    ]);
    $service->fill($validate)->save();
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
  public function otherServices($id)
  {
    $item = Category::find($id)->services()->select('id', 'name')->get();
    return response()->json($item);
  }

  public function getAll()
  {
    $services = Service::all();
    if ($services) {
      return CatServiceResource::collection($services);
    }
  }
  public function getById($id)
  {

    $service = Subcategory::find($id)->services;
    if ($service) {
      return CatServiceResource::collection($service);
    }
  }
  public function getByCategory($id)
  {
    $service = Service::whereHas('subcategory', function ($query) use ($id) {
      $query->where('category_id', $id);
    })
      ->get();
    if ($service) {
      return CatServiceResource::collection($service);
    }
  }
}
