<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWTAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof TokenExpiredException) {
                $newToken = JWTAuth::parseToken()->refresh();
                return response()->json(['success' => 'true', 'token' => $newToken, 'message' => 'token expired'], 200);
            } else if ($e instanceof TokenInvalidException) {
                return response()->json(['success' => 'false', 'message' => 'token invalid'], 401);
            } else if ($e instanceof TokenBlacklistedException) {
                return response()->json(['success' => 'false', 'message' => 'token invalid'], 401);
            } else {
                return response()->json(['success' => 'false', 'message' => 'token not found'], 401);
            }
        }

        return $next($request);
    }
}
