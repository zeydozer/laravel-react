<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DataController;
Route::resource('datas', DataController::class, ['only' => ['index', 'store', 'destroy']]);