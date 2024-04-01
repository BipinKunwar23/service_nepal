<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\CompanyFaqs;
use App\Models\Legal;
use App\Models\Team;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class AboutUsController extends Controller
{
    public function viewCompanyInformation()
    {
        $company = Company::first();
        if (!$company) {
            return false;
        }
        return response()->json($company);
    }

    public function viewTeams()
    {
        $team = Team::get();
        return response()->json($team);
    }
    public function viewFaqs()
    {
        $faqs = CompanyFaqs::get();
        return $faqs;
    }
    public function viewLegals()
    {
        $legal = Legal::get();
        return $legal;
    }
    public function viewTestimonials()
    {
        $testimonial = Testimonial::get();
        return $testimonial;
    }
 
    public function addCompanyInformation(Request $request)
    {

        $path = null;
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('company', $name);
            $path = 'company/' . $name;
        }

        Company::create(
            [
                'name' => $request->name,

                'mission' => $request->mission,
                'location' => $request->location,
                'mission' => $request->mission,

                'photo' => $path,
                'contact' => $request->contact,
                'email' => $request->email
            ]
        );
        return response()->json([
            'message' => 'successfullly create',

        ], 200);
    }
    public function addTeams(Request $request)
    {
        $path = null;
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('company/team', $name);
            $path = 'company/team/' . $name;
        }

        Team::create(
            [
                'role' => $request->role,
                'name' => $request->name,
                'bio' => $request->bio,

                'photo' => $path,
            ]
        );
        return response()->json([
            'message' => 'successfullly created',

        ], 200);
    }
    public function addTestimonials(Request $request)
    {
        $path = null;
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('company/testimonial', $name);
            $path = 'company/testimonial/' . $name;
        }

        Testimonial::create(
            [
                'name' => $request->name,
                'email' => $request->email,
                'company' => $request->company,
                'testimonial' => $request->testimonial,

                'photo' => $path,
            ]
        );
        return response()->json([
            'message' => 'successfullly created',

        ], 200);
    }

    public function addFaqs(Request $request)
    {

        CompanyFaqs::create(
            [
                'question' => $request->question,
                'answer' => $request->answer,

            ]
        );
        return response()->json([
            'message' => 'successfullly created',

        ], 200);
    }

    public function addLegalInformation(Request $request)
    {

        Testimonial::create(
            [
                'service_terms' => $request->service_terms,

                'privacy' => $request->privacy,
                'security' => $request->security,

            ]
        );
        return response()->json([
            'message' => 'successfullly created',

        ], 200);
    }

    public function editCompanyInformation(Request $request, Company $company)
    {


        if ($request->hasFile('photo')) {
            $destination = $company->photo;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('company', $name);
            $path = 'company/' . $name;
        } else {
            $path = $company->photo;
        }

        $company->name = $request->name;
        $company->mission = $request->mission;
        $company->email = $request->email;
        $company->contact = $request->contact;
        $company->location = $request->location;

        $company->photo = $path;
        $company->save();
        return response()->json([
            'message' => 'successfullly created',

        ], 200);
    }

    public function editTeams(Request $request, Team $member)
    {


        if ($request->hasFile('photo')) {
            $destination = $member->photo;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('company/team', $name);
            $path = 'company/team/' . $name;
        } else {
            $path = $member->photo;
        }

        $member->name = $request->name;
        $member->role = $request->role;
        $member->bio = $request->bio;



        $member->photo = $path;
        $member->save();
        return response()->json([
            'message' => 'successfullly created',

        ], 200);
    }
    public function editFaqs(Request $request, $id)
    {

$faqs=CompanyFaqs::find($id);
       

        $faqs->question = $request->question;
        $faqs->answer = $request->answer;
       
        $faqs->save();
        return response()->json([
            'message' => 'successfullly created',

        ], 200);
    }
}
