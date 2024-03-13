<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $order = $this->whenLoaded('orders');
        return [
            'id' => $this->id,
            'current_status' => $this->current_status,
            'expected_completion' => $this->expected_completion,
            'upcoming_works' => $this->upcoming_works,
            'delivery_charge' => $this->delivery_charge,
            'emergency_charge' => $this->emergency_charge,
            'delivery_charge' => $this->delivery_charge,
            'discount' => $this->discount,
            'additional_charge' => $this->additional_charge,
            'discount' => $this->discount,
            'qrcode' => "http://localhost:8000/" . $this->qrcode,
            'esewa' => $this->esewa,
            'total_cost' => $this->total_cost,



            'paid_amount' => $this->paid_amount,
            'payment_due_date' => $this->payment_due_date,
            'payment_method' => $this->payment_method,
            'issue_challenge' => $this->issue_challenge,
            'service_delay' => $this->service_delay,
            'delay_reason' => $this->delay_reason,

            'additional_notes' => $this->additional_notes,

            'image' => "http://localhost:8000/" . $this->image,
            'created_at' => $this->created_at->format('Y-m-d'),
            'updated_at' => $this->updated_at->format('Y-m-d'),
            'completed_works' => ScopeCompletedResource::collection($this->whenLoaded('works')),
            'ordered_works' => OrderScopeResource::collection($order->scopes),
            'materials' => MaterialResource::collection($this->whenLoaded('materials'))


        ];
    }
}
