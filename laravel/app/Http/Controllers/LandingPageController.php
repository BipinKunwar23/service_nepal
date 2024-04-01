<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyFaqs;
use App\Models\Legal;
use App\Models\Team;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LandingPageController extends Controller
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
        return $team;
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
    public function getLandingPageData()
    {
        return [
            'teams' => $this->viewTeams(),
            'faqs' => $this->viewFaqs(),
            'testimonial' => $this->viewTestimonials(),

        ];
    }

    
}
