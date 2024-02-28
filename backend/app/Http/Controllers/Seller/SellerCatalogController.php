<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Service;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class SellerCatalogController extends Controller
{
    protected $catservices;
    public function __construct(CategoryService $catservices)
    {
        $this->catservices = $catservices;
    }

    public function viewCategory()
    {
        $categoreis = $this->catservices->getAllCategory();
        return response()->json($categoreis);
    }

    public function viewService()
    {
        $categoreis = Service::get();
        return response()->json($categoreis);
    }

    public function viewCatalog()
    {
        $value = Category::with(['subcategories','subcategories.services','subcategories.services.scopes'])->get();
        
        return response()->json($value);
    }
}
