<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Service extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public $service;
    public function __construct($service)
    {
        $this->service = $service;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */


    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'user' => $this->service['user'],
            'photo' => $this->service['photo'],
            'subject' => $this->service['subject'],
            'service' => $this->service['service'],

        ];
    }
    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'data' => [
                'user' => $this->service['user'],
                'photo' => $this->service['photo'],
                'subject' => $this->service['subject'],
                'service' => $this->service['service'],

            ],
            'created_at' => now(),


        ]);
    }
}
