<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Services\Elasticsearch\ClusterService;
use App\Services\Elasticsearch\IndexService;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function info(string $connectionId, string $indexId, string $action)
    {
        $clusterService = new IndexService(Connection::findOrFail($connectionId));
        return response()->json($clusterService->getInfo($indexId, $action));
    }

    public function create(string $connectionId, Request $request)
    {
        $indexName = $request->string('name')->trim()->value();
        $clusterService = new ClusterService(Connection::findOrFail($connectionId));
        $clusterService->createIndex($indexName);

        return response(null, 201);
    }
}
