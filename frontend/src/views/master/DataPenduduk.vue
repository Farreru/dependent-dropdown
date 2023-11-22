<template>
    <div>
        <transition name="fade" appear>
            <div
                class="fixed h-screen top-0 right-0 bottom-0 left-0 z-[100] bg-gray-600 opacity-60"
                v-if="showModal"
            ></div>
        </transition>
        <transition name="fade" appear>
            <div
                class="fixed h-screen top-0 right-0 bottom-0 left-0 z-[120] bg-gray-600 opacity-60"
                v-if="loading"
            ></div>
        </transition>
        <transition name="bounce" appear>
            <div
                v-if="loading"
                class="absolute top-0 right-0 left-0 bottom-0 bg-white m-auto text-center h-20 w-3/12 rounded-md z-[120]"
                role="status"
            >
                <div class="flex items-center justify-center py-6 space-x-2">
                    <svg
                        aria-hidden="true"
                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span>Loading...</span>
                </div>
            </div>
        </transition>
        <transition name="bounce" appear>
            <div
                class="absolute my-10 top-0 right-0 left-0 bottom-0 m-auto text-center w-full h-fit max-w-4xl max-h-full rounded-xl shadow-[0_5px_5px_rgba(0,0,0,0.2)] z-[110]"
                role="dialog"
                v-if="showModal"
            >
                <!-- Modal content -->
                <div class="relative bg-gray-100 rounded-lg shadow">
                    <!-- Modal header -->
                    <div
                        class="flex items-start justify-between p-4 border-b border-b-black rounded-t"
                    >
                        <h3 class="text-xl font-semibold text-gray-900">
                            {{ headerModal }}
                        </h3>
                        <button
                            type="button"
                            @click="showModal = false"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                        >
                            <svg
                                class="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <form
                            @submit.prevent="insertData(DataForm.id)"
                            method="POST"
                        >
                            <div class="grid gap-4 mt-2 mb-2 grid-cols-2">
                                <div class="w-full">
                                    <label
                                        for="name"
                                        class="block mb-2 text-sm font-medium text-gray-900 text-left"
                                        >Nama</label
                                    >
                                    <input
                                        type="text"
                                        name="name"
                                        :readonly="detailsMode"
                                        v-model="DataForm.name"
                                        id="name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                        placeholder="Nama..."
                                        required
                                    />
                                </div>
                                <div class="w-full">
                                    <label
                                        for="tanggal"
                                        class="block mb-2 text-sm font-medium text-gray-900 text-left"
                                        >Tanggal Lahir</label
                                    >
                                    <input
                                        type="date"
                                        name="tanggal_lahir"
                                        :readonly="detailsMode"
                                        v-model="DataForm.tanggal_lahir"
                                        id="tanggal"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                        placeholder="Tanggal Lahir..."
                                        required
                                    />
                                </div>
                                <div class="w-full">
                                    <label
                                        for="jenis_kelamin"
                                        class="block mb-1 text-sm font-medium text-gray-900 text-left"
                                        >Jenis Kelamin</label
                                    >
                                    <select
                                        id="jenis_kelamin"
                                        name="jenis_kelamin"
                                        v-model="DataForm.jenis_kelamin"
                                        required
                                        :disabled="detailsMode"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                    >
                                        <option value="" selected disabled>
                                            -- Pilih Jenis Kelamin --
                                        </option>
                                        <option value="Laki Laki">
                                            Laki Laki
                                        </option>
                                        <option value="Perumpuan">
                                            Perumpuan
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full">
                                    <label
                                        for="agama"
                                        class="block mb-1 text-sm font-medium text-gray-900 text-left"
                                        >Agama</label
                                    >
                                    <select
                                        id="agama"
                                        name="agama"
                                        v-model="DataForm.agama_id"
                                        required
                                        :disabled="detailsMode"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                    >
                                        <option value="" selected disabled>
                                            -- Pilih Agama --
                                        </option>
                                        <option
                                            v-for="agama in ListAgama"
                                            :key="agama.id"
                                            :value="agama.id"
                                        >
                                            {{ agama.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full">
                                    <label
                                        for="provinsi"
                                        class="block mb-1 text-sm font-medium text-gray-900 text-left"
                                        >Provinsi</label
                                    >
                                    <select
                                        id="provinsi"
                                        name="provinsi_id"
                                        @change="onChangeProvinsi()"
                                        v-model="DataForm.provinsi_id"
                                        required
                                        :disabled="detailsMode"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                    >
                                        <option value="">
                                            -- Pilih Provinsi --
                                        </option>
                                        <option
                                            v-for="provinsi in ListProvinsi"
                                            :key="provinsi.id"
                                            :value="provinsi.id"
                                        >
                                            {{ provinsi.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full">
                                    <label
                                        for="kota_atau_kabupaten"
                                        class="block mb-1 text-sm font-medium text-gray-900 text-left"
                                        >Kota Atau Kabupaten</label
                                    >
                                    <select
                                        id="kota_atau_kabupaten"
                                        name="kota_atau_kabupaten_id"
                                        v-model="
                                            DataForm.kota_atau_kabupaten_id
                                        "
                                        @change="onChangeKotaAtauKabupaten()"
                                        required
                                        :disabled="
                                            DataForm.provinsi_id < 0 ||
                                            DataForm.provinsi_id == '' ||
                                            detailsMode
                                        "
                                        :class="
                                            DataForm.provinsi_id < 0 ||
                                            DataForm.provinsi_id == ''
                                                ? [
                                                      'bg-gray-200',
                                                      'text-gray-400',
                                                  ]
                                                : ['bg-gray-50']
                                        "
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                    >
                                        <option value="">
                                            -- Pilih Kota Atau Kabupaten --
                                        </option>

                                        <option
                                            v-for="kota_atau_kabupaten in ListKotaAtauKabupaten"
                                            :key="kota_atau_kabupaten.id"
                                            :value="kota_atau_kabupaten.id"
                                        >
                                            {{ kota_atau_kabupaten.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full">
                                    <label
                                        for="kecamatan"
                                        class="block mb-1 text-sm font-medium text-gray-900 text-left"
                                        >Kecamatan</label
                                    >
                                    <select
                                        id="kecamatan"
                                        name="kecamatan_id"
                                        v-model="DataForm.kecamatan_id"
                                        @change="onChangeKecamatan()"
                                        :disabled="
                                            DataForm.kota_atau_kabupaten_id <
                                                0 ||
                                            DataForm.kota_atau_kabupaten_id ==
                                                '' ||
                                            detailsMode
                                        "
                                        :class="
                                            DataForm.kota_atau_kabupaten_id <
                                                0 ||
                                            DataForm.kota_atau_kabupaten_id ==
                                                ''
                                                ? [
                                                      'bg-gray-200',
                                                      'text-gray-400',
                                                  ]
                                                : ['bg-gray-50']
                                        "
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                    >
                                        <option value="">
                                            -- Pilih Kecamatan --
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
                                <div class="w-full">
                                    <label
                                        for="kelurahan_atau_desa"
                                        class="block mb-1 text-sm font-medium text-gray-900 text-left"
                                        >Kelurahan Atau Desa</label
                                    >
                                    <select
                                        id="kelurahan_atau_desa"
                                        name="kelurahan_atau_desa_id"
                                        v-model="
                                            DataForm.kelurahan_atau_desa_id
                                        "
                                        :disabled="
                                            DataForm.kecamatan_id < 0 ||
                                            DataForm.kecamatan_id == '' ||
                                            detailsMode
                                        "
                                        :class="
                                            DataForm.kecamatan_id < 0 ||
                                            DataForm.kecamatan_id == ''
                                                ? [
                                                      'bg-gray-200',
                                                      'text-gray-400',
                                                  ]
                                                : ['bg-gray-50']
                                        "
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                    >
                                        <option value="">
                                            -- Pilih Kelurahan Atau Desa --
                                        </option>
                                        <option
                                            v-for="kelurahan_atau_desa in ListKelurahanAtauDesa"
                                            :key="kelurahan_atau_desa.id"
                                            :value="kelurahan_atau_desa.id"
                                        >
                                            {{ kelurahan_atau_desa.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid gap-3 mb-2 mt-3 grid-cols-1">
                                <div class="w-full">
                                    <label
                                        for="alamat"
                                        class="block mb-2 text-sm font-medium text-gray-900 text-left"
                                        >Alamat</label
                                    >
                                    <textarea
                                        name="alamat"
                                        id="alamat"
                                        :readonly="detailsMode"
                                        v-model="DataForm.alamat"
                                        placeholder="Alamat..."
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                    ></textarea>
                                </div>
                            </div>

                            <div class="grid gap-3 mb-2 mt-3 grid-cols-2">
                                <div class="w-full">
                                    <label
                                        for="rt"
                                        class="block mb-2 text-sm font-medium text-gray-900 text-left"
                                        >RT</label
                                    >
                                    <input
                                        type="number"
                                        name="rt"
                                        :readonly="detailsMode"
                                        v-model="DataForm.rt"
                                        id="rt"
                                        placeholder="RT..."
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                    />
                                </div>
                                <div class="w-full">
                                    <label
                                        for="rw"
                                        class="block mb-2 text-sm font-medium text-gray-900 text-left"
                                        >RW</label
                                    >
                                    <input
                                        type="number"
                                        name="rw"
                                        v-model="DataForm.rw"
                                        :readonly="detailsMode"
                                        id="rw"
                                        placeholder="RW..."
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                    />
                                </div>
                                <div class="w-full">
                                    <label
                                        for="status_perkawinan"
                                        class="block mb-1 text-sm font-medium text-gray-900 text-left"
                                        >Status Perkawinan</label
                                    >
                                    <select
                                        id="status_perkawinan"
                                        name="status_perkawinan"
                                        v-model="DataForm.status_perkawinan"
                                        required
                                        :disabled="detailsMode"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 mt-2.5"
                                    >
                                        <option value="" selected disabled>
                                            -- Pilih Status Perkawinan --
                                        </option>
                                        <option
                                            v-for="status in ListStatusPerkawinan"
                                            :key="status.id"
                                            :value="status"
                                        >
                                            {{ status }}
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full">
                                    <label
                                        for="pekerjaan"
                                        class="block mb-2 text-sm font-medium text-gray-900 text-left"
                                        >Pekerjaan</label
                                    >
                                    <input
                                        type="text"
                                        name="pekerjaan"
                                        :readonly="detailsMode"
                                        v-model="DataForm.pekerjaan"
                                        id="pekerjaan"
                                        placeholder="Pekerjaan..."
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- Modal footer -->
                    <div
                        v-if="!detailsMode"
                        class="flex items-center justify-end p-6 space-x-2 border-t border-t-black border-gray-200 rounded-b"
                    >
                        <button
                            @click="showModal = false"
                            type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                        >
                            Cancel
                        </button>
                        <button
                            @click="insertData(DataForm.id)"
                            type="submit"
                            class="inline-flex text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </transition>
        <nav class="bg-white p-4 shadow-md">
            <div
                class="relative container mx-auto flex justify-between items-end"
            >
                <a
                    href="/data-penduduk"
                    class="text-black text-lg font-bold hover:text-gray-600"
                    >Data Penduduk</a
                >
                <div class="space-x-4">
                    <a
                        href="#"
                        class="text-black hover:text-gray-600"
                        :class="[
                            route.path == '/data-penduduk'
                                ? ['underline underline-offset-4']
                                : [''],
                        ]"
                        >Data Penduduk</a
                    >
                    <a
                        href="javascript:void(0)"
                        @click="logout()"
                        class="bg-red-600 px-4 py-2 font-bold rounded text-white hover:bg-red-500"
                        >Logout</a
                    >
                </div>
            </div>
        </nav>

        <div class="flex items-center justify-center mt-10">
            <div
                class="bg-white p-6 space-y-2 rounded-lg shadow-lg w-full mx-20 max-h-full overflow-auto"
            >
                <div class="flex items-start justify-between">
                    <h1 class="text-xl">List Data.</h1>
                    <button
                        @click="showModal = true"
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
                            >Provinsi</label
                        >
                        <select
                            id="tableprovinsi"
                            required
                            v-model="TableProvinsi"
                            @change="onChangeTableProvinsi()"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5"
                        >
                            <option value="">-- Pilih Provinsi --</option>
                            <option
                                v-for="provinsi in ListProvinsi"
                                :value="provinsi.id"
                            >
                                {{ provinsi.name }}
                            </option>
                        </select>
                    </div>
                    <div hidden>
                        <input
                            type="text"
                            required
                            placeholder="Pencarian"
                            class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                            name="searcher"
                            id="searcher"
                        />
                    </div>
                </div>

                <div
                    :hidden="TableProvinsi === '' || TableProvinsi === null"
                    class="-mx-4 px-4 py-4 overflow-x-auto"
                >
                    <div
                        class="inline-block min-w-full shadow rounded-lg overflow-hidden"
                    >
                        <table id="table" class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        class="px-2 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r"
                                    >
                                        #
                                    </th>
                                    <th
                                        class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r"
                                    >
                                        Nama
                                    </th>
                                    <th
                                        class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r"
                                    >
                                        Tanggal Lahir
                                    </th>
                                    <th
                                        class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r"
                                    >
                                        Jenis Kelamin
                                    </th>

                                    <th
                                        class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r"
                                    >
                                        Kota Atau Kabupaten
                                    </th>

                                    <th
                                        class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r"
                                    >
                                        Kecamatan
                                    </th>
                                    <th
                                        class="px-5 py-2 border-b-2 border-gray-200 text-black uppercase tracking-wider border-r"
                                    >
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
                                <tr
                                    v-for="(data, i) in ListTable"
                                    :key="data.id"
                                >
                                    <td
                                        class="text-center px-2 py-2 border-b border-gray-200 bg-white text-sm border-r"
                                    >
                                        <p
                                            class="text-gray-900 whitespace-no-wrap"
                                        >
                                            {{ i + 1 }}
                                        </p>
                                    </td>
                                    <td
                                        class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r"
                                    >
                                        <p
                                            class="text-gray-900 whitespace-no-wrap"
                                        >
                                            {{ data.name }}
                                        </p>
                                    </td>
                                    <td
                                        class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r"
                                    >
                                        <p
                                            class="text-gray-900 whitespace-no-wrap"
                                        >
                                            {{ data.tanggal_lahir }}
                                        </p>
                                    </td>
                                    <td
                                        class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r"
                                    >
                                        <p
                                            class="text-gray-900 whitespace-no-wrap"
                                        >
                                            {{ data.jenis_kelamin }}
                                        </p>
                                    </td>
                                    <td
                                        class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r"
                                    >
                                        <p
                                            class="text-gray-900 whitespace-no-wrap"
                                        >
                                            {{
                                                data.data_kota_atau_kabupaten
                                                    .name
                                            }}
                                        </p>
                                    </td>
                                    <td
                                        class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r"
                                    >
                                        <p
                                            class="text-gray-900 whitespace-no-wrap"
                                        >
                                            {{ data.data_kecamatan.name }}
                                        </p>
                                    </td>

                                    <td
                                        class="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm border-r"
                                    >
                                        <div
                                            class="flex items-center justify-center space-x-1"
                                        >
                                            <button
                                                @click="
                                                    () => {
                                                        detailsMode = true;
                                                        editMode = false;
                                                        detailsData(data.id);
                                                    }
                                                "
                                                class="bg-sky-500 text-white font-bold rounded-md px-2 py-1"
                                            >
                                                Details
                                            </button>
                                            <button
                                                @click="
                                                    () => {
                                                        editMode = true;
                                                        detailsData(data.id);
                                                    }
                                                "
                                                class="bg-yellow-400 text-white font-bold rounded-md px-2 py-1"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                @click="deleteData(data.id)"
                                                class="bg-red-500 text-white font-bold rounded-md px-2 py-1"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <!-- <p
                                            class="text-gray-900 whitespace-no-wrap"
                                        >
                                            {{ data.data_kecamatan.name }}
                                        </p> -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import Swal from "sweetalert2";
const baseURL = "http://localhost:8000/api";
// const baseURL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

const route = useRoute();
const showModal = ref(false);
const DataForm = ref({
    id: "",
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
const ListTable = ref(null);
const ListProvinsi = ref(null);
const ListAgama = ref(null);
const ListKotaAtauKabupaten = ref(null);
const ListKecamatan = ref(null);
const ListKelurahanAtauDesa = ref(null);
const ListStatusPerkawinan = ref(["BELUM KAWIN", "SUDAH KAWIN"]);
const TableProvinsi = ref("");
const headerModal = ref("Tambah Data Penduduk");
const loading = ref(false);
const detailsMode = ref(false);
const editMode = ref(false);

watchEffect(() => {
    axios
        .get(`${baseURL}/data-penduduk/create`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (res.data.success) {
                let { agama, provinsi } = res.data;
                ListAgama.value = agama;
                ListProvinsi.value = provinsi;
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

const clearForm = () => {
    DataForm.value = {
        id: "",
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

watchEffect(() => {
    if (showModal.value == false) {
        headerModal.value = "Tambah Data Penduduk";
        clearForm();
        detailsMode.value = false;
    }
});

const onChangeTableProvinsi = () => {
    if (TableProvinsi.value !== "" || TableProvinsi.value !== null) {
        axios
            .get(`${baseURL}/data-penduduk/?provinsi=${TableProvinsi.value}`, {
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

const onChangeProvinsi = () => {
    if (!detailsMode || !editMode) {
        DataForm.value.kota_atau_kabupaten_id = "";
        DataForm.value.kecamatan_id = "";
        DataForm.value.kelurahan_atau_desa_id = "";
    }
    if (DataForm.value.provinsi_id !== "") {
        axios
            .get(
                `${baseURL}/data-penduduk/list-kota-atau-kabupaten/${DataForm.value.provinsi_id}`,
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
    if (!detailsMode || !editMode) {
        DataForm.value.kecamatan_id = "";
        DataForm.value.kelurahan_atau_desa_id = "";
    }
    if (DataForm.value.kota_atau_kabupaten_id !== "") {
        axios
            .get(
                `${baseURL}/data-penduduk/list-kecamatan/${DataForm.value.kota_atau_kabupaten_id}`,
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
    if (!detailsMode || !editMode) {
        DataForm.value.kelurahan_atau_desa_id = "";
    }
    if (DataForm.value.kecamatan_id !== "") {
        axios
            .get(
                `${baseURL}/data-penduduk/list-kelurahan-atau-desa/${DataForm.value.kecamatan_id}`,
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

const insertData = () => {
    loading.value = true;
    if (DataForm.value.id == "") {
        axios
            .post(`${baseURL}/data-penduduk`, DataForm.value, {
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
        axios
            .put(
                `${baseURL}/data-penduduk/${DataForm.value.id}`,
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

const detailsData = (id) => {
    loading.value = true;
    headerModal.value = "Details Data Penduduk";

    if (editMode.value) {
        headerModal.value = "Edit Data Penduduk";
    }

    axios
        .get(`${baseURL}/data-penduduk/${id}/edit`, {
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
                onChangeProvinsi();
                onChangeKotaAtauKabupaten();
                onChangeKecamatan();
                loading.value = false;
                showModal.value = true;
            }
        })
        .catch((err) => {
            console.log(err);
        });
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
                .delete(`${baseURL}/data-penduduk/${id}`, {
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

const logout = () => {
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
</script>

<style scoped>
/* ---------------------------------- */

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.4s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1);
    }
}
</style>
