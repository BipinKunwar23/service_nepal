<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ViewServiceResource extends JsonResource
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
           
            'pivot'=>[
                'description'=>$this->pivot->description,
                
                // 'scopes'=>ServiceScopeResource::collection($this->whenLoaded('scopes')),
                'additional_info'=>$this->pivot->additional_info,
                'refund_policy'=>$this->pivot->refund_policy,
                'terms'=>$this->pivot->terms,

                

            ],
            'images'=>ImageResource::collection($this->whenLoaded('images')),

            
        ];
    }
}
