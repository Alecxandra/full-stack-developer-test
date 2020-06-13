<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Tariff extends Model
{
    protected $connection = 'mongodb';

    protected $fillable = [
        'vehicletype', 'price'
    ];
}
