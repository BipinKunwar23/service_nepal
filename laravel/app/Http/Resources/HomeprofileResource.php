<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HomeprofileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'phone_number'=>$this->phone_number,
            'address'=>$this->address,
            'photo'=>$this->photo,
            'bio'=>$this->bio
        ];
    }
}
