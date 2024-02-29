<?php

namespace App\Http\Controllers;

use App\Events\chatEvent;
use App\Events\privateChat;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        $recentUserList = Message::selectRaw('MAX(id) as latest_message_id, sender_id, receiver_id')
            ->where('sender_id', Auth::user()->id)
            ->orWhere('receiver_id', Auth::user()->id)
            ->groupBy('sender_id', 'receiver_id')
            ->orderBy('latest_message_id', 'desc')

            ->get();


        $recentUserIds = [];
        foreach ($recentUserList as $message) {
            $recentUserIds[] = $message->sender_id === Auth::user()->id ? $message->receiver_id : $message->sender_id;
        }

        // Fetch users and latest messages in a single query
        $usersWithMessages = User::select('id', 'name')->whereIn('id', $recentUserIds)->with('profile:id,user_id,photo')->get();


        $recentUserWithMessage = [];

        foreach ($recentUserList as $message) {
            $userId = $message->sender_id === Auth::user()->id ? $message->receiver_id : $message->sender_id;

            // Find the user in the fetched users

            // Find the message using the latest_message_id
            if (!in_array($userId, array_column($recentUserWithMessage, 'user_id'))) {
                $user = $usersWithMessages->firstWhere('id', $userId);
                $latestMessage = Message::find($message->latest_message_id)->message;

                $recentUserWithMessage[] = [
                    'user_id' => $userId,
                    'user' => $user,
                    'latest_message' => $latestMessage
                ];
            }

            // Add user and latest message to the array
        }

        return $recentUserWithMessage;
    }
    public function show($receiverId)
    {
        $user = User::with('profile:id,user_id,photo')->select('id', 'name')->find($receiverId);

        if (empty($receiverId)) {
            return;
        }
        $message = Message::whereIn('sender_id', [Auth::user()->id, $receiverId])->whereIn('receiver_id', [$receiverId, Auth::user()->id])
            ->get();
        return response()->json([
            'receiver' => $user,
            'messages' => $message
        ]);
        // event(new chatEvent);
    }
    public function store(Request $request,  $receiverId)
    {
        if (empty($receiverId)) {
            return;
        }

        $message = Message::create([
            'sender_id' => Auth::user()->id,
            'receiver_id' => $receiverId,
            'message' => $request->message,

        ]);
        event(new privateChat($message));
        return $message;
    }
}
