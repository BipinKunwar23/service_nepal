<?php

namespace App\Http\Requests;

use App\Traits\users;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class useAuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */

     use users;
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
                    return array_merge($this->commonRules(), [
                        'email' => ['required', 'email',Rule::unique('users')],
                        
                    ]);
    
    
                case 'update':
                    return array_merge(collect($this->commonRules())->except('password')->all(), [
                        'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($this->user->id)],
                        'phone_number' => ['required', 'regex:/^[0-9]{10}$/', Rule::unique('users', 'phone_number')->ignore($this->user->id)],
    
                    ]);
                case 'login':
                    return [
                        'email' => ['required', 'email', Rule::exists('users')],
                        'password' => 'required',
                    ];
                default:
                    return [];
            }
    }
}
