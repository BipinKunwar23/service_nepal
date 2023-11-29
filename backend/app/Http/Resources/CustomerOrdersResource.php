<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerOrdersResource extends JsonResource
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
            'createdAt'=>$this->created_at,
            'status'=>'In Progress',
            'service'=>$service->name,


        ];
    }
}
