<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class serviceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $action = $this->route()->getActionMethod();
        switch ($action) {
            case 'create':
                return [
                    'name' => 'required',
                    'description' => 'sometimes',
                    'image' => 'sometimes',
                    'icons'=>'sometimes',
                    'keywords'=>'required'
                ];
            case 'updateService':
              
        }
    }
}
