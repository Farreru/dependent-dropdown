<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Master\DataPendudukController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::middleware('jwtauth')->group(function () {
    Route::get('/auth/check-token', [AuthController::class, 'checkToken']);
    Route::resource('/data-penduduk', DataPendudukController::class)->except('show');
    Route::get('/data-penduduk/list-kota-atau-kabupaten/{id}', [DataPendudukController::class, 'listKotaAtauKabupatenByProvinsiID']);
    Route::get('/data-penduduk/list-kecamatan/{id}', [DataPendudukController::class, 'listKecamatanByKotaAtauKabupatenID']);
    Route::get('/data-penduduk/list-kelurahan-atau-desa/{id}', [DataPendudukController::class, 'listKelurahanAtauDesaByKecamatanID']);
});

Route::get('/data-penduduk/nik/{nik}', [DataPendudukController::class, 'cariNik']);
