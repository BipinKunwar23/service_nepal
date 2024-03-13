<?php

namespace App\Services;

use App\Events\notification as EventsNotification;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationService
{
    public function createNotification($data)
    {
        $notification = Notification::create([
            'sender_id' => Auth::user()->id,
            'receiver_id' => $data['receiver_id'],
            'type' => $data['type'],
            'title' => $data['title'],
            'body' => $data['body'],
            'link' => $data['link'],
            'link_name' => $data['link_name'],
        ]);

        $data=Notification::with('sender.profile')->find($notification->id);
        event(new EventsNotification($data));
    }

    public function viewNotification(){
        $notification=Notification::where('id',Auth::user()->id)->get();
        return $notification;
    }
}
