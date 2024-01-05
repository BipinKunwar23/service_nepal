<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProviderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $profile=$this->whenLoaded('profile');
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'rating'=>5 ,
            'image'=>"http://localhost:8000/".$profile->photo,
            'category'=>ProviderSubCategoryResource::collection($this->whenLoaded('subcategory')),

        ];
    }
    
   

}
