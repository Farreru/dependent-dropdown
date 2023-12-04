<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();
const url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const logout = () => {
    Swal.fire({
        title: "Confirmation",
        icon: "info",
        text: "Are you sure want to logout?",
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            router.push("/");
        }
    });
};

const DataForm = ref({
    id: "",
    nik: "",
    name: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    provinsi_id: "",
    kota_atau_kabupaten_id: "",
    kecamatan_id: "",
    kelurahan_atau_desa_id: "",
    rt: "",
    rw: "",
    alamat: "",
    agama_id: "",
    status_perkawinan: "",
    pekerjaan: "",
});

const detailsMode = ref(false);
const editMode = ref(false);
const loading = ref(false);

const clearForm = () => {
    DataForm.value = {
        id: "",
        nik: "",
        name: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        provinsi_id: "",
        kota_atau_kabupaten_id: "",
        kecamatan_id: "",
        kelurahan_atau_desa_id: "",
        rt: "",
        rw: "",
        alamat: "",
        agama_id: "",
        status_perkawinan: "",
        pekerjaan: "",
    };
};

const ModalHeader = ref("Tambah Data");

const ListTable = ref(null);
const listProvinsi = ref(null);
const ListKotaAtauKabupaten = ref(null);
const ListKecamatan = ref(null);
const ListKelurahanAtauDesa = ref(null);
const listAgama = ref(null);
const selectionTableProvinsi = ref("");

$("#staticBackdrop").on("hidden.bs.modal", function () {
    clearForm();
});

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
                listAgama.value = agama;
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

const onChangeSelectionTableProvinsi = () => {
    $("#staticBackdrop").modal("hide");
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
    } else {
        ListTable.value = null;
    }
};

