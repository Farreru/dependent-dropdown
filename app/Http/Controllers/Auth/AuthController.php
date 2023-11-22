<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    //
    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->errors()], 422);
        }

        $credentials = $request->only(['email', 'password']);

        $token = JWTAuth::attempt($credentials);
        if (!$token) {
            return response()->json(['success' => false, 'message' => 'Email or Password is Wrong!']);
        }
        return response()->json(['success' => true, 'message' => 'Login success', 'token' => $token]);
    }

    public function register(Request $request)
    {
        $old = User::where('email', $request->email);
        $old->delete();

        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:50',
            'email' => 'required|email',
            'password' => 'required|min:8|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->errors()], 422);
        }

        User::Create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registration success',
        ]);
    }

    public function checkToken(Request $request)
    {
        return response()->json(['success' => true], 200);
    }
}
