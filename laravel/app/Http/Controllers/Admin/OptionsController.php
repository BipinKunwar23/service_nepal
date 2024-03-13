<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Option;
use App\Models\Standard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OptionsController extends Controller
{
  public function create(Request $request, $id)
  {

    Option::create([
      'service_id' => $id,
      'name' => $request->name,
      'keywords' => $request->keywords,

    ]);

    return response()->json([
      'message' => 'successfully created'
    ], 200);
  }
  public function getByService($serviceId)
  {

    $data = Option::where('service_id', $serviceId)
      ->latest()->get();
    return $data;
  }

  public function createStandard(Request $request, $id)
  {
    DB::table('standards')->insert([
      'name' => $request->name,
      'option_id' => $id,
      'created_at' => now(), // Optional if you want to specify creation time
      'updated_at' => now()  // Optional if you want to specify update time
    ]);


    return response()->json([
      'message' => 'successfully created'
    ], 200);
  }

  public function getStandardByServicesId($serviceId)
  {
    $service = DB::table('standards')->where('option_id', $serviceId)->latest()->get();
    return $service;
    // if ($service) {
    //   return CatServiceResource::collection($service);
    // }
  }



  public function addValues(Request $request, $id)
  {
    // return response()->json($request->types);
    DB::table('standard_values')->insert([
      'name' => $request->name,
      'standard_id' => $id,
      'created_at' => now(), // Optional if you want to specify creation time
      'updated_at' => now()  // Optional if you want to specify update time
    ]);


    return response()->json([
      'message' => 'successfully created'
    ], 200);
  }

  public function getValuesByStandard($id)
  {

    $service = DB::table('standard_values')->where('standard_id', $id)->latest()->get();
    return $service;
    // if ($service) {
    //   return CatServiceResource::collection($service);
    // }
  }

  public function getOptionStandards($id)
  {

    // $service = Option::table('standard_values')->where('standard_id', $id)->latest()->get();

    $standard = Standard::where('option_id',$id)->with('values')
      ->get();
    return $standard;
    // ->join('orders', 'users.id', '=', 'orders.user_id')
    // ->select('users.*', 'contacts.phone', 'orders.price')
    // if ($service) {
    //   return CatServiceResource::collection($service);
    // }
  }
}
