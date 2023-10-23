<?php

declare(strict_types=1);


namespace App\Services\Elasticsearch\DTO;

use Illuminate\Contracts\Support\Arrayable;

class IndexDto implements Arrayable
{
    /**
     * @param string $name
     * @param string $uuid
     * @param string $status
     * @param string $state
     * @param int $numberOfNodes
     * @param int $numberOfReplicas
     * @param int $numberOfShards
     */
    public function __construct(
        private string $name,
        private string $uuid,
        private string $status,
        private string $state,
        private int $numberOfNodes,
        private int $numberOfReplicas,
        private int $numberOfShards
    )
    {
    }

    public function toArray()
    {
        return get_object_vars($this);
    }
}
