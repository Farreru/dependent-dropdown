import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import auth from "../middleware/auth";
import LoginPage from "../src/views/auth/login.vue";
import RegisterPage from "../src/views/auth/register.vue";
import DataPendudukPage from "../src/views/master/DataPenduduk.vue";

const baseURL = "http://localhost:8000/api";

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
