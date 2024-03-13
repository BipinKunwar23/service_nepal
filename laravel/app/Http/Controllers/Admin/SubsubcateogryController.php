<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subsubcategory;
use Illuminate\Http\Request;

class SubsubcateogryController extends Controller
{

    public function create(Request $request, $id)
    {

        Subsubcategory::create([
            'subcategory_id' => $id,
            'name' => $request->name,
            'keywords' => $request->keywords,

        ]);

        return response()->json([
            'message' => 'successfully created'
        ], 200);
    }
    public function getBySubcategory($subcategoryId)
    {

        $data = Subsubcategory::where('subcategory_id', $subcategoryId)
           ->latest() ->get();
        return $data;
    }
}
