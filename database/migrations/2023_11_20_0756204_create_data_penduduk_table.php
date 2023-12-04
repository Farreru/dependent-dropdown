<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_penduduk', function (Blueprint $table) {
            $table->id();
            $table->string('nik')->unique();
            $table->string('name');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['Laki Laki', 'Perumpuan']);
            $table->char('provinsi_id', 2)->index();
            $table->foreign('provinsi_id')->references('id')->on('provinces')->onDelete('cascade')->onUpdate('cascade');
            $table->char('kota_atau_kabupaten_id', 4)->index();
            $table->foreign('kota_atau_kabupaten_id')->references('id')->on('regencies')->onDelete('cascade')->onUpdate('cascade');
            $table->char('kecamatan_id', 7)->index();
            $table->foreign('kecamatan_id')->references('id')->on('districts')->onDelete('cascade')->onUpdate('cascade');
            $table->char('kelurahan_atau_desa_id', 10)->index();
            $table->foreign('kelurahan_atau_desa_id')->references('id')->on('villages')->onDelete('cascade')->onUpdate('cascade');
            $table->string('rt');
            $table->string('rw');
            $table->text('alamat');
            $table->bigInteger('agama_id')->unsigned();
            $table->foreign('agama_id')->references('id')->on('agama')->onDelete('cascade')->onUpdate('cascade');
            $table->enum('status_perkawinan', ['BELUM KAWIN', 'SUDAH KAWIN'])->default('BELUM KAWIN');
            $table->string('pekerjaan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_penduduk');
    }
};
