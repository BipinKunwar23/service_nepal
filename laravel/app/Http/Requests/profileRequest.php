<?php

namespace App\Http\Requests;

use App\Traits\profile;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class profileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    use profile;
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
                        // 'phone_number' => ['required', 'regex:/^[0-9]{10}$/', 'unique:profiles,phone_number']
                    ]);
    
    
                case 'createOrUpdate':
                    return array_merge(collect($this->commonRules())->except('password')->all(), [
                        // 'email'=>['required', Rule::unique('users','email')->ignore($this->id)],
                        // 'phone_number' => ['required', 'regex:/^[0-9]{10}$/', Rule::unique('profiles', 'phone_number')->ignore($this->id,'user_id')],
    
                    ]);
             
                default:
                    return [];
            }
        
    }
}
