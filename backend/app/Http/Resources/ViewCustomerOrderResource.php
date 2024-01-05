<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ViewCustomerOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $service = $this->whenLoaded('services');
        $providers = $this->whenLoaded('providers');



     
        return [
            'id' => $this->id,
            'service_date' => $this->service_date,
            'emergency' => $this->emergency,
            'max_delay' => $this->max_delay,
            'delivery_location' => $this->delivery_location,
            'service_detail' => $this->service_detail,
            'response_time' => $this->response_time,
            'accept_terms' => $this->accept_terms,
            'isOrder' => $this->isOrder,
            'created' => $this->created_at->format('Y-m-d'),
            'service_name' => $service->name,
            'icons' => $service->icons,
            'status' => $this->status,
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'provider' => new ProviderOrderProfileResource($this->whenLoaded('providers')),
            'providerScopes' =>  ScopeProviderResource::collection($providers->scopes),
            'customerScopes' => ScopeOrderResource::collection($this->whenLoaded('scopes'))


        ];
    }
}
