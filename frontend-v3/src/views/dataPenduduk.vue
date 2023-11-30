<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();
const url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const ModalHeader = ref("Tambah Data");

const ListTable = ref(null);
const listProvinsi = ref(null);
const selectionTableProvinsi = ref("");

watchEffect(() => {
    axios
        .get(`${url}/data-penduduk/create`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (res.data.success) {
                let { agama, provinsi } = res.data;
                listProvinsi.value = provinsi;
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

const onChangeSelectionTableProvinsi = () => {
    let id = selectionTableProvinsi.value;
    if (id !== "") {
        axios
            .get(`${url}/data-penduduk/?provinsi=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    let { list } = res.data;
                    ListTable.value = list;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
            <div class="container-fluid container">
                <a class="navbar-brand" href="javascript:void(0)"
                    >Data Penduduk</a
                >

                <button class="btn btn-danger ms-auto">Logout</button>
            </div>
        </nav>

        <div class="container">
            <div
                class="d-flex align-items-start justify-content-center"
                style="min-height: 100vh; margin-top: 3rem; margin-bottom: 3rem"
            >
                <div class="card shadow w-100">
                    <div class="card-body">
                        <h5>Table Data Penduduk</h5>
                        <div
                            class="d-flex justify-content-end align-items-center"
                        >
                            <button
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                            >
                                Tambah Data
                            </button>
                        </div>
                        <div class="col-lg-3 mt-2 mb-2">
                            <select
                                id="pilihProvinsi"
                                v-model="selectionTableProvinsi"
                                @change="onChangeSelectionTableProvinsi"
                                class="form-select"
                            >
                                <option value="">Pilih Provinsi</option>
                                <option
                                    v-for="provinsi in listProvinsi"
                                    :key="provinsi.id"
                                    :value="provinsi.id"
                                >
                                    {{ provinsi.name }}
                                </option>
                            </select>
                        </div>
                        <div class="table-responsive mt-3">
                            <table
                                class="table w-100 text-center"
                                id="data-table"
                            >
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama</th>
                                        <th>Tanggal Lahir</th>
                                        <th>Jenis Kelamin</th>
                                        <th>Kota Atau Kabupaten</th>
                                        <th>Kecamatan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(data, i) in ListTable"
                                        :key="data.id"
                                    >
                                        <td>{{ i + 1 }}</td>
                                        <td>{{ data.name }}</td>
                                        <td>{{ data.tanggal_lahir }}</td>
                                        <td>{{ data.jenis_kelamin }}</td>
                                        <td>
                                            {{
                                                data.data_kota_atau_kabupaten
                                                    .name
                                            }}
                                        </td>
                                        <td>{{ data.data_kecamatan.name }}</td>
                                        <td>
                                            <div
                                                class="d-flex gap-1 justify-content-center"
                                            >
                                                <button
                                                    class="btn btn-sm btn-primary"
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    class="btn btn-sm btn-warning text-white"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    class="btn btn-sm btn-danger"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div
            class="modal modal-lg fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">
                            {{ ModalHeader }}
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="name">Nama</label>
                                        <input
                                            type="text"
                                            placeholder="Nama"
                                            class="form-control"
                                            id="name"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="tanggal_lahir"
                                            >Tanggal Lahir</label
                                        >
                                        <input
                                            type="date"
                                            class="form-control"
                                            id="tanggal_lahir"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="jenis_kelamin"
                                            >Jenis Kelamin</label
                                        >
                                        <select
                                            id="jenis_kelamin"
                                            class="form-select"
                                        >
                                            <option value="">
                                                Pilih Jenis Kelamin
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="agama">Agama</label>
                                        <select id="agama" class="form-select">
                                            <option value="">
                                                Pilih Agama
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="provinsi">Provinsi</label>
                                        <select
                                            id="provinsi"
                                            class="form-select"
                                        >
                                            <option value="">
                                                Pilih Provinsi
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="kota_atau_kabupaten"
                                            >Kota Atau Kabupaten</label
                                        >
                                        <select
                                            id="kota_atau_kabupaten"
                                            class="form-select"
                                        >
                                            <option value="">
                                                Pilih Kota Atau Kabupaten
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="kecamatan">Kecamatan</label>
                                        <select
                                            id="kecamatan"
                                            class="form-select"
                                        >
                                            <option value="">
                                                Pilih Kecamatan
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="kelurahan_atau_desa"
                                            >Kelurahan Atau Desa</label
                                        >
                                        <select
                                            id="keluraan_atau_desa"
                                            class="form-select"
                                        >
                                            <option value="">
                                                Pilih Kelurahan Atau Desa
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="alamat">Alamat</label>
                                        <textarea
                                            id=""
                                            class="form-control"
                                            placeholder="Alamat"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="rt">RT</label>
                                        <input
                                            type="number"
                                            min="0"
                                            id="rt"
                                            placeholder="0"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="rw">RW</label>
                                        <input
                                            type="number"
                                            min="0"
                                            id="rw"
                                            placeholder="0"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="status_perkawinan"
                                            >Status Perkawinan</label
                                        >
                                        <select id="" class="form-select">
                                            <option value="">
                                                Pilih Status Perkawinan
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="pekerjaan">Pekerjaan</label>
                                        <input
                                            type="text"
                                            id="pekerjaan"
                                            placeholder="Pekerjaan"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" class="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
