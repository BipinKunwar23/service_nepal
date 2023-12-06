<?php

namespace App\Http\Controllers;

use App\Models\Scope;
use App\Models\Service;
use Illuminate\Http\Request;

class ScopeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, $serviceId)
    {
        
        $validate = $request->validate([
            'name' => ['required', 'unique:categories,name'],
            'service_id' => 'sometimes',
        ]);

        $scope= new Scope();
        $scope->name=$request->name;
        $scope->service_id=$serviceId;

        $scope->save();
        return response()->json([
            'message' => 'successfulluy create',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $scopes=Scope::all();
        return response()->json($scopes);
    }
    public function showByServiceId($serviceId)
    {
        $service=Service::find($serviceId);
        $scopes=$service->scopes;
        return response()->json($scopes);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Scope $scope)
    {
          
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Scope $scope)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Scope $scope)
    {
        //
    }
}
