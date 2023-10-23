<?php

/*
 * This file is part of the ESMA project.
 *
 * (c) Andrey Morozov <pavlovsk36@gmail.com>
 */

declare(strict_types=1);


namespace App\Services\Elasticsearch;

use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ClusterService extends ElasticsearchAbstract
{
    private const ALLOWED_METHODS = ['indices'];

    public function createIndex(string $indexName): void
    {
        $params = ['index' => $indexName];
        $this->esClient->indices()->create($params);
    }

    /**
     * @param string $id
     * @return string
     * @throw NotFoundHttpException
     */
    public function getIndexNameById(string $id): string
    {
        $indexInfo = $this->getIndexInfoById($id);

        return $indexInfo['settings']['index']['provided_name'];
    }

    /**
     * @param string $id
     * @return array
     * @throw NotFoundHttpException
     */
    public function getIndexInfoById(string $id): array
    {
        $data = $this->getInfo('indices');
        foreach ($data as $datum) {
            if ($datum['settings']['index']['uuid'] === $id) {

                return $datum;
            }
        }

        throw new NotFoundHttpException('Index not found');
    }

    /**
     * @param string $method
     * @return Collection
     */
    public function getInfo(string $method): Collection
    {
        $this->validateInfoMethod($method);

        switch ($method) {
            case 'indices':
                $params = ['metric' => 'metadata'];
                $promise = $this->esClient->cluster()->state($params);
                $data = $promise->asArray();
                $data = $data['metadata']['indices'];

                break;
        }

        return collect($data);
    }



    private function validateInfoMethod(string $method): void
    {
        if (false === in_array($method, self::ALLOWED_METHODS)) {
            throw new BadRequestHttpException(sprintf(
                'Invalid method "%s", allowed %s',
                $method,
                implode(',', self::ALLOWED_METHODS)
            ));
        }
    }
}
