<?php

/*
 * This file is part of the ESMA project.
 *
 * (c) Andrey Morozov <pavlovsk36@gmail.com>
 */

declare(strict_types=1);


namespace App\Services\Elasticsearch;

use App\Models\Connection;
use Elastic\Elasticsearch\Client;

abstract class ElasticsearchAbstract
{
    protected Client $esClient;

    protected Connection $connection;

    /**
     * @param Connection $connection
     * @throws \Elastic\Elasticsearch\Exception\AuthenticationException
     */
    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
        $this->esClient = ESClientBuilder::build($connection);
    }
}
