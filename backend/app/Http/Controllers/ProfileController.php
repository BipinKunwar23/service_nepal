<?php

namespace App\Http\Controllers;

use App\Http\Requests\profileRequest;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\UserResource;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class ProfileController extends Controller
{



    public function viewProfile()
    {

        $profile = User::with('profile', 'role')->find(Auth::user()->id);


        return  new UserResource($profile);
    }
    public function create(profileRequest $request)
    {

        $path = null;
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('profile/image', $name);
            $path = 'profile/image/' . $name;
        }

        Profile::create(
            [
                'user_id' => Auth::user()->id,

                'bio' => $request->bio,
                'photo' => $path,
                'language' => $request->language,
                'address' => $request->address
            ]
        );
        return response()->json([
            'photo' =>"http://localhost:8000/". $path,
            'message' => 'successfullly create',

        ], 200);
    }
 
    public function delete(Profile $profile)
    {
        $profile->delete();
        return response()->json([
            'message' => 'successfullly deleted',

        ], 200);
    }
}
