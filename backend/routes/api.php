<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::group(['prefix' => 'scopic', 'middleware' => 'CORS'], function ($router) {
    Route::post('/register', [UserController::class, 'register'])->name('register.user');
    Route::post('/login', [UserController::class, 'login'])->name('login.user');
    Route::post('/setting-bidding', [UserController::class, 'settingbidding'])->name('settingbidding.user');
    Route::get('/logout', [UserController::class, 'logout'])->name('logout.user');


    Route::get('/items', [ItemController::class, 'index'])->name('index.item');
    Route::get('/item', [ItemController::class, 'show'])->name('show.item');
    Route::post('/auto-bidding', [ItemController::class, 'autoBidding'])->name('autobidding.item');

    Route::post('bid/{item_id}', [BidController::class, 'bid'])->name('bid.item');
});

