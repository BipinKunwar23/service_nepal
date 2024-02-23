<?php

namespace App\Http\Resources;
use App\Http\Resources\ProfileResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $profile= $this->whenLoaded('profile');
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'email'=>$this->email,
            'profile'=>$profile->photo ?? null,
            'role'=>$this->whenLoaded('role')[0]->role
                            
                
        ];
    }
}
