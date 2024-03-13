<?php 
namespace App\Services;

use App\Models\User;

 class UserService{
    public function getUserDetails ($userId){
        $user=User::where('id',$userId)
        ->with(['profile','profession','availability'])
        ->first();
        return $user;
    }
    


}