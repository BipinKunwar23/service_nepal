<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\BrowseHistory;
use App\Models\OptionUser;
use App\Models\package;
use App\Models\ScopeUser;
use App\Models\ServiceUser;
use App\Models\Standard;
use App\Models\User;
use App\Services\RatingService;
use App\Services\ServicesService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BuyerServiceController extends Controller
{
    protected $service, $rating;
    public function __construct(ServicesService $service, RatingService $rating)
    {
        $this->service = $service;
        $this->rating = $rating;
    }
    public function getAllServiceCards()
    {
        $thresholdDate = Carbon::now()->subDays(30);
        $mostFrequentServiceId = BrowseHistory::select('service_id', DB::raw('COUNT(*) as count'))
            ->where('user_id', Auth::user()->id)
            ->where('created_at', '>=', $thresholdDate)
            ->groupBy('service_id')
            ->orderByDesc('count')
            ->take(10)
            ->pluck('service_id');

        if ($mostFrequentServiceId) {

            $query = OptionUser::whereIn('service_id', $mostFrequentServiceId)->where('status', 'active');



            $services = $this->service->getBuyerServiceCards($query)->paginate(20);

            return response()->json($services);
        }
        $query = OptionUser::where('status', 'active');
        $services = $this->service->getBuyerServiceCards($query)->paginate(20);


        return response()->json($services);
    }


    public function getServiceDetails($serviceId)
    {
        $data = $this->service->viewServiceDetails($serviceId);
        return response()->json($data);
    }

    public function getServicePackage(Request $request, $serviceId)
    {
        $package = $request->input('name');
        $data = OptionUser::with(['packages' => function ($query) use ($package) {
            $query->where('package', $package)->first();
        }, 'packages.standards', 'description:id,service_id,image'])
            ->find($serviceId);
        $standard = Standard::where('option_id', $data->option_id)->with('values')
            ->get();
        $data->standards = $standard;
        return response()->json($data);
    }
    public function getSpecificOrderDetails(Request $request, $serviceId)
    {
        $data = OptionUser::with('description')
            ->find($serviceId);

        return response()->json($data);
    }
    public function getPopularService()
    {
        $thresholdDate = Carbon::now()->subDays(30);
        $mostFrequentServiceId = BrowseHistory::select('service_id', DB::raw('COUNT(*) as count'))
            ->where('user_id', Auth::user()->id)
            ->where('created_at', '>=', $thresholdDate)
            ->groupBy('service_id')
            ->orderByDesc('count')
            ->first();
        $data = OptionUser::get();
        if ($mostFrequentServiceId) {

            $query = OptionUser::withCount('orders')->where('service_id', $mostFrequentServiceId->service_id)->where('status', 'active')
            ->orderByDesc('orders_count');

            $services = $this->service->getBuyerServiceCards($query)->paginate(20);

            return response()->json($services);
        }
    }
}
