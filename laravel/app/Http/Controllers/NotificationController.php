<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    protected $notificaiton;
    public function __construct(NotificationService $notificaiton)
    {
        $this->notificaiton = $notificaiton;
    }
    
    public function getNotifications()
    {
        $notificaiton = Notification::where('notifiable_id', Auth::user()->id)->latest()->get();
        return response()->json($notificaiton);
    }
}
