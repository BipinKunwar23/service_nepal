<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Category;
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
}
