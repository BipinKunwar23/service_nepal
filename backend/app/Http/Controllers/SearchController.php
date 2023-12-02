<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationResource;
use App\Http\Resources\ProviderResource;
use App\Http\Resources\ServiceLocaitonResource;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class SearchController extends Controller
{
    public function searchService(Request $request)
    {
        $search = $request->input('name');
        $services = Service::has('users')->where('name', 'LIKE', $search . '%')->distinct()
            ->get();
        return $services;
    }

 
    public function searchLocation()
    {
        $places = DB::table('service_user')->select('address')->distinct()->get();
        return $places;
        // $places=User::whereHas('services',function ($query){
        //     $query->whereNotNull('service_user.address');
        // })->with('services')->get();
        // if($places){
        //     return ServiceLocaitonResource::collection($places);
        // }
    }

    public function searchCategoryLocation($categoryId)
    {

        $addresses = DB::table('service_user')
            ->join('users', 'service_user.user_id', '=', 'users.id')
            ->join('services', 'service_user.service_id', '=', 'services.id')
            ->join('subcategories', 'services.subcategory_id', '=', 'subcategories.id')
            ->join('categories', 'subcategories.category_id', '=', 'categories.id')
            ->where('categories.id', $categoryId)
            ->select('service_user.address')
            ->distinct()
            ->get();
        return $addresses;
    }
}
