<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceDetailsResource extends JsonResource
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
            'icons'=>$this->icons,
            'description'=>$this->description,
            'pivot'=>[
                'description'=>$this->pivot->description,
               'additional_info'=>$this->pivot->additional_info,
               'refund_policy'=>$this->pivot->refund_policy,
               'terms'=>$this->pivot->terms,

                

            ],
            'scopes'=>ServiceScopeResource::collection($this->scopes)
            ];
    }
}
