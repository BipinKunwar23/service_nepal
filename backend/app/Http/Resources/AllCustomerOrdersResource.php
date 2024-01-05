<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AllCustomerOrdersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $service=$this->whenLoaded('services');
        return [
            'id'=>$this->id,
            'created'=>$this->created_at->format('Y-m-d'),
            'name'=>$this->name,
            'email'=>$this->email,
            'contact'=>$this->number,
            'service'=>$service->name,
            'icons'=>$service->icons,
            'status'=>$this->status

        ];
    }
}
