<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Standard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class StandardController extends Controller
{
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

  public function updateStandard(Request $request, Standard $standard)
  {
    $validate = $request->validate([
      'name' => ['required', Rule::unique('services', 'name')->ignore($standard->id)],

    ]);



    $standard->name = $request->name;
    $standard->save();
    return response()->json([
      'message' => 'successfully updated'
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

  public function updateValue(Request $request,$id)
  {
    $value=DB::table('standard_values')->find($id);
    $validate = $request->validate([
      'name' => ['required', Rule::unique('services', 'name')->ignore($value->id)],

    ]);


    DB::table('standard_values')->where('id', $id)->update(['name' => $request->name]);
    return response()->json([
      'message' => 'successfully updated'
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

    $standard = Standard::where('option_id', $id)->with('values')
      ->get();
    return $standard;
    // ->join('orders', 'users.id', '=', 'orders.user_id')
    // ->select('users.*', 'contacts.phone', 'orders.price')
    // if ($service) {
    //   return CatServiceResource::collection($service);
    // }
  }
}
