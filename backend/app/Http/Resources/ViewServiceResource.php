<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ViewServiceResource extends JsonResource
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
            'name'=>$this->name,
           
            'pivot'=>[
                'description'=>$this->pivot->description,
                'time'=>json_decode($this->pivot->time),
                'days'=>json_decode($this->pivot->days),
                'cities'=>json_decode($this->pivot->cities),
                'currency'=>$this->pivot->currency,
                // 'scopes'=>ServiceScopeResource::collection($this->whenLoaded('scopes')),
                'additional_info'=>$this->pivot->additional_info,
                'expereince'=>$this->pivot->experience,
                'expereince_certificate'=>$this->pivot->experience_certificate,
                'trainings'=>$this->pivot->trainings,
                'training_certificate'=>$this->pivot->training_certificate,
                'projects'=>$this->pivot->projects,
                'project_certificate'=>$this->pivot->project_certificate,


                

            ],
            'images'=>ImageResource::collection($this->whenLoaded('images')),

            
        ];
    }
}
