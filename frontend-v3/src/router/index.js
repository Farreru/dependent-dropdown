import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import auth from "../middleware/auth";
import LoginPage from "../views/login.vue";
import RegisterPage from "../views/register.vue";
import DataPendudukPage from "../views/dataPenduduk.vue";

const baseURL = import.meta.env.VITE_API_URL;

const routes = [
    {
        path: "/",
        name: "LoginPage",
        component: LoginPage,
    },
    {
        path: "/register",
        name: "RegisterPage",
        component: RegisterPage,
    },
    {
        path: "/data-penduduk",
        name: "DataPendudukPage",
        component: DataPendudukPage,
        meta: {
            middleware: [auth],
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = to.meta.middleware;
        middleware.forEach((mw) => mw(to, from, next));
    } else {
        next();
    }

    if (to.name === "LoginPage") {
        const token = localStorage.getItem("token");
        axios
            .get(`${baseURL}/auth/check-token`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    router.push("/data-penduduk");
                }
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    return null;
                }
            });
    }
});

export default router;
