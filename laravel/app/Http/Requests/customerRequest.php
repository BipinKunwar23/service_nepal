<?php

namespace App\Http\Requests;

use App\Traits\customer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class customerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */

    use customer;

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
                return array_merge($this->commonRules(), [
                    'email' => ['required', 'email', 'unique:customers,email'],
                    'phone_number' => ['required', 'regex:/^[0-9]{10}$/', 'unique:customers,phone_number'],
                ]);


            case 'update':
                return array_merge(collect($this->commonRules())->except('password')->all(), [
                    'email' => ['required', 'email', Rule::unique('customers', 'email')->ignore($this->customer->id)],
                    'phone_number' => ['required', 'regex:/^[0-9]{10}$/', Rule::unique('customers', 'phone_number')->ignore($this->customer->id)],

                ]);
            case 'login':
                return [
                    'email' => ['required', 'email', 'exists:customers,email'],
                    'password' => 'required',
                ];
            default:
                return [];
        }
    }
}
