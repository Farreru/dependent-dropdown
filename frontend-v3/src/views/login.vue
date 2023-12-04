<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_API_URL;
const router = useRouter();

const credentials = ref({
    email: "",
    password: "",
});

const submit = () => {
    axios
        .post(`${url}/auth/login`, credentials.value)
        .then((res) => {
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                Swal.fire({
                    title: "Aksi Berhasil!",
                    icon: "success",
                    text: "Login Success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/admin");
                    } else {
                        router.push("/admin");
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
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form @submit.prevent="submit">
                            <div class="form-group mb-2">
                                <label for="email">Email</label>
                                <input
                                    v-model="credentials.email"
                                    placeholder="Email"
                                    type="email"
                                    id="email"
                                    class="form-control"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label for="email">Password</label>
                                <input
                                    v-model="credentials.password"
                                    placeholder="********"
                                    type="password"
                                    id="password"
                                    class="form-control"
                                />
                            </div>

                            <div class="form-group">
                                <div
                                    class="d-flex justify-content-between align-items-start"
                                >
                                    <a
                                        href="javascript:void(0)"
                                        @click="router.push('/register')"
                                        >Dont have account.</a
                                    >
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Login
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
