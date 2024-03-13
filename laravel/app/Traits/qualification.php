<?php
namespace App\Traits;
trait qualification{
    public function commonRules(){
        return [
            'education'=>['required'], 
            'special_degree'=>'sometimes',
            'profession'=>'required',
            'skills'=>'required',
            'training'=>'sometimes',
            'experience'=>'required',
            'expertise'=>'sometimes',
            'projects'=>'sometimes',
            'recent-workshop'=>'sometimes',
            'previous_work'=>'sometimes',
            'researches'=>'sometimes',
            'certification'=>'sometimes',
            'license'=>'sometimes',
            'gallery'=>'sometimes',

        ];
    }
}