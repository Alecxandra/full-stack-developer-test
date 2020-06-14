<?php

use Illuminate\Database\Seeder;

class TariffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // tarifa residente
        DB::table('tariffs')->insert([
            'vehicletype' => 'res',
            'price' => 0.05
        ]);

        // tarifa no residente
        DB::table('tariffs')->insert([
            'vehicletype' => 'no_res',
            'price' => 0.5
        ]);
    }
}
