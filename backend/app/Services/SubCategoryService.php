<?php 
namespace App\Services;

use App\Models\Subcategory;

class SubCategoryService {
    public function getAllSubCategory(){
        $subcategory = Subcategory::get();
        
        return $subcategory;
    }
}