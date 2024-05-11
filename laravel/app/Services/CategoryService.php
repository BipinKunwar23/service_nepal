<?php 
namespace App\Services;

use App\Models\Category;
 class CategoryService {
    public function getAllCategory(){
        $category = Category::get();
        
        return $category;
    }
  
 }