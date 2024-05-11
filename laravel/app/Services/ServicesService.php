<?php

namespace App\Services;

use App\Models\Feedback;
use App\Models\Lists;
use App\Models\OptionUser;
use App\Models\Service;
use App\Models\ServiceUser;
use App\Models\Standard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ServicesService
{
  public function getBuyerServiceCards($query)
  {
 

    $services = $query->with( ['user:id,name','option:id,name','service:id,name','user.feedbacks'=>function($query){
      $query->selectRaw('seller_id, COUNT(stars) as count_rating, AVG(stars) as average_rating')->groupBy('seller_id');
    }, 'service:id,type', 'user.profile:id,user_id,photo','description','lists']);

    return $services;


  }

  public function viewServiceDetails($serviceId)
  {
    // $list=Lists::where('user_id',8)->pluck('id');
    // return $list;
    $service = OptionUser::find($serviceId);
    if ($service->service->type === "specific") {
      $services = OptionUser::with(['user:id,name,email', 'user.profile','lists', 'user.profession', 'user.availability','user.faqs','user.locations',  'option:id,name', 'service:id,name,subcategory_id,type', 'service.subcategory:id,name,category_id', 'service.subcategory.category:id,name',  'description'])
        ->find($serviceId);

        return [
          'services' => $services,
        ];
    }

    $services = OptionUser::with(['user:id,name,email', 'user.profile','lists', 'user.profession', 'user.availability','user.locations','option:id,name','user.faqs', 'service:id,name,subcategory_id,type', 'service.subcategory:id,name,category_id', 'service.subcategory.category:id,name', 'description', 'packages.standards', 'galleries', 'requirements'])
      ->find($serviceId);
    $standards = Standard::where('option_id', $services->option_id)->with('values')
      ->get();


    return [
      'services' => $services,
      'standards' => $standards
    ];
  }
  public function viewSpecificServiceDetails($serviceId)
  {
    // $list=Lists::where('user_id',8)->pluck('id');
    // return $list;
    $services = OptionUser::with(['user:id,name', 'user.profile', 'user.profession', 'user.availability',  'option:id,name', 'service:id,name,subcategory_id,nature', 'service.subcategory:id,name,category_id', 'service.subcategory.category:id,name',  'description'])
      ->find($serviceId);
      return [
        'services' => $services,
      ];
  }
}
