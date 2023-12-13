<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Agama;
use App\Models\DataPenduduk;
use App\Models\District;
use App\Models\Province;
use App\Models\Regency;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DataPendudukController extends Controller
{

    public function index(Request $request)
    {
        //
        $data = DataPenduduk::where('provinsi_id', $request->provinsi)->with(
            'DataProvinsi',
            'DataKotaAtauKabupaten',
            'DataKecamatan',
            'DataKelurahanAtauDesa',
            'DataAgama'
        )->get();

        return response()->json(['success' => true, 'list' => $data]);
    }

    public function cariNik($nik)
    {
        $data = DataPenduduk::with(
            'DataProvinsi',
            'DataKotaAtauKabupaten',
            'DataKecamatan',
            'DataKelurahanAtauDesa'
        )->where('nik', $nik)->get();
        return response()->json(['success' => true, 'penduduk' => $data]);
    }

    public function create()
    {
        //
        $agama = Agama::all();
        $provinsi = Province::all();

        return response()->json(['success' => true, 'agama' => $agama, 'provinsi' => $provinsi], 200);
    }

    public function listKotaAtauKabupatenByProvinsiID($id)
    {
        $kotaAtauKabupaten = Regency::where('province_id', $id)->get();

        if (!$kotaAtauKabupaten) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        return response()->json(['success' => true, 'kota_atau_kabupaten' => $kotaAtauKabupaten], 200);
    }

    public function listKecamatanByKotaAtauKabupatenID($id)
    {
        $kecamatan = District::where('regency_id', $id)->get();

        if (!$kecamatan) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        return response()->json(['success' => true, 'kecamatan' => $kecamatan], 200);
    }

    public function listKelurahanAtauDesaByKecamatanID($id)
    {
        $kelurahanAtauDesa = Village::where('district_id', $id)->get();

        if (!$kelurahanAtauDesa) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        return response()->json(['success' => true, 'kelurahan_atau_desa' => $kelurahanAtauDesa], 200);
    }

    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string|unique:data_penduduk,nik',
            'name' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required',
            'provinsi_id' => 'required',
            'kota_atau_kabupaten_id' => 'required',
            'kecamatan_id' => 'required',
            'kelurahan_atau_desa_id' => 'required',
            'rt' => 'required',
            'rw' => 'required',
            'alamat' => 'required',
            'agama_id' => 'required',
            'status_perkawinan' => 'required',
            'pekerjaan' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->errors()], 422);
        }

        $data = new DataPenduduk;
        $data->fill($request->all());
        $data->save();

        return response()->json(['success' => true, 'message' => 'Insert new data success'], 200);
    }

    public function edit(string $id)
    {
        //
        $data = DataPenduduk::with(
            'DataProvinsi',
            'DataKotaAtauKabupaten',
            'DataKecamatan',
            'DataKelurahanAtauDesa',
            'DataAgama'
        )->find($id);

        if (!$data) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function update(Request $request, string $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string',
            'name' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|string',
            'provinsi_id' => 'required',
            'kota_atau_kabupaten_id' => 'required',
            'kecamatan_id' => 'required',
            'kelurahan_atau_desa_id' => 'required',
            'rt' => 'required',
            'rw' => 'required',
            'alamat' => 'required',
            'agama_id' => 'required',
            'status_perkawinan' => 'required',
            'pekerjaan' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->errors()], 422);
        }

        $data = DataPenduduk::find($id);

        if (!$data) {
            return response()->json(['success' => false, 'message' => 'Data not found'], 404);
        }

        $data->fill($request->all());
        $data->save();

        return response()->json(['success' => true, 'message' => 'Update data success'], 200);
    }

    public function destroy(string $id)
    {
        //
        $data = DataPenduduk::find($id);

        if (!$data) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        $data->delete();
        return response()->json(['success' => true, 'message' => 'Data deleted!']);
    }
}
