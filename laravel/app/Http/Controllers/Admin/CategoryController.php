<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Requests\categoryRequest;
use App\Models\Category;
use App\Models\User;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    protected $catservices;
    public function __construct(CategoryService $catservices)
    {
        $this->catservices = $catservices;
    }

    public function create(Request $request)
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

    public function getAllCategory()
    {
        $categoreis = $this->catservices->getAllCategory();
        return response()->json($categoreis);
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
            'keywords' => 'required',
        ]);

        $category = Category::find($id);



        $category->fill(collect($validate)->toArray())->save();
        return response()->json([
            'message' => 'successfully updated'
        ], 200);
    }

    public function deleteCategory(Request $request, $id)
    {

        Category::find($id)->delete();



        return response()->json([
            'message' => 'successfully deleted'
        ], 200);
    }
}
