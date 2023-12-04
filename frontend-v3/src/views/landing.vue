<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const tableShow = ref(false);
const listTable = ref(null);
const url = import.meta.env.VITE_API_URL;

const nik = ref("");

const cek = () => {
    if (nik.value !== "") {
        axios
            .get(`${url}/data-penduduk/nik/${nik.value}`)
            .then((res) => {
                if (res.data.success) {
                    let { penduduk } = res.data;
                    listTable.value = penduduk;
                    tableShow.value = true;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const clear = () => {
    if (nik.value === "") {
        tableShow.value = false;
        listTable.value = null;
    }
};
</script>

<template>
    <div>
        <!-- As a heading -->
        <nav class="navbar navbar-dark bg-primary py-2 px-1 shadow">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1">Data Penduduk</span>
                <div class="ms-auto">
                    <button
                        @click="router.push('/login')"
                        class="btn btn-light"
                    >
                        Masuk
                    </button>
                </div>
            </div>
        </nav>

        <div class="container">
            <div class="mx-auto">
                <div class="py-4">
                    <h3 class="text-center pt-2">Cek Data Penduduk</h3>
                    <div class="mx-auto col-lg-7 mt-4">
                        <form @submit.prevent="cek">
                            <div class="form-group">
                                <label for="nik">NIK</label>
                                <input
                                    type="text"
                                    v-model="nik"
                                    @change="clear"
                                    required
                                    class="form-control"
                                    name="nik"
                                    placeholder="Masukkan NIK"
                                    id=""
                                />
                            </div>
                            <div class="form-group mt-2 mb-2">
                                <button
                                    @click="cek"
                                    class="btn w-100 btn-success"
                                >
                                    Cek Ketersedian
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="mt-4 table-responsive rounded" v-if="tableShow">
                <table class="table table-stripped text-center">
                    <thead class="table-dark">
                        <tr>
                            <th>NIK</th>
                            <th>Nama</th>
                            <th>Tanggal Lahir</th>
                            <th>Jenis Kelamin</th>
                            <th>Provinsi</th>
                            <th>Kota Atau Kabupaten</th>
                            <th>Kecamatan</th>
                            <th>Kelurahan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td v-if="listTable === null" colspan="6">
                                Data tidak ditemukan
                            </td>
                        </tr>
                        <tr v-for="data in listTable" :key="data.id">
                            <td class="p-2">{{ data.nik }}</td>
                            <td class="p-2">{{ data.name }}</td>
                            <td class="p-2">{{ data.tanggal_lahir }}</td>
                            <td class="p-2">{{ data.jenis_kelamin }}</td>
                            <td class="p-2">{{ data.data_provinsi.name }}</td>
                            <td class="p-2">
                                {{ data.data_kota_atau_kabupaten.name }}
                            </td>
                            <td class="p-2">{{ data.data_kecamatan.name }}</td>
                            <td class="p-2">
                                {{ data.data_kelurahan_atau_desa.name }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
