<?php

/*
 * This file is part of the ESMA project.
 *
 * (c) Andrey Morozov <pavlovsk36@gmail.com>
 */

declare(strict_types=1);


namespace App\Services\Elasticsearch;

use App\Services\Elasticsearch\DTO\IndexDto;
use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class IndexService extends ElasticsearchAbstract
{
    private const ALLOWED_ACTIONS = ['info', 'stats', 'refresh', 'flush', 'forcemerge', 'delete', 'open', 'close', 'mapping', 'health', 'state'];

    public function getInfo(string $indexId, string $action): Collection
    {
        $this->validateInfoMethod($action);

        $clusterService = new ClusterService($this->connection);
        $indexName = $clusterService->getIndexNameById($indexId);



        $params = ['index' => $indexName];
        switch ($action) {
            case 'health':
                $promise = $this->esClient->cluster()->health($params);
                break;
            case 'state':
                $promise = $this->esClient->cluster()->state($params);
                break;
            case 'mapping':
                $promise = $this->esClient->indices()->getMapping($params);
                break;
            case 'delete':
                $promise = $this->esClient->indices()->delete($params);
                break;
            case 'open':
                $promise = $this->esClient->indices()->open($params);
                break;
            case 'close':
                $promise = $this->esClient->indices()->close($params);
                break;
            case 'forcemerge':
                $promise = $this->esClient->indices()->forcemerge($params);
                break;
            case 'flush':
                $promise = $this->esClient->indices()->flush($params);
                break;
            case 'refresh':
                $promise = $this->esClient->indices()->refresh($params);
                break;
            case 'stats':
                $promise = $this->esClient->indices()->stats($params);
                break;
            case 'info':
                $indexInfo = $clusterService->getIndexInfoById($indexId);
                $clusterHealth = $this->esClient->cluster()->health($params)->asArray();

                $indexDto = new IndexDto(
                    $indexName,
                    $indexId,
                    $clusterHealth['status'],
                    $indexInfo['state'],
                    (int) $clusterHealth['number_of_nodes'],
                    (int) $indexInfo['settings']['index']['number_of_replicas'],
                    (int) $indexInfo['settings']['index']['number_of_shards']
                );

                return collect($indexDto);
        }

        return collect($promise->asArray());
    }

    private function validateInfoMethod(string $action): void
    {
        if (false === in_array($action, self::ALLOWED_ACTIONS)) {
            throw new BadRequestHttpException(sprintf(
                'Invalid method "%s", allowed %s',
                $action,
                implode(',', self::ALLOWED_ACTIONS)
            ));
        }
    }
}
