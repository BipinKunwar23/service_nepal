<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Category;
use App\Models\Subcategory;
use App\Models\User;
use App\Services\SubCategoryService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SubCategoryController extends Controller
{

    protected $subcatservices;
    public function __construct(SubCategoryService $subcatservices) {
       $this->subcatservices=$subcatservices;
   }


    public function create(Request $request, $id)
    {
        $validate = $request->validate([
            'name' => ['required', 'unique:subcategories,name'],
            'keywords' => ['required'],
        ]);
        $path = null;


        if ($request->hasFile('icons')) {
            $file = $request->file('icons');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('subcategory/icons', $name);
            $path = 'subcategory/icons/' . $name;
        }
        Subcategory::create([
            'name' => $request->name,
            'category_id'=>$id,
            'description' => $request->description,
            'keywords' => $request->keywords,
            'icons' => $path,

        ]);
        return response()->json([
            'message' => 'successfulluy create sub category',
        ]);
    }
    public function getAllSubCategory()
    {
        $subcategoreis= $this->subcatservices->getAllSubCategory();
        return response()->json($subcategoreis);
    }

    public function viewById($id)
    {
        $subcategory = Subcategory::find($id);
        return response()->json($subcategory);
    }


    public function getSubCategoryByCategory($categoryId)
    {
        $subcategories = Category::find($categoryId)->subcategories()->get(['id', 'name', 'category_id']);
        return response()->json($subcategories);
    }

    public function getAllSubCategoryByProvider()
    {
        
        $subcategories = Subcategory::with('services:id,subcategory_id,name,icons')->get();
        if ($subcategories) {
            return response()->json($subcategories);
        }
    }
    public function getSubCategoryByProviderCategory($categoryId)
    {
        
        $subcategories = Subcategory::with('services:id,subcategory_id,name,icons')->where('category_id',$categoryId)->get();
        return response()->json($subcategories);
    }
    public function getSubCategoryByProviderId($providerId)
    {
        $user = User::find($providerId)->services->pluck('id');
        $subcategories = Subcategory::whereHas('services', function ($query) use ($user) {
            $query->whereIn('id', $user);
        })->get();

        if ($subcategories) {
            return response()->json($subcategories);
        }
    }

    public function getSubCategoryByProviderCategoryId($categoryId, $providerId)
    {
        $user = User::find($providerId)->services->pluck('id');

        $subcategories = Subcategory::whereHas('category', function ($query) use ($categoryId) {
            $query->where('id', $categoryId);
        })
            ->whereHas('services', function ($subquery) use ($user) {
                $subquery->whereIn('id', $user);
            })
            ->get();
        if ($subcategories) {
            return response()->json($subcategories);
        }
    }

    public function updateSubCategory(Request $req, $id)
    {
        $validate = $req->validate([
            'name' => ['required', Rule::unique('subcategories', 'name')->ignore($id)],
            'description' => 'sometimes',
            'keywords' => 'required',
            'category_id' => 'required'
        ]);
        $category = Subcategory::find($id)->first();
        $category->fill($validate)->save();
        return response()->json([
            'message' => 'successfully updated'
        ], 200);
    }

    public function getCategoryServiceScopes($categoryId){
        $detail=Subcategory::with('services.scopes')->find($categoryId);
        return $detail;
    }
}
