<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PorviderCategoryDetailResource extends JsonResource
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
            'name'=>$this->name,
            'detail'=>[
                'profession'=>$this->pivot->profession,
                'description'=>$this->pivot->description,
                'available_time'=>$this->pivot->available_time,
                'available_days'=>$this->pivot->available_days,
                'available_cities'=>$this->pivot->available_cities,
                'available_date'=>$this->pivot->available_date,
                'special_availability'=>$this->pivot->special_availability,
                'payment_method'=>$this->pivot->payment_method,
                'payment_structure'=>$this->pivot->payment_structure,
                'payment_instructions'=>$this->pivot->payment_instructions,
                'currency_symbol'=>$this->pivot->currency_symbol,
                'delivery_charge'=>$this->pivot->delivery_charge,
                'delivery_method'=>$this->pivot->delivery_method,
                'education'=>$this->pivot->education,
                'experience'=>$this->pivot->experience,
                'training'=>$this->pivot->training,
                'project'=>$this->pivot->project,
                'limitation'=>$this->pivot->limitation,
                'terms'=>$this->pivot->terms,
                'measures'=>$this->pivot->measures,


                

            ],
            'services'=> ServiceResource::collection($this->whenLoaded('services')),
        ];
    }
}
