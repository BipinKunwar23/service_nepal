<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Category;
use App\Models\Subcategory;
use App\Models\User;
use App\Services\SubCategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;

class SubCategoryController extends Controller
{

    protected $subcatservices;
    public function __construct(SubCategoryService $subcatservices)
    {
        $this->subcatservices = $subcatservices;
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
            'category_id' => $id,
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
        $subcategoreis = $this->subcatservices->getAllSubCategory();
        return response()->json($subcategoreis);
    }

    public function viewById($id)
    {
        $subcategory = Subcategory::find($id);
        return response()->json($subcategory);
    }


    public function getSubCategoryByCategory($categoryId)
    {
        $subcategories = Category::find($categoryId)->subcategories()->get();
        return response()->json($subcategories);
    }



    public function updateSubCategory(Request $req, $id)
    {
        $validate = $req->validate([
            'name' => ['required', Rule::unique('subcategories', 'name')->ignore($id)],
            'keywords' => 'required',
            'category_id' => 'required'
        ]);
        $subcategory = Subcategory::find($id);

        if ($req->hasFile('icons')) {
            $destination = $subcategory->icons;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $req->file('icons');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('subcategory/icons', $name);
            $path = 'subcategory/icons/' . $name;
        } else {
            $path = $subcategory->icons;
        }
        $subcategory->fill(collect($validate)->put('icons', $path)->toArray())->save();
        return response()->json([
            'message' => 'successfully updated'
        ], 200);
    }

    public function getCategoryServiceScopes($categoryId)
    {
        $detail = Subcategory::with('services.scopes')->find($categoryId);
        return $detail;
    }
}
