<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
// use App\Http\Resources\CategoryResource;

class ServiceResource extends JsonResource
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
            'icons'=>"http://localhost:8000/".$this->icons,
            // 'pivot'=>[
            //     'description'=>$this->pivot->description,

            // ],
            // 'images'=>ImageResource::collection($this->whenLoaded('images')),
            'scopes'=>UserScopeResource::collection($this->whenLoaded('scopes')),


           
        ];
    }
}
