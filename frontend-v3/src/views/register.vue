<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const url = import.meta.env.VITE_API_URL;

const userForm = ref({
    username: "",
    email: "",
    password: "",
});

const submit = () => {
    axios
        .post(`${url}/auth/register`, userForm.value)
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

<template>
    <div>
        <div class="container">
            <div
                class="d-flex align-items-center justify-content-center"
                style="min-height: 100vh"
            >
                <div class="card col-lg-5 shadow">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form @submit.prevent="submit">
                            <div class="form-group mb-2">
                                <label for="username">Username</label>
                                <input
                                    v-model="userForm.username"
                                    placeholder="Username"
                                    type="text"
                                    id="username"
                                    class="form-control"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label for="email">Email</label>
                                <input
                                    v-model="userForm.email"
                                    placeholder="Email"
                                    type="email"
                                    id="email"
                                    class="form-control"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label for="email">Password</label>
                                <input
                                    v-model="userForm.password"
                                    placeholder="********"
                                    type="password"
                                    id="password"
                                    class="form-control"
                                />
                            </div>

                            <div class="form-group">
                                <div
                                    class="d-flex justify-content-between align-items-start gap-3"
                                >
                                    <a
                                        href="javascript:void(0)"
                                        @click="router.push('/')"
                                        >Already have account.</a
                                    >
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
