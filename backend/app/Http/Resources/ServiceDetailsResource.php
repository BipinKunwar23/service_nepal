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
            'units'=>$this->units,
            'pivot'=>[
                'description'=>$this->pivot->description,
                'time'=>json_decode($this->pivot->time),
                'days'=>json_decode($this->pivot->days),
                'location'=>$this->pivot->cities,
                'expereince'=>$this->pivot->experience,
                

            ],
            'scopes'=>ServiceScopeResource::collection($this->scopes)
            ];
    }
}
