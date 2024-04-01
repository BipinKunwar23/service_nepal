<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceSummaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->whenLoaded('option')->name,
            'type'=>$this->whenLoaded('service')->type,
            'orders'=>$this->orders_count,
            'status'=>$this->status,
        ];
    }
}
