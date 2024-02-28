<?php 
namespace App\Services;

use App\Models\ScopeUser;
use App\Models\Service;

class ServicesService {
    public function getAllServices(){
        $service = Service::get();
        
        return $service;
    }

    public function viewServiceDetails($serviceId){
        
      $data = ScopeUser::
      with(['user:id,name','user.profile','user.profession','user.availability','category:id,name', 'subcategory:id,name', 'service:id,name', 'scope:id,name', 'prices.packages', 'faqs', 'galleries', 'requirements'])
       ->find($serviceId);
  
  
      return $data;
    }
}