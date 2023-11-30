import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import http from "../http";

export const register = defineComponent({
    setup() {
        const route = useRouter();

        const userForm = ref({
            username: "",
            email: "",
            password: "",
        });

        const submit = (e: Event) => {
            e.preventDefault();
            http.post(`/auth/register`, userForm.value)
                .then((res) => {
                    if (res.data.success) {
                        Swal.fire({
                            title: "Aksi Berhasil!",
                            icon: "success",
                            text: "Registration Success",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                route.push("/");
                            } else {
                                route.push("/");
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

        return () => (
            <div>
                <div class="flex items-center justify-center h-screen">
                    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 class="text-2xl mb-4">Register</h2>
                        <form onSubmit={submit}>
                            <div class="space-y-3">
                                <div class="form-group space-y-1">
                                    <label for="username">Username</label>
                                    <input
                                        type="text"
                                        v-model={userForm.value.username}
                                        placeholder="Username"
                                        class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                                        id="username"
                                    />
                                </div>
                                <div class="form-group space-y-1">
                                    <label for="email">Email</label>
                                    <input
                                        type="email"
                                        v-model={userForm.value.email}
                                        placeholder="Email"
                                        class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                                        id="email"
                                    />
                                </div>
                                <div class="form-group space-y-1">
                                    <label for="password">Password</label>
                                    <input
                                        type="password"
                                        v-model={userForm.value.password}
                                        placeholder="Password"
                                        class="block px-2 py-1 ring-1 ring-inset ring-gray-300 text-black w-full rounded-md"
                                        id="password"
                                    />
                                </div>
                                <div class="flex items-start justify-between">
                                    <a href="/" class="text-blue-800">
                                        Already have account?
                                    </a>
                                    <button
                                        onClick={submit}
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
        );
    },
});
