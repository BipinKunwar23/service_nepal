<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function create(Request $request, $serviceId,$providerId){
        $image=$request->all();
        foreach($image as $item){
            Image::create([
                'name'=>$item,
                'service_id'=>$serviceId,
                'provider_id'=>$providerId
            ]);
        }
    }
}
