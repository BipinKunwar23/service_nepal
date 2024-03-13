<?php

namespace App\Http\Requests;

use App\Traits\provider;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class providerRequest extends FormRequest
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
    public function rules()
    {
    
        $action = $this->route()->getActionMethod();
        switch ($action) {
            case 'create':
                return array_merge($this->personalInfo(), [
                    'email' => ['required', 'email', 'unique:customers,email'],
                    'phone_number' => ['required', 'regex:/^[0-9]{10}$/', 'unique:providers,phone_number'],
                ]);


            case 'update':
                return array_merge(collect($this->personalInfo())->except('password')->all(), [
                    'email' => ['required', 'email', Rule::unique('providers', 'email')->ignore($this->provider->id)],
                    'phone_number' => ['required','regex:/^[0-9]{10}$/', Rule::unique('providers', 'phone_number')->ignore($this->provider->id)],

                ]);
                case 'login':
                    return [
                        'email' => ['required', 'email', 'exists:providers,email'],
                        'password' => 'required',
                    ];
            default:
                return [];
        }
    }
}
