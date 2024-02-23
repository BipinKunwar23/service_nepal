<?php 
namespace App\Services;

use App\Models\Service;

class ServicesService {
    public function getAllServices(){
        $service = Service::get();
        
        return $service;
    }
}