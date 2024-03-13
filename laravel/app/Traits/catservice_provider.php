<?php
namespace App\Traits;
 trait catservice_provider{
public function commonRules(){
    return [
        'sid' => 'required',
        'description' => 'sometimes',
        'charge' => 'required',
        'time' => 'required',
        'offers' => 'sometimes',
        'experience' => 'sometimes',
        'image' => 'sometimes',
        'address' => 'required',
        // 'service.*.availabe_date' => 'required|date',
    ];
}

}