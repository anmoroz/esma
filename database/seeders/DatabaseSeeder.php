<?php

namespace Database\Seeders;

use App\Models\Connection;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Connection::factory()->create();
    }
}
