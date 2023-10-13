<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Services\Elasticsearch\ClusterService;


class ClusterController extends Controller
{
    public function info(string $id, string $method)
    {
        $clusterService = new ClusterService(Connection::findOrFail($id));

        return response()->json($clusterService->getInfo($method));
    }
}
