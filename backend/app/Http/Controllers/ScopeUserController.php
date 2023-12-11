<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScopeResource;
use App\Models\User;
use Illuminate\Http\Request;

class ScopeUserController extends Controller
{
    public function create(Request $request, $providerId)
    {
        $user = User::find($providerId);
        $data = $request->all();
        $collection = collect($data)->keyBy('id')
            ->map(function ($item) {
                return collect($item)->except('id')->toArray();
            });
      
        $user->scopes()->sync($collection);

        return response()->json([
            'message' => 'successflully created'
        ]);
    }

    public function getProviderScope($providerId,$serviceId)
    {

       $scope= User::whereHas('scopes',function ($query) use ($serviceId){
        $query->whereHas('services',function ($subquery) use ($serviceId){
            $subquery->where('service_id',$serviceId);
        });
    
       })
       ->with('scopes')
       ->find($providerId);
return ScopeResource::collection($scope->scopes);
    }
}
