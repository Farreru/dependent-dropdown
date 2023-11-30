import http from "../http";
import { defineComponent, ref, watchEffect, h } from "vue";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";

interface FormData {
    id: number;
    name: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    provinsi_id: number;
    kota_atau_kabupaten_id: number;
    kecamatan_id: number;
    kelurahan_atau_desa_id: number;
    rt: string;
    rw: string;
    alamat: string;
    agama_id: number;
    status_perkawinan: string;
    pekerjaan: string;
}

export const data_penduduk = defineComponent({
    setup() {
        const token = localStorage.getItem("token");

        const route = useRoute();
        const showModal = ref(false);
        const DataForm = ref<FormData>({
            id: 0,
            name: "",
            tanggal_lahir: "",
            jenis_kelamin: "",
            provinsi_id: 0,
            kota_atau_kabupaten_id: 0,
            kecamatan_id: 0,
            kelurahan_atau_desa_id: 0,
            rt: "",
            rw: "",
            alamat: "",
            agama_id: 0,
            status_perkawinan: "",
            pekerjaan: "",
        });
        let ListTable: Array<any>;
        let ListProvinsi: Array<any>;
        const ListAgama = ref(Array<String>);
        const ListKotaAtauKabupaten = ref(Array<String>);
        const ListKecamatan = ref(Array<String>);
        const ListKelurahanAtauDesa = ref(Array<String>);
        const ListStatusPerkawinan: Array<String> = [
            "BELUM KAWIN",
            "SUDAH KAWIN",
        ];
        const TableProvinsi = ref(Array<String>);
        const headerModal = ref("Tambah Data Penduduk");
        const loading = ref(false);
        const detailsMode = ref(false);
        const editMode = ref(false);

        watchEffect(() => {
            http.get(`/data-penduduk/create`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res.data.success) {
                        let { agama, provinsi } = res.data;
                        ListAgama.value = agama;
                        ListProvinsi = provinsi;
                        // console.log(ListProvinsi);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        const clearForm = () => {
            DataForm.value = {
                id: 0,
                name: "",
                tanggal_lahir: "",
                jenis_kelamin: "",
                provinsi_id: 0,
                kota_atau_kabupaten_id: 0,
                kecamatan_id: 0,
                kelurahan_atau_desa_id: 0,
                rt: "",
                rw: "",
                alamat: "",
                agama_id: 0,
                status_perkawinan: "",
                pekerjaan: "",
            };
        };

        watchEffect(() => {
            if (showModal.value == false) {
                headerModal.value = "Tambah Data Penduduk";
                clearForm();
                detailsMode.value = false;
            }
        });

        const onChangeTableProvinsi = () => {
            if (TableProvinsi !== null) {
                http.get(`/data-penduduk/?provinsi=${TableProvinsi}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => {
                        if (res.data.success) {
                            let { list } = res.data;
                            ListTable = list;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };

        const onChangeProvinsi = () => {
            DataForm.value.kota_atau_kabupaten_id = 0;
            DataForm.value.kecamatan_id = 0;
            DataForm.value.kelurahan_atau_desa_id = 0;
            if (DataForm.value.provinsi_id !== 0) {
                http.get(
                    `/data-penduduk/list-kota-atau-kabupaten/${DataForm.value.provinsi_id}`,
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
            DataForm.value.kecamatan_id = 0;
            DataForm.value.kelurahan_atau_desa_id = 0;
            if (DataForm.value.kota_atau_kabupaten_id !== 0) {
                http.get(
                    `/data-penduduk/list-kecamatan/${DataForm.value.kota_atau_kabupaten_id}`,
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
            DataForm.value.kelurahan_atau_desa_id = 0;
            if (DataForm.value.kecamatan_id !== 0) {
                http.get(
                    `/data-penduduk/list-kelurahan-atau-desa/${DataForm.value.kecamatan_id}`,
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

        const insertData = (): void => {
            loading.value = true;
            if (DataForm.value.id < 1) {
                http.post(`/data-penduduk`, DataForm.value, {
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
                                    showModal.value = false;
                                    onChangeTableProvinsi();
                                }
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else if (DataForm.value.id > 0) {
                http.put(
                    `/data-penduduk/${DataForm.value.id}`,
                    DataForm.value,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                    .then((res) => {
                        if (res.data.success) {
                            loading.value = false;
                            Swal.fire({
                                title: "Aksi Berhasil!",
                                icon: "success",
                                text: "Data update success",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    showModal.value = false;
                                    onChangeTableProvinsi();
                                } else {
                                    showModal.value = false;
                                    onChangeTableProvinsi();
                                }
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };

        const detailsData = (id: number) => {
            loading.value = true;
            headerModal.value = "Details Data Penduduk";

            if (editMode.value) {
                headerModal.value = "Edit Data Penduduk";
            }

            http.get(`/data-penduduk/${id}/edit`, {
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

                        if (DataForm.value.provinsi_id !== 0) {
                            http.get(
                                `/data-penduduk/list-kota-atau-kabupaten/${DataForm.value.provinsi_id}`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            )
                                .then((res) => {
                                    let { kota_atau_kabupaten } = res.data;
                                    ListKotaAtauKabupaten.value =
                                        kota_atau_kabupaten;
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                        if (DataForm.value.kota_atau_kabupaten_id !== 0) {
                            http.get(
                                `/data-penduduk/list-kecamatan/${DataForm.value.kota_atau_kabupaten_id}`,
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
                        if (DataForm.value.kecamatan_id !== 0) {
                            http.get(
                                `/data-penduduk/list-kelurahan-atau-desa/${DataForm.value.kecamatan_id}`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            )
                                .then((res) => {
                                    let { kelurahan_atau_desa } = res.data;
                                    ListKelurahanAtauDesa.value =
                                        kelurahan_atau_desa;
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                        loading.value = false;
                        showModal.value = true;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        const deleteData = (id: Number): void => {
            Swal.fire({
                title: "Confirmation",
                icon: "info",
                text: "Are you sure want delete this data?",
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    http.delete(`/data-penduduk/${id}`, {
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
                                        onChangeTableProvinsi();
                                    } else {
                                        onChangeTableProvinsi();
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

        const logout = (): void => {
            Swal.fire({
                title: "Confirmation",
                icon: "info",
                text: "Are you sure want to logout?",
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    window.location.replace("/");
                }
            });
        };

        return () => (
            <div>
                <nav class="bg-white p-4 shadow-md">
                    <div class="relative container mx-auto flex justify-between items-end">
                        <a
                            href="/data-penduduk"
                            class="text-black text-lg font-bold hover:text-gray-600"
                        >
                            Data Penduduk
                        </a>
                        <div class="space-x-4">
                            <a
                                href="#"
                                class="text-black hover:text-gray-600"
                                v-bind:class="{ 'underline underline-offset-4': route.path === '/data-penduduk' }"
                            >
                                Data Penduduk
                            </a>
                            <a
                                href="javascript:void(0)"
                                onClick={logout}
                                class="bg-red-600 px-4 py-2 font-bold rounded text-white hover:bg-red-500"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </nav>

                <div class="flex items-center justify-center mt-10">
                    <div class="bg-white p-6 space-y-2 rounded-lg shadow-lg w-full mx-20 max-h-full overflow-auto">
                        <div class="flex items-start justify-between">
                            <h1 class="text-xl">List Data.</h1>
                            <button
                                onClick={() => {
                                    showModal.value = true;
                                }}
                                class="bg-blue-500 px-3 py-2 rounded-md text-white font-bold"
                            >
                                Tambahkan Data
                            </button>
                        </div>

                        <div class="flex items-end justify-start space-x-2">
                            <div class="w-1/5">
                                <label
                                    for="tableprovinsi"
                                    class="block mb-1 text-sm font-medium text-gray-900 text-left"
                                >
                                    Provinsi
                                </label>
                                <select
                                    id="tableprovinsi"
                                    required
                                    v-model={TableProvinsi}
                                    onChange={onChangeTableProvinsi}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                >
                                    <option value="">
                                        -- Pilih Provinsi --
                                    </option>
                                    {ListProvinsi.length !== 0 &&
                                        ListProvinsi.map((provinsi) => (
                                            <option
                                                key={provinsi.id}
                                                value={provinsi.id}
                                            >
                                                {provinsi.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div hidden>
                                <input
                                    type="text"
                                    required
                                    placeholder="Pencarian"
                                    class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                                    id="searcher"
                                />
                            </div>
                        </div>

                        <div
                            {...(TableProvinsi.value === null
                                ? { hidden: true }
                                : {})}
                            class="-mx-4 px-4 py-4 overflow-x-auto"
                        >
                            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table
                                    id="table"
                                    class="min-w-full leading-normal"
                                >
                                    <thead>
                                        <tr>
                                            <th class="px-2 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r">
                                                #
                                            </th>
                                            <th class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r">
                                                Nama
                                            </th>
                                            <th class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r">
                                                Tanggal Lahir
                                            </th>
                                            <th class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r">
                                                Jenis Kelamin
                                            </th>

                                            <th class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r">
                                                Kota Atau Kabupaten
                                            </th>

                                            <th class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r">
                                                Kecamatan
                                            </th>
                                            <th class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="ListTable && ListTable.length < 1">
                                            <td
                                                colspan="8"
                                                class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r"
                                            >
                                                Data not Found
                                            </td>
                                        </tr>
                                        {ListTable.map((data, i) => (
                                            <tr key={data.id}>
                                                <td class="text-center px-2 py-2 border-b border-gray-200 bg-white text-sm border-r">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {i + 1}
                                                    </p>
                                                </td>
                                                <td class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {data.name}
                                                    </p>
                                                </td>
                                                <td class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {data.tanggal_lahir}
                                                    </p>
                                                </td>
                                                <td class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {data.jenis_kelamin}
                                                    </p>
                                                </td>
                                                <td class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {
                                                            data
                                                                .data_kota_atau_kabupaten
                                                                .name
                                                        }
                                                    </p>
                                                </td>
                                                <td class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {
                                                            data.data_kecamatan
                                                                .name
                                                        }
                                                    </p>
                                                </td>
                                                <td class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r">
                                                    <div class="flex items-center justify-center space-x-1">
                                                        <button
                                                            onClick={() => {
                                                                detailsMode.value =
                                                                    true;
                                                                editMode.value =
                                                                    false;
                                                                detailsData(
                                                                    data.id
                                                                );
                                                            }}
                                                            class="bg-sky-500 text-white font-bold rounded-md px-2 py-1"
                                                        >
                                                            Details
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                editMode.value =
                                                                    true;
                                                                detailsData(
                                                                    data.id
                                                                );
                                                            }}
                                                            class="bg-yellow-400 text-white font-bold rounded-md px-2 py-1"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                deleteData(
                                                                    data.id
                                                                )
                                                            }
                                                            class="bg-red-500 text-white font-bold rounded-md px-2 py-1"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});
