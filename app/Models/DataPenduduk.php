<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataPenduduk extends Model
{
    use HasFactory;
    protected $table = 'data_penduduk';
    protected $fillable = [
        'name',
        'tanggal_lahir',
        'jenis_kelamin',
        'provinsi_id',
        'kota_atau_kabupaten_id',
        'kecamatan_id',
        'kelurahan_atau_desa_id',
        'rt',
        'rw',
        'alamat',
        'agama_id',
        'status_perkawinan',
        'pekerjaan',
    ];

    function DataProvinsi()
    {
        return $this->belongsTo(Province::class, 'provinsi_id', 'id');
    }

    function DataKotaAtauKabupaten()
    {
        return $this->belongsTo(Regency::class, 'kota_atau_kabupaten_id', 'id');
    }

    function DataKecamatan()
    {
        return $this->belongsTo(District::class, 'kecamatan_id', 'id');
    }

    function DataKelurahanAtauDesa()
    {
        return $this->belongsTo(Village::class, 'kelurahan_id', 'id');
    }

    function DataAgama()
    {
        return $this->belongsTo(Agama::class, 'agama_id', 'id');
    }
}
