<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\Tariff;
use Illuminate\Support\Facades\Http;

class TariffController extends Controller
{
    public function index()
    {
        $tariffs = Tariff::all();

        return response()->json($tariffs, 200);
    }

    public function store(Request $request)
    {
        // Obtener los tipos de vehículos existentes
        $response = Http::withHeaders([
            'Authorization' => 'Bearer DFnvkE5hKVK3c12'
        ])->get('http://vehicles:3000/vehicle-types/'.$request->input('vehicletype'));

        if ($response->ok()) {
            $tariff = Tariff::create($request->all());
            return response()->json($tariff , 201);
        } else {
            $status = $response->status();
            $result = array();

            if ($status == 404) {
                $result['msg'] = 'Vehicle type not found';
                return response()->json($result, 404); 
            } else {
                $result['msg'] = 'Internal server error';
                return response()->json($result, 500); 
            }
        }
    }

    public function show($vehicletype)
    {
       return Tariff::where('vehicletype', $vehicletype)->firstOrFail();
    }
}
