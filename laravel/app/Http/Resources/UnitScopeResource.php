<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UnitScopeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return
         [
            'id'=>$this->name,

            'name'=>$this->name,
            'units'=>$this->units,
            'scopes'=>ServiceScopeResource::collection($this->whenLoaded('scopes'))

        ];
    }
}
