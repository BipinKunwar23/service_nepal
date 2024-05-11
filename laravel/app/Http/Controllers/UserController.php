<?php

namespace App\Http\Controllers;

use App\Events\UserStatusEvent;
use App\Http\Requests\useAuthRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class UserController extends Controller
{
    public function create(useAuthRequest $request)
    {
        $validate = $request->validated();
        $user = User::create(collect($validate)->put('role_id', 2)->toArray());
        $token = $user->createToken('mytoken')->plainTextToken;


        return response()->json([
            'token' => $token,
            'id' => $user->id,
            'name' => $user->name,
            'message' => 'Register successfully',
            'role' => 'buyer',

        ], 200)->withCookie('mytoken', $token, 1000);

        //         $cookie = Cookie::make('auth_token', $user->remember_token, 3600);
        // $response = Response::json('remember_token' => $user->remember_token, 200);
        // $response->headers->setCookie($cookie);
        // return $response;
    }

    public function login(useAuthRequest $request)
    {

        $validate = $request->validated();

        $user = User::where('email', $validate['email'])->first();
        $profile = $user->profile;

        if (!Hash::check($validate['password'], $user->password))
            throw ValidationException::withMessages([
                'password' => 'Wrong password',
            ]);
        $token = $user->createToken('mytoken')->plainTextToken;

        return response()->json([
            'message' => 'Login successfully ',
            'id' => $user->id,
            'status' => 200,
            'photo' => $profile ? "http://localhost:8000/" . $profile->photo : null,
            'name' => $user->name,
            'role' => $user->role->role,
            'token' => $token,
        ], 200)->withCookie('mytoken', $token, config('sanctum.lifetime'), null, null, true, true);
    }


    public function update(useAuthRequest $request, User  $user)
    {

        $validate = $request->validated();
        $token = null;
        $email = null;
        DB::transaction(function () use ($validate, $user, &$token, &$email) {
            $user->fill($validate)->save();
            $token = $user->createToken('mytoken')->plainTextToken;
            $email = $user->email;
        });
        return response()->json([
            'status' => 200,
            'message' => 'successfullly updated',
            'email' => $email,
            'token' => $token
        ]);
    }
    public function delete(User $user)
    {
        $user->delete();
        return response()->json([
            'status' => 200,
            'message' => 'deleted succssfully'
        ], 200);
    }

    public function providerAuth($id)
    {
        $user = User::has('profile')->find($id);
        if ($user) {
            return true;
        }
        return false;
    }

    public function viewAll()
    {
        $users = User::all();
        $data = [];
        foreach ($users as $user) {
            $data[] = collect($user)->except('password');
        }
        return response()->json([
            'data' => $data,
            'status' => 200

        ], 200);
    }
    public function viewById(User $user)
    {

        return response()->json([
            'data' => collect($user)->except('password'),
            'status' => 200

        ], 200);
    }
}
