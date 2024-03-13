<?php 
namespace App\Services;

use App\Models\OptionUser;
use App\Models\Service;

class ServicesService {
    public function getAllServices(){
        $service = Service::get();
        
        return $service;
    }

    public function viewServiceDetails($serviceId){
        
      $data = OptionUser::
      with(['user:id,name','user.profile','user.profession','user.availability','category:id,name', 'subcategory:id,name', 'service:id,name', 'option:id,name', 'packages.standards', 'faqs', 'galleries', 'requirements'])
       ->find($serviceId);
  
  
      return $data;
    }
}