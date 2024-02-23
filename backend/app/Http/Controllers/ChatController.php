<?php

namespace App\Http\Controllers;

use App\Events\chatEvent;
use App\Events\privateChat;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index($receiverId)
    {
        if (empty($receiverId)) {
            return;
        }
        $message = Message::whereIn('sender_id', [Auth::user()->id, $receiverId])->whereIn('receiver_id', [$receiverId, Auth::user()->id])
            ->get();
        return response()->json($message);
        // event(new chatEvent);
    }
    public function store(Request $request,  $receiverId)
    {
        if (empty($receiverId)) {
            return;
        }
        
        $message= Message::create([
            'sender_id' => Auth::user()->id,
            'receiver_id' => $receiverId,
            'message' => $request->message,
            
        ]);
        event(new privateChat($message));
        return $message;
    }
}
