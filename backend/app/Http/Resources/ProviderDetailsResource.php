<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProviderDetailsResource extends JsonResource
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
            'email'=>$this->email,
            'rating'=>5,
            'profile'=> new HomeprofileResource($this->whenLoaded('profile')),
            'category'=>new PorviderCategoryDetailResource($this->whenLoaded('subcategories')[0])
        ];
    }
}
