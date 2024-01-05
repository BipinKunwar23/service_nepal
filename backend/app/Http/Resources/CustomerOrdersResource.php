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
            'service' => $service->name,
            'provider' => new ProviderOrderProfileResource($this->whenLoaded('providers')),
            'created'=>$this->created_at->format('Y-m-d'),
            'status' => $this->status


        ];
    }
}
