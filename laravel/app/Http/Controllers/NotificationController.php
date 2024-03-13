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
    public function createNotificaitons()
    {
        $request = [
            'receiver_id' => 4,
            'type' => 'orders',
            'title' => 'sevice confirmation',
            'body' => '
      Lorem g elit. At atque repudiandae earum a, dgdfgdr sfsdfsd commodi voluptatem, dolorum officiis?
            
            ',
            'link' => '',
            'link_name' => ''
        ];
        $data = $this->notificaiton->createNotification($request);
        return response()->json($data);
    }
    public function getNotifications()
    {
        $notificaiton = Notification::where('receiver_id', Auth::user()->id)
            ->with('sender.profile')->get();
        return response()->json($notificaiton);
    }
}