const onChangeProvinsi = () => {
    DataForm.value.kota_atau_kabupaten_id = "";
    DataForm.value.kecamatan_id = "";
    DataForm.value.kelurahan_atau_desa_id = "";
    if (DataForm.value.provinsi_id !== "") {
        axios
            .get(
                `${url}/data-penduduk/list-kota-atau-kabupaten/${DataForm.value.provinsi_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                let { kota_atau_kabupaten } = res.data;
                ListKotaAtauKabupaten.value = kota_atau_kabupaten;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const onChangeKotaAtauKabupaten = () => {
    DataForm.value.kecamatan_id = "";
    DataForm.value.kelurahan_atau_desa_id = "";
    if (DataForm.value.kota_atau_kabupaten_id !== "") {
        axios
            .get(
                `${url}/data-penduduk/list-kecamatan/${DataForm.value.kota_atau_kabupaten_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                let { kecamatan } = res.data;
                ListKecamatan.value = kecamatan;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const onChangeKecamatan = () => {
    DataForm.value.kelurahan_atau_desa_id = "";
    if (DataForm.value.kecamatan_id !== "") {
        axios
            .get(
                `${url}/data-penduduk/list-kelurahan-atau-desa/${DataForm.value.kecamatan_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                let { kelurahan_atau_desa } = res.data;
                ListKelurahanAtauDesa.value = kelurahan_atau_desa;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const deleteData = (id) => {
    Swal.fire({
        title: "Confirmation",
        icon: "info",
        text: "Are you sure want delete this data?",
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`${url}/data-penduduk/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.data.success) {
                        Swal.fire({
                            title: "Aksi Berhasil",
                            icon: "success",
                            text: "Delete data success",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                onChangeSelectionTableProvinsi();
                            } else {
                                onChangeSelectionTableProvinsi();
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
};

const detailsData = (id) => {
    loading.value = true;
    ModalHeader.value = "Details Data";
    if (editMode.value) {
        ModalHeader.value = "Edit Data";
    }

    axios
        .get(`${url}/data-penduduk/${id}/edit`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (res.data.success) {
                if (!editMode.value) {
                    detailsMode.value = true;
                }
                let { data } = res.data;
                DataForm.value = {
                    id: data.id,
                    name: data.name,
                    tanggal_lahir: data.tanggal_lahir,
                    jenis_kelamin: data.jenis_kelamin,
                    provinsi_id: data.provinsi_id,
                    kota_atau_kabupaten_id: data.kota_atau_kabupaten_id,
                    kecamatan_id: data.kecamatan_id,
                    kelurahan_atau_desa_id: data.kelurahan_atau_desa_id,
                    rt: data.rt,
                    rw: data.rw,
                    alamat: data.alamat,
                    agama_id: data.agama_id,
                    status_perkawinan: data.status_perkawinan,
                    pekerjaan: data.pekerjaan,
                };

                if (DataForm.value.provinsi_id !== "") {
                    axios
                        .get(
                            `${url}/data-penduduk/list-kota-atau-kabupaten/${DataForm.value.provinsi_id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        )
                        .then((res) => {
                            let { kota_atau_kabupaten } = res.data;
                            ListKotaAtauKabupaten.value = kota_atau_kabupaten;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                if (DataForm.value.kota_atau_kabupaten_id !== "") {
                    axios
                        .get(
                            `${url}/data-penduduk/list-kecamatan/${DataForm.value.kota_atau_kabupaten_id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        )
                        .then((res) => {
                            let { kecamatan } = res.data;
                            ListKecamatan.value = kecamatan;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                if (DataForm.value.kecamatan_id !== "") {
                    axios
                        .get(
                            `${url}/data-penduduk/list-kelurahan-atau-desa/${DataForm.value.kecamatan_id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        )
                        .then((res) => {
                            let { kelurahan_atau_desa } = res.data;
                            ListKelurahanAtauDesa.value = kelurahan_atau_desa;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                setTimeout(() => {
                    loading.value = false;
                    $("#staticBackdrop").modal("show");
                }, 500);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const submit = () => {
    if (DataForm.value.id == "") {
        axios
            .post(`${url}/data-penduduk`, DataForm.value, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    loading.value = false;
                    Swal.fire({
                        title: "Aksi Berhasil",
                        icon: "success",
                        text: "Insert new data success",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            onChangeSelectionTableProvinsi();
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else if (DataForm.value.id > 0) {
        axios
            .put(`${url}/data-penduduk/${DataForm.value.id}`, DataForm.value, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    loading.value = false;
                    Swal.fire({
                        title: "Aksi Berhasil!",
                        icon: "success",
                        text: "Data update success",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            onChangeSelectionTableProvinsi();
                        } else {
                            onChangeSelectionTableProvinsi();
                        }
                    });
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
        <!-- LOADING -->
        <div v-if="loading">
            <div class="modal-backdrop show" style="z-index: 9"></div>
            <div>
                <div
                    class="modal modal-sm show"
                    id="loadingModal"
                    aria-labelledby="loadingModalLabel"
                    aria-modal="true"
                    role="dialog"
                    style="z-index: 100; display: block"
                >
                    <div
                        class="modal-dialog mx-auto"
                        style="z-index: 100; margin-top: 16rem"
                    >
                        <div class="modal-content">
                            <div class="modal-body">
                                <div
                                    class="d-flex justify-content-center align-items-center gap-2"
                                >
                                    <div
                                        class="spinner-border text-primary me-auto"
                                        role="status"
                                    >
                                        <span class="visually-hidden"
                                            >Loading...</span
                                        >
                                    </div>
                                    <h5 class="text-center mt-1 me-auto">
                                        Loading...
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
            <div class="container-fluid container">
                <a class="navbar-brand" href="javascript:void(0)"
                    >Data Penduduk</a
                >

                <button class="btn btn-danger ms-auto" @click="logout">
                    Logout
                </button>
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
                                @click="
                                    () => {
                                        ModalHeader = 'Tambah Data';
                                        clearForm();
                                    }
                                "
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
                                        <th>NIK</th>
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
                                        v-if="
                                            ListTable === null ||
                                            ListTable === '' ||
                                            ListTable.length < 1
                                        "
                                    >
                                        <td colspan="7">Data not Found</td>
                                    </tr>
                                    <tr
                                        v-for="(data, i) in ListTable"
                                        :key="data.id"
                                    >
                                        <td>{{ i + 1 }}</td>
                                        <td>{{ data.nik }}</td>
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
                                                    @click="
                                                        () => {
                                                            detailsMode = true;
                                                            editMode = false;
                                                            detailsData(
                                                                data.id
                                                            );
                                                        }
                                                    "
                                                    class="btn btn-sm btn-primary"
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    @click="
                                                        () => {
                                                            editMode = true;
                                                            detailsMode = false;
                                                            detailsData(
                                                                data.id
                                                            );
                                                        }
                                                    "
                                                    class="btn btn-sm btn-warning text-white"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    @click="deleteData(data.id)"
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
                        <form @submit.prevent="submit">
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="nik">NIK</label>
                                        <input
                                            type="text"
                                            placeholder="NIK"
                                            class="form-control"
                                            id="nik"
                                            :readonly="detailsMode"
                                            v-model="DataForm.nik"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="name">Nama</label>
                                        <input
                                            type="text"
                                            placeholder="Nama"
                                            class="form-control"
                                            id="name"
                                            :readonly="detailsMode"
                                            v-model="DataForm.name"
                                            required
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
                                            :readonly="detailsMode"
                                            v-model="DataForm.tanggal_lahir"
                                            required
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
                                            v-model="DataForm.jenis_kelamin"
                                            :disabled="detailsMode"
                                            required
                                        >
                                            <option value="">
                                                Pilih Jenis Kelamin
                                            </option>
                                            <option value="Laki Laki">
                                                Laki Laki
                                            </option>
                                            <option value="Perumpuan">
                                                Perumpuan
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="agama">Agama</label>
                                        <select
                                            id="agama"
                                            v-model="DataForm.agama_id"
                                            class="form-select"
                                            :disabled="detailsMode"
                                            required
                                        >
                                            <option value="">
                                                Pilih Agama
                                            </option>
                                            <option
                                                v-for="agama in listAgama"
                                                :key="agama.id"
                                                :value="agama.id"
                                            >
                                                {{ agama.name }}
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
                                            v-model="DataForm.provinsi_id"
                                            @change="onChangeProvinsi"
                                            :disabled="detailsMode"
                                            required
                                        >
                                            <option value="">
                                                Pilih Provinsi
                                            </option>
                                            <option
                                                v-for="provinsi in listProvinsi"
                                                :key="provinsi.id"
                                                :value="provinsi.id"
                                            >
                                                {{ provinsi.name }}
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
                                            :disabled="
                                                DataForm.provinsi_id == '' ||
                                                detailsMode
                                            "
                                            v-model="
                                                DataForm.kota_atau_kabupaten_id
                                            "
                                            @change="onChangeKotaAtauKabupaten"
                                            required
                                        >
                                            <option value="">
                                                Pilih Kota Atau Kabupaten
                                            </option>

                                            <option
                                                v-for="kota in ListKotaAtauKabupaten"
                                                :key="kota.id"
                                                :value="kota.id"
                                            >
                                                {{ kota.name }}
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
                                            :disabled="
                                                DataForm.kota_atau_kabupaten_id ==
                                                    '' || detailsMode
                                            "
                                            v-model="DataForm.kecamatan_id"
                                            @change="onChangeKecamatan"
                                            required
                                        >
                                            <option value="">
                                                Pilih Kecamatan
                                            </option>
                                            <option
                                                v-for="kecamatan in ListKecamatan"
                                                :key="kecamatan.id"
                                                :value="kecamatan.id"
                                            >
                                                {{ kecamatan.name }}
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
                                            id="kelurahan_atau_desa"
                                            class="form-select"
                                            :disabled="
                                                DataForm.kecamatan_id == '' ||
                                                detailsMode
                                            "
                                            v-model="
                                                DataForm.kelurahan_atau_desa_id
                                            "
                                            required
                                        >
                                            <option value="">
                                                Pilih Kelurahan Atau Desa
                                            </option>
                                            <option
                                                v-for="kelurahan in ListKelurahanAtauDesa"
                                                :key="kelurahan.id"
                                                :value="kelurahan.id"
                                            >
                                                {{ kelurahan.name }}
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
                                            v-model="DataForm.alamat"
                                            :readonly="detailsMode"
                                            required
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
                                            required
                                            :readonly="detailsMode"
                                            v-model="DataForm.rt"
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
                                            :readonly="detailsMode"
                                            v-model="DataForm.rw"
                                            required
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
                                        <select
                                            id=""
                                            class="form-select"
                                            v-model="DataForm.status_perkawinan"
                                            :disabled="detailsMode"
                                            required
                                        >
                                            <option value="">
                                                Pilih Status Perkawinan
                                            </option>
                                            <option value="BELUM KAWIN">
                                                BELUM KAWIN
                                            </option>
                                            <option value="SUDAH KAWIN">
                                                SUDAH KAWIN
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
                                            required
                                            :readonly="detailsMode"
                                            v-model="DataForm.pekerjaan"
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
                        <button
                            type="submit"
                            @click="submit"
                            class="btn btn-primary"
                            :hidden="detailsMode"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
