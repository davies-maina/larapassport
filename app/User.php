<?php

namespace App;

use App\Role;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ResetPasswordNotifiation;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_online_at' => 'datetime',
    ];

    /* protected $dateFormat = 'U'; */

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\PasswordResetRequest($token));
    }

    public function roles()
    {

        return $this->belongsToMany(Role::class);
    }

    public function hasAnyRoles($roles)
    {
        if ($this->roles()->whereIn('name', $roles)->first()) {
            return true;
        }
        return false;
    }
    public function hasRole($role)
    {
        if ($this->roles()->where('name', $role)->first()) {
            return true;
        }
        return false;
    }
}
