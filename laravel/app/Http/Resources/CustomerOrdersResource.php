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
            'service' => $service->option->name,
            'seller' => $service->user->name,
            'quantity' => $this->quantity,



            'status' => $this->status,
            'created_at' => $this->service_date,



        ];
    }
}
