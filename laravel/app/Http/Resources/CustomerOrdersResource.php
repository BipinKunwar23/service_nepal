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
        $service = $this->whenLoaded('services');
        return [
            'id' => $this->id,
            'service_id'=>$service->id,
            'service' => $service->scope->name,
            'seller' => $service->user->name,
            'package'=>$this->package,
            'quantity' => $this->quantity,
            'cost' => $this->cost,



            'status' => $this->status,
            'created_at' => $this->created_at->format('Y-m-d'),



        ];
    }
}
