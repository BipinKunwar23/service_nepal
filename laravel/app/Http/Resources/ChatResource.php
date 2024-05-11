<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'sender_id'=>$this->sender_id,
            'receiver_id'=> intval($this->receiver_id),
            'type'=>$this->type,
            'message'=> $this->type==="image" ? "http://localhost:8000/".$this->message : $this->message,

        ];
    }
}
