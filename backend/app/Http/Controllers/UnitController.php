<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function create(Request $request, $serviceId,$providerId){
        $image=$request->all();
        foreach($image as $item){
            Unit::create([
                'name'=>$item,
                'service_id'=>$serviceId,
            ]);
        }
    }
}
