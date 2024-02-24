<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\profileRequest;
use App\Models\Availability;
use App\Models\Location;
use App\Models\Profession;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SellerProfileController extends Controller
{

    public function createPersonal(profileRequest $request)
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
            'photo' => "http://localhost:8000/" . $path,
            'message' => 'successfullly create',

        ], 200);
    }
    public function createProfession(Request $request)
    {



        Profession::create(
            [
                'user_id' => Auth::user()->id,
                'occupation' => $request->occupation,
                'skills' => $request->skills,
                'experience' => $request->experience,

                'education' => $request->education,
                'training' => $request->training,
                'certificate' => $request->certificate

            ]
        );
        return response()->json([
            'message' => 'successfullly created',

        ], 200);
    }

    public function createAvailability(Request $request)
    {
        Availability::create(
            [
                'user_id' => Auth::user()->id,
                'days' => $request->days,
                'time' => $request->time,


            ]
        );
        foreach ($request->cities as $city) {
            Location::create([
                'user_id' => Auth::user()->id,
                'city' => $city->city,

            ]);
        }
        return response()->json([
            'message' => 'successfullly updated',

        ], 200);
    }

    public function createSecurity(Request $request)
    {

        $data = Profile::where('user_id', Auth::user()->id)->update(['phone_number' => $request->phone_number]);
        if ($data) {
            $user = User::find(Auth::user()->id);
            $user->update(['role_id' => 2]);
        }
        return response()->json([
            'message' => 'successfully setup',
            'role' => "seller",

        ]);
    }
}
