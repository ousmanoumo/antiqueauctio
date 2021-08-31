<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    // We create a helper function that helps to return response with token inside Controller.php
    public function respondWithToken($token, $responseMessage, $data)
    {
        return \response()->json([
            "success" => true,
            "message" => $responseMessage,
            "data" => $data,
            "token" => $token,
            "token_type" => "bearer",
        ], 200);
    }
}
