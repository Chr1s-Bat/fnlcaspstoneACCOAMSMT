<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OperationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (Sanctum Authentication Required)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    // Operations CRUD Endpoints
    Route::apiResource('operations', OperationController::class)->only(['index', 'store', 'destroy']);
});
