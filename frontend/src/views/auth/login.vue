<template>
    <div>
        <div class="flex items-center justify-center h-screen">
            <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 class="text-2xl mb-4">Login</h2>
                <form @submit.prevent="login()" method="POST">
                    <div class="space-y-3">
                        <div class="form-group space-y-1">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                required
                                v-model="credentials.email"
                                placeholder="Email"
                                class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div class="form-group space-y-1">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                required
                                v-model="credentials.password"
                                placeholder="Password"
                                class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                                name="password"
                                id="password"
                            />
                        </div>
                        <div class="flex items-start justify-between">
                            <a href="/register" class="text-blue-800"
                                >Don't have an account?</a
                            >
                            <button
                                class="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";

const baseURL = "http://localhost:8000/api";

const credentials = ref({
    email: "",
    password: "",
});

const resetCredentials = () => {
    credentials.value = {
        email: "",
        password: "",
    };
};

const login = () => {
    axios
        .post(`${baseURL}/auth/login`, credentials.value)
        .then((res) => {
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                Swal.fire({
                    title: "Aksi Berhasil!",
                    icon: "success",
                    text: "Login Success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace("/data-penduduk");
                    } else {
                        window.location.replace("/data-penduduk");
                    }
                });
            }
        })
        .catch((err) => {
            if (err.response.data.error) {
                Swal.fire({
                    title: "Terjadi Kesalahan!",
                    icon: "error",
                    text: JSON.stringify(res.response.data.error),
                });
            }
        });
};
</script>

<style lang="scss" scoped></style>
