<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\Tariff;

class TariffController extends Controller
{
    public function index()
    {
        $tariffs = Tariff::all();

        return response()->json($tariffs, 200);
    }

    public function store(Request $request)
    {
        $tariff = Tariff::create($request->all());

        return response()->json($tariff, 201);
    }

    public function show($vehicletype)
    {
       return Tariff::where('vehicletype', $vehicletype)->firstOrFail();
    }
}
