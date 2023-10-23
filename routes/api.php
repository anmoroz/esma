<?php

/*
 * This file is part of the ESMA project.
 *
 * (c) Andrey Morozov <pavlovsk36@gmail.com>
 */

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClusterController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\ConnectionController;


Route::controller(ConnectionController::class)->group(function () {
    Route::get('/connections', 'index');
    Route::get('/connection/{id}', 'show');
    Route::delete('/connection/{id}', 'destroy');
    Route::post('/connections', 'store');
});


Route::get(
        '/connection/{connectionId}/es/{method}',
        [ClusterController::class, 'info']
    )
    ->name('cluster.info')
    ->whereNumber('id')
    ->whereAlpha('method');



Route::get(
        '/connection/{connectionId}/index/{indexId}/{action}',
        [IndexController::class, 'info']
    )
    ->name('index.info')
    ->whereNumber('connectionId');

Route::post(
    '/connection/{connectionId}/index',
    [IndexController::class, 'create']
);
