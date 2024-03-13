<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserScopeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $scopes=$this->whenLoaded('users')[0];
        
       
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'price'=>$scopes->pivot->price,
            'unit'=>$scopes->pivot->unit
        ];
    }
}
