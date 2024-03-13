<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\profileRequest;
use App\Models\Availability;
use App\Models\Location;
use App\Models\Profession;
use App\Models\Profile;
use App\Models\Qualification;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

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
                'name' => $request->name,

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

    public function updatePersonal(Request $request)
    {
        $personal = Profile::where('user_id', Auth::user()->id)->first();
        if ($request->hasFile('photo')) {
            $destination = $personal->photo;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('profile/image', $name);
            $path = 'profile/image/' . $name;
        } else {
            $path = $personal->photo;
        }

        $personal->user_id = Auth::user()->id;
        $personal->name = $request->name;
        $personal->bio = $request->bio;
        $personal->photo = $path;
        $personal->language = $request->language;
        $personal->address = $request->address;

        $personal->save();


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

    public function updateProfession(Request $request)
    {

        $profession = Profession::where('user_id', Auth::user()->id)->first();
        $profession->fill(collect($request->all())->put('user_id', Auth::user()->id)->toArray())->save();


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
                'city' => $city['city'],

            ]);
        }
        return response()->json([
            'message' => 'successfullly updated',

        ], 200);
    }

    public function updateAvailability(Request $request)
    {
        $availability = Availability::where('user_id', Auth::user()->id)->first();


        $availability->user_id = Auth::user()->id;
        $availability->days = $request->days;
        $availability->time = $request->time;

        $availability->save();

        Location::where('user_id', Auth::user()->id)->delete();





        foreach ($request->cities as $city) {
            Location::create([
                'user_id' => Auth::user()->id,
                'city' => $city['city'],

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
    public function setRole()
    {
        User::find(Auth::user()->id)->update(['role_id' => 3]);
        $personal = Profile::where('user_id', Auth::user()->id)->first();

        return response()->json([
            'message' => 'successfully created',
            'role' => "seller",
            'photo' => 'http://localhost:8000/' . $personal->photo
        ]);
    }
    public function getRole()
    {
        $role=User::find(Auth::user()->id)->role->role;

        return response()->json([
            'role'=>$role
        ]);
    }
    public function viewProfile()
    {
        $personal = Profile::where('user_id', Auth::user()->id)->first();
        $profession = Profession::where('user_id', Auth::user()->id)
            ->with(['occupation' => function ($query) {
                $query->select('id', 'id as value', 'name as label');
            }])
            ->first();
        $skills =
            $cities = Location::select('city')->where('user_id', Auth::user()->id)->get();
        $availability = Availability::where('user_id', Auth::user()->id)->first();



        return response()->json([
            'personal' => $personal,
            'profession' => $profession,
            'availability' => $availability,
            'cities' => $cities,

        ]);
    }
}
