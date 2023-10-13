<?php

declare(strict_types=1);


namespace App\Services\Elasticsearch;

use App\Models\Connection;
use Elastic\Elasticsearch\Client;
use Elastic\Elasticsearch\ClientBuilder;

class ESClientBuilder
{
    /**
     * @param Connection $connection
     * @return Client
     * @throws \Elastic\Elasticsearch\Exception\AuthenticationException
     */
    public static function build(Connection $connection): Client
    {
        $client = ClientBuilder::create()
        ->setHosts([$connection->url])
        ->build();

        return $client;
    }
}
