<?php

namespace App\Http\Controllers\Admin;

use App\Role;
use App\User;
use Illuminate\Http\Request;
use Gate;
use App\Http\Controllers\Controller;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with(['roles:role_id,name,user_id'])->get();
        $roles = Role::all();
        /* $users = dd($users); */


        return response()->json([
            'users' => $users,
            'all_roles' => $roles

        ], 200);
    }





    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        if (Gate::denies('editusers')) {
            return response()->json([

                'status' => 'not auth'
            ], 401);
        }
        $user->roles()->sync($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {

        if (Gate::denies('deleteusers')) {
            return response()->json([

                'status' => 'not auth'
            ], 401);
        }
        $user->roles()->detach();
        $user->delete();
        return response()->json([
            'success' => 'ok'
        ], 200);
    }
}
