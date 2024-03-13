<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProvideCardSubcatgResource extends JsonResource
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
            'category'=> new ProviderCardBySubcatgResource($this->category),
            'services'=>ProviderServiceResource::collection($this->whenLoaded('services'))


        ];;
    }
}
