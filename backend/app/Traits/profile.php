<?php

namespace App\Traits;

use Illuminate\Validation\Rule;

trait profile
{
    public function commonRules()
    {
        return [
            'name' => ['required', 'string'],
            'bio' => ['string', 'sometimes'],
            'photo' => ['required','image','mimes:jpeg,png,jpg'],



            'address' => ['string','sometimes'],
            'language' => ['string','sometimes'],

           



            // 'photo'=>['required','file'],

        ];
    }
}
