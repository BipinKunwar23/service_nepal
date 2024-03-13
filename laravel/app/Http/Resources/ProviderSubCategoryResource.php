<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProviderSubCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'profession'=>$this->pivot->profession,
            'description'=>$this->pivot->description,
            'available_time'=>$this->pivot->available_time,
            'available_days'=>$this->pivot->available_days,
            'available_date'=>$this->pivot->available_date,
            'available_cities'=>$this->whenLoaded('locations'),


            

            
        ];
    }
}
