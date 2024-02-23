<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LandingPageController extends Controller
{
    public function askquestions(Request $request,$userId)
    {
        DB::table('askquestions')->insert([
            'user_id'=>$userId,
            'questions' => $request->questions,
            'answers' => $request->answers,

        ]);
    }
    public function successStoreis(Request $request, $userId)
    {
        DB::table('stories')->insert([
            'user_id'=>$userId,
            'storeis' => $request->stories,

        ]);
    }
    public function contactUs(Request $request)
    {
        DB::table('contacts')->insert([
            'address' => $request->address,
            'enail' => $request->email,
            'phone' => $request->phone,
            'contact' => $request->contact,


        ]);
    }
    public function headers(Request $request)
    {
        DB::table('headers')->insert([
            'headline' => $request->headline,
            'description' => $request->description,
            'image' => $request->image,


        ]);
    }
    public function aboutUs(Request $request)
    {
        DB::table('abouts')->insert([
            'name' => $request->name,
            'positon' => $request->position,
            'photo' => $request->photo,
            'description' => $request->description,


        ]);
    }

    public function legals(Request $request,$userId)
    {
        DB::table('legals')->insert([
            'service_terms' => $request->service_terms,
            'privacy' => $request->privacy,
            'security' => $request->security,


        ]);
    }

    public function getAskquestions()
    {
        DB::table('askquestions')
        ->select('id','questions','answers')
        ->get();
    }

    public function getSuccessStoreis()
    {
        DB::table('stories')->join('users','users.id','=','stories.user_id')
        ->jon('profiles','users.id','=','profile.user_id')
        ->select('stories.*','users.name','profiles.photo')
        ->get();
    }

    public function getAboutUs()
    {
        DB::table('abouts')
        ->select('abouts.*')
        ->get();
    }

    public function getHeaders()
    {
        DB::table('headers')
        ->select('headers.*')
        ->get();
    }
    public function getlegals()
    {
        DB::table('legals')
        ->select('legals.*')
        ->get();
    }
    public function getcontactUs()
    {
        DB::table('contacts')
        ->select('contacts.*')
        ->get();
    }
}
