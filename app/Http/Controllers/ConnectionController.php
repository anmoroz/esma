<?php

/*
 * This file is part of the ESMA project.
 *
 * (c) Andrey Morozov <pavlovsk36@gmail.com>
 */

declare(strict_types=1);


namespace App\Http\Controllers;

use App\Services\Connection\BadConnectionUrlException;
use App\Services\Connection\ConnectionNotFoundException;
use App\Services\Connection\ConnectionService;
use Illuminate\Http\Request;

class ConnectionController extends Controller
{
    public function __construct(private ConnectionService $connectionService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ['data' => $this->connectionService->getAll()];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            return $this->connectionService->store($request);
        } catch (BadConnectionUrlException $e) {
            abort(400, $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            return $this->connectionService->getConnection((int) $id);
        } catch (ConnectionNotFoundException $e) {
            abort(404, $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->connectionService->destroy((int) $id);
        } catch (ConnectionNotFoundException $e) {
            abort(404, $e->getMessage());
        }
    }
}
