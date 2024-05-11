<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Category;
use App\Models\Profile;
use App\Models\Catservice;
use App\Models\CatserviceUser;
use App\Models\Service;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($user) {
            $user->password = Hash::make($user->password);
        });
    }

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'role_id',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'pivot.available_cities' => 'array'

    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
    public function services()
    {

        return  $this->belongsToMany(Service::class, 'service_user')
            // ->using(CatserviceUser::class)
           ->withTimestamps()
            ->withPivot('title', 'description', 'active', 'keywords');
    }
    public function subcategories()
    {
        return $this->belongsToMany(Subcategory::class, 'subcategory_user')->using(SubcategoryUser::class)->withPivot('profession','description','available_time', 'available_days');
    }
    public function subcategory()
    {
        return $this->belongsToMany(Subcategory::class, 'subcategory_user')->using(SubcategoryUser::class)->withPivot('profession', 'description', 'available_time', 'available_days','available_cities', 'available_date', 'special_availability', 'payment_method', 'payment_structure', 'payment_instructions', 'currency_symbol', 'delivery_charge', 'delivery_method', 'education', 'experience', 'training', 'project', 'limitation', 'terms', 'measures');
    }
    public function profile()
    {
        return $this->hasOne(Profile::class, 'user_id');
    }
    public function personal()
    {
        return $this->hasOne(Profession::class, 'user_id');
    }
    public function faqs()
    {
        return $this->hasMany(FAQ::class, 'user_id');
    }
    public function profession()
    {
        return $this->hasOne(Profession::class, 'user_id');
    }
    public function availability()
    {
        return $this->hasOne(Availability::class, 'user_id');
    }
    public function orders()
    {
        return $this->hasOne(User::class, 'user_id');
    }
    public function options()
    {
        return $this->belongsToMany(Option::class, 'option_user')->withTimestamps();
    }
    public function feedbacks()
    {
        return $this->hasMany(Feedback::class,'seller_id');
    }
    public function locations()
    {
        return $this->hasMany(Location::class,'user_id');
    }
    public function latestmessage()
    {
        return $this->hasMany(Message::class, 'sender_id', 'id')
        ->orWhere(function ($query) {
            $query->where('receiver_id', $this->id);
        })
        ->latest();
    }

    public function receivesBroadcastNotificationsOn(): string
    {
        return 'order.'.$this->id;
    }
}
