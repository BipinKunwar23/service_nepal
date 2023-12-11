<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailResource extends JsonResource
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
            'date'=>$this->date,
            'emergency'=>$this->emergency,
            'delay'=>$this->delay,
            'location'=>$this->location,
            'service'=>$this->service,
            'size'=>$this->size,
            'response'=>$this->response,
            'name'=>$this->name,
            'email'=>$this->email,
            'number'=>$this->number,
            'created'=>$this->created_at->format('Y-m-d'),
            'images'=> ImageResource::collection($this->whenLoaded('images')),
            'service_name'=>$service->name,
            'icons'=>$service->icons,
            'status'=>'Pending'

        ];
    }
}
