<?php

namespace Database\Seeders;

use App\Models\Agama;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgamaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $list_agama = [
            'Islam',
            'Kristen',
            'Hindu',
        ];

        foreach ($list_agama as $index) {
            Agama::Create(['name' => $index]);
        }
    }
}
