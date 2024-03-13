<?php

namespace App\Http\Requests;

use App\Traits\catservice_provider;
use Illuminate\Foundation\Http\FormRequest;

class catservice_providerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    use catservice_provider;
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
            case 'createServices':
                return $this->commonRules();

            case 'editProviderService':
                return $this->commonRules();
        }
    }
}
