<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\profileRequest;
use App\Models\Availability;
use App\Models\FAQ;
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
                'address' => $request->address,
                'phone_number'=>$request->phone_number
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
        $personal->phone_number = $request->phone_number;


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

    public function createFaq(Request $request, $serviceId)
    {


        foreach ($request->faqs as  $items) {
            FAQ::create([
                'user_id' => Auth::user()->id,
                'question' => $items['question'],
                'answer' => $items['answer'],
            ]);
        }

        return response()->json([
            'message' => 'successfully inserted'
        ], 200);
    }

    public function updateFaq(Request $request, $serviceId)
    {
  
        FAQ::where('user_id', $serviceId)->delete();
        foreach ($request->faqs as  $items) {

            FAQ::create([
                'user_id' => Auth::user()->id,
                'question' => $items['question'],
                'answer' => $items['answer'],
            ]);
        }

        return response()->json([
            'message' => 'successfully inserted'
        ], 200);
    }

    public function createSecurity(Request $request)
    {

        Profile::where('user_id', Auth::user()->id)->update(['phone_number' => $request->phone_number]);
    
        return response()->json([
            'message' => 'successfully setup',

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
        $user=User::with(['profile','profession','profession.occupation'=>function($query){
            $query->select('id', 'id as value', 'name as label');

        },'availability','faqs:user_id,question,answer','locations'=>function($query){
            $query->select('user_id','city');
        }])
       ->select('id','name') ->find(Auth::user()->id);
        return $user;
      


        return response()->json($user);
    }
}
