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
        $customer=$this->whenLoaded('customers');

        return [
            'id'=>$this->id,
            'created'=>$this->created_at->format('Y-m-d'),
            'buyer'=>$customer->name,
            'service'=>$service->scope->name,
            'package'=>$this->package,
            'quantity'=>$this->quantity,
            'status'=>$this->status

        ];
    }
}
