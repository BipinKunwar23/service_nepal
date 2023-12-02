<?php

namespace App\Http\Controllers;

use App\Http\Requests\categoryRequest;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function category(Request $request)
    {
        $request->validate([
            'name' => ['required', 'unique:categories,name'],
            'description' => 'sometimes',
            'keywords' => 'required',
            'icons' => 'sometimes'
        ]);

        $path = null;


        if ($request->hasFile('icons')) {
            $file = $request->file('icons');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('category/icons', $name);
            $path = 'category/icons/' . $name;
        }

        Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'keywords' => $request->keywords,
            'icons' => $path,

        ]);
        return response()->json([
            'message' => 'successfully create',
        ]);
    }

    public function viewCategory()
    {
        $value = Category::all();
        return response()->json($value);
    }

    public function viewCategoryById($id)
    {
        $category = Category::find($id);
        return response()->json($category);
    }

    public function updateCategory(Request $request, $id)
    {
        $validate = $request->validate([
            'name' => ['required', Rule::unique('categories', 'name')->ignore($id)],
            'description' => 'sometimes',
            'keywords' => 'required',
        ]);

        $category = Category::find($id);


        if ($request->hasFile('icons')) {
            $destination = $category->icons;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $request->file('icons');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('category/icons', $name);
            $path = 'category/icons/' . $name;
        } else {
            $path = $category->icons;
        }
        $category->fill(collect($validate)->put('icons', $path)->toArray())->save();
        return response()->json([
            'message' => 'successfully updated'
        ], 200);
    }

    public function getCategoryById($id)
    {

        $services = Category::find($id)->services;
        return response()->json([
            'services' => $services
        ]);
    }
    public function search(Request $request)
    {
        $category = $request->input('name');
        $items = Category::select('name', 'description', 'image')->where('name', 'LIKE', '%' . $category . '%')->get();
        return response()->json([
            'category' => $items
        ]);
    }
    public function getServices($id)
    {
        $item = Category::find($id)->services()->select('id', 'name')->get();
        return response()->json($item);
    }


    public function getCategoryByProviderId($id)
    {


        $user = User::find($id)->services->pluck('id');
        if ($user) {

            $categories = Category::whereHas('subcategories', function ($query) use ($user) {
                $query->whereHas('services', function ($subquery) use ($user) {
                    $subquery->whereIn('id', $user);
                });
            })
                ->get(['id', 'name']);
            if ($categories) {
                return response()->json($categories);
            }
        }
    }
}
