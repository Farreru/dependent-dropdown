import { defineComponent, ref } from "vue";
import Swal from "sweetalert2";
import http from "../http";
import { useRouter } from "vue-router";

export const login = defineComponent({
    setup() {
        const route = useRouter();

        const credentials = ref({
            email: "",
            password: "",
        });

        const submit = (e: Event) => {
            e.preventDefault();
            http.post(`/auth/login`, credentials.value)
                .then((res) => {
                    if (res.data.success) {
                        localStorage.setItem("token", res.data.token);
                        Swal.fire({
                            title: "Aksi Berhasil!",
                            icon: "success",
                            text: "Login Success",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                route.push("/data-penduduk");
                            } else {
                                route.push("/data-penduduk");
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
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

        return () => (
            <div>
                <div class="flex items-center justify-center h-screen">
                    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 class="text-2xl mb-4">Login</h2>
                        <form onSubmit={submit}>
                            <div class="space-y-3">
                                <div class="form-group space-y-1">
                                    <label for="email">Email</label>
                                    <input
                                        type="email"
                                        required
                                        v-model={credentials.value.email}
                                        placeholder="Email"
                                        class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                                        id="email"
                                    />
                                </div>
                                <div class="form-group space-y-1">
                                    <label for="password">Password</label>
                                    <input
                                        type="password"
                                        required
                                        v-model={credentials.value.password}
                                        placeholder="Password"
                                        class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                                        id="password"
                                    />
                                </div>
                                <div class="flex items-start justify-between">
                                    <a href="/register" class="text-blue-800">
                                        Don't have an account?
                                    </a>
                                    <button
                                        onClick={submit}
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
        );
    },
});
