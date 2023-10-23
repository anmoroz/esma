<?php

/*
 * This file is part of the ESMA project.
 *
 * (c) Andrey Morozov <pavlovsk36@gmail.com>
 */

declare(strict_types=1);


namespace App\Services\Connection;

use App\Models\Connection;
use App\Repositories\ConnectionRepository;
use Elastic\Elasticsearch\ClientBuilder;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class ConnectionService
{
    public function __construct(private readonly ConnectionRepository $connectionRepository)
    {
    }

    /**
     * @param Request $request
     * @return Connection
     * @throws BadConnectionUrlException
     */
    public function store(Request $request): Connection
    {
        $request->validate([
            'name' => 'required',
            'url' => 'required',
        ]);

        if (!$this->checkConnectionUrl($request->url)) {
            throw new BadConnectionUrlException('Invalid connection URL');
        }

        $connection = Connection::create([
            'name' => $request->name,
            'url' => $request->url,
            'index_pattern' => Connection::DEFAULT_INDEX_PATTERN
        ]);

        return $connection;
    }

    /**
     * @param string $url
     * @return bool
     */
    private function checkConnectionUrl(string $url): bool
    {
        try {
            $client = ClientBuilder::create()
                ->setHosts([$url])
                ->build();
            $client->cluster()->health();
        } catch (Exception) {
            return false;
        }

        return true;
    }

    /**
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->connectionRepository->all();
    }

    /**
     * @param int $id
     * @return Connection
     * @throws ConnectionNotFoundException
     */
    public function getConnection(int $id): Connection
    {
        $connection = $this->connectionRepository->find($id);
        if (is_null($connection)) {
            throw new ConnectionNotFoundException("Connection {$id} not found.");
        }

        return $connection;
    }

    /**
     * @param int $id
     * @throws ConnectionNotFoundException
     */
    public function destroy(int $id): void
    {
        $connection = $this->connectionRepository->find($id);
        if (is_null($connection)) {
            throw new ConnectionNotFoundException("Connection {$id} not found.");
        }
        $this->connectionRepository->destroy($connection);
    }
}
