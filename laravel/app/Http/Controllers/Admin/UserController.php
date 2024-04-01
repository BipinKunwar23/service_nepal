<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OptionUser;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function viewAllUsers()
    {
        $users = User::whereNot('role_id',1)-> with('profile')->get();
        return $users;
    }

    public function viewAllServices()
    {
        $data = OptionUser::with(['user.profile', 'option:id,name'])
            ->get();
        return $data;
    }
    public function ApproveService($serviceId)
    {
        OptionUser::find($serviceId)->update(['status' => 'active']);
        return response()->json('successfully saved');
    }
    public function requestModification($serviceId)
    {
        OptionUser::find($serviceId)->update(['status' => 'Require Modification']);
        return response()->json('successfully saved');
    }
    public function denyService($serviceId)
    {
        OptionUser::find($serviceId)->update(['status' => 'Denied']);
        return response()->json('successfully saved');
    }
    public function viewAllOrders()
    {
        $data = Order::with(['service','bueyr','seller', 'option:id,name'])
            ->get();
        return $data;
    }
}
