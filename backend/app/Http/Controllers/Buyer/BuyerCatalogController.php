<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class BuyerCatalogController extends Controller
{
    public function viewCatalog()
    {
        $value = Category::with(['subcategories','subcategories.services','subcategories.services.scopes'])->get();
        
        return response()->json($value);
    }
}
