<?php

use App\Http\Resources\ConnectionCollection;
use App\Http\Resources\ConnectionResource;
use App\Models\Connection;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClusterController;
use App\Http\Controllers\IndexController;


Route::get('/connections', function () {
    return new ConnectionCollection(Connection::all());
});

Route::get('/connection/{id}', function (string $id) {
    return new ConnectionResource(Connection::findOrFail($id));
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
