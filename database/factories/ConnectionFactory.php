<?php

namespace Database\Factories;

use App\Models\Connection;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Connection>
 */
class ConnectionFactory extends Factory
{
    protected $model = Connection::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Localhost 9200',
            'url' => 'host.docker.internal:9200',
            'index_pattern' => '*'
        ];
    }
}
