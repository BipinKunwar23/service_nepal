<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Option;
use App\Models\Standard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

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
      ->get();
    return $data;
  }
 
  public function updateOption(Request $request, Option $option)
  {
    $validate = $request->validate([
      'name' => ['required', Rule::unique('services', 'name')->ignore($option->id)],
     
    ]);



$option->name=$request->name;
$option->save();
    return response()->json([
      'message' => 'successfully updated'
    ], 200);
  }
  
}
