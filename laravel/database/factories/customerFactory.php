<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Validation\Rules\Enum;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\customer>
 */
class customerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name'=>fake()->firstName(),
            'last_name'=>fake()->lastName(),
            'email'=>fake()->unique()->email(),
            'password'=>fake()->password_hash(),
            'location'=>[
                'district'=>fake()->country(),
                'muncipility'=>fake()->city(),
                'ward'=>rand(1),

            ],
            'gender'=>fake(),
            'date_of_birth'=>fake()->date(),
            'phone_number'=>fake()->phoneNumber(),
            //
        ];
    }
}
