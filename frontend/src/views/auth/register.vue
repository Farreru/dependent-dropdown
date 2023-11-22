<template>
    <div>
        <div class="flex items-center justify-center h-screen">
            <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 class="text-2xl mb-4">Register</h2>
                <form @submit.prevent="register()" method="POST">
                    <div class="space-y-3">
                        <div class="form-group space-y-1">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                v-model="userForm.username"
                                placeholder="Username"
                                class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                                name="username"
                                id="username"
                            />
                        </div>
                        <div class="form-group space-y-1">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                v-model="userForm.email"
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
                                v-model="userForm.password"
                                placeholder="Password"
                                class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                                name="password"
                                id="password"
                            />
                        </div>
                        <div class="flex items-start justify-between">
                            <a href="/" class="text-blue-800"
                                >Already have account?</a
                            >
                            <button
                                type="submit"
                                class="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Register
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
import { ref } from "vue";
import Swal from "sweetalert2";

const baseURL = "http://localhost:8000/api";

const userForm = ref({
    username: "",
    email: "",
    password: "",
});

const resetUserForm = (userForm.value = {
    username: "",
    email: "",
    password: "",
});

const register = () => {
    axios
        .post(`${baseURL}/auth/register`, userForm.value)
        .then((res) => {
            if (res.data.success) {
                Swal.fire({
                    title: "Aksi Berhasil!",
                    icon: "success",
                    text: "Registration Success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace("/");
                    } else {
                        window.location.replace("/");
                    }
                });
            }
        })
        .catch((err) => {
            if (err.response.data.error) {
                Swal.fire({
                    title: "Terjadi Kesalahan!",
                    icon: "error",
                    text: JSON.stringify(
                        Object.values(err.response.data.error)[0]
                    ).replace(/[\[\]"]+/g, ""),
                });
                resetUserForm();
            }
        });
};
</script>

<style lang="scss" scoped></style>
