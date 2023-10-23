<?php

/*
 * This file is part of the ESMA project.
 *
 * (c) Andrey Morozov <pavlovsk36@gmail.com>
 */

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static \Illuminate\Database\Eloquent\Builder|static query()
 * @method static static make(array $attributes = [])
 * @method static static create(array $attributes = [])
 * @method static static forceCreate(array $attributes)
 * @method Connection firstOrNew(array $attributes = [], array $values = [])
 * @method Connection firstOrFail($columns = ['*'])
 * @method Connection firstOrCreate(array $attributes, array $values = [])
 * @method Connection firstOr($columns = ['*'], \Closure $callback = null)
 * @method Connection firstWhere($column, $operator = null, $value = null, $boolean = 'and')
 * @method Connection updateOrCreate(array $attributes, array $values = [])
 * @method null|static first($columns = ['*'])
 * @method static static findOrFail($id, $columns = ['*'])
 * @method static static findOrNew($id, $columns = ['*'])
 * @method static null|static find($id, $columns = ['*'])
 *
 * @property-read int $id
 *
 * @property string $name
 * @property string $url
 * @property string $index_pattern
 */
class Connection extends Model
{
    public const DEFAULT_INDEX_PATTERN = '*';

    use HasFactory;

    protected $table = 'connections';

    protected $fillable = ['name', 'url', 'index_pattern'];
}
