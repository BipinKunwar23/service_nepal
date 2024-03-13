<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProviderOrderProfileResource extends JsonResource
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
                'name'=>$this->name,
                'email'=>$this->email,
                'phone'=>$profile->phone_number,
                'address'=>$profile->address

            ];
    }
}
