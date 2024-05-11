<?php

namespace App\Http\Controllers;

use App\Events\chatEvent;
use App\Events\privateChat;
use App\Http\Resources\ChatResource;
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
                $chat = Message::find($message->latest_message_id);
                if ($chat->type === "image") {
                    $latestMessage = "sent a photo";
                } else {

                    $latestMessage = $chat->message;
                }

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

        $data = ChatResource::collection($message);
        return response()->json([
            'receiver' => $user,
            'messages' => $data
        ]);
        // event(new chatEvent);
    }
    public function deleteChat($receiverId)
    {
        Message::whereIn('sender_id', [Auth::user()->id, $receiverId])->whereIn('receiver_id', [$receiverId, Auth::user()->id])
            ->delete();
        return response()->json(200);
    }
    public function store(Request $request,  $receiverId)
    {
        if (empty($receiverId)) {
            return;
        }
        $message = null;
        if ($request->hasFile('message')) {
            $file = $request->file('message');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('chat/image', $name);
            $message = 'chat/image/' . $name;
        }



        $chats = Message::create([
            'sender_id' => Auth::user()->id,
            'receiver_id' => $receiverId,
            'type' => $request->type,

            'message' => $message ? $message : $request->message,

        ]);
        $data = new ChatResource($chats);
        event(new privateChat($data));
        return response()->json($data);
    }
}
