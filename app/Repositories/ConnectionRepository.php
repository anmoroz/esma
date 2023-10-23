<?php

/*
 * This file is part of the ESMA project.
 *
 * (c) Andrey Morozov <pavlovsk36@gmail.com>
 */

declare(strict_types=1);


namespace App\Repositories;

use App\Models\Connection;
use Illuminate\Database\Eloquent\Collection;

class ConnectionRepository
{
    /**
     * @param int $id
     * @return Connection|null
     */
    public function find(int $id): ?Connection
    {
        return Connection::find($id);
    }

    /**
     * @param Connection $connection
     * @return void
     */
    public function destroy(Connection $connection): void
    {
        Connection::destroy($connection->id);
    }

    /**
     * @return Collection
     */
    public function all(): Collection
    {
        return Connection::all();
    }
}
