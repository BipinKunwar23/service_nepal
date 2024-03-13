<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OptionUser;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function viewAllUsers()
    {
        $users = User::all();
        return $users;
    }

    public function viewAllServices()
    {
        $data = OptionUser::with(['user.profile', 'option:id,name'])
            ->get();
        return $data;
    }
}
