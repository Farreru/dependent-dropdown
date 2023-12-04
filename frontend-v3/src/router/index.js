import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import auth from "../middleware/auth";
import LoginPage from "../views/login.vue";
import RegisterPage from "../views/register.vue";
import DataPendudukPage from "../views/dataPenduduk.vue";
import LandingPage from "../views/landing.vue";
const baseURL = import.meta.env.VITE_API_URL;

const routes = [
    {
        path: "/",
        name: "LandingPage",
        component: LandingPage,
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage,
    },
    {
        path: "/register",
        name: "RegisterPage",
        component: RegisterPage,
    },
    {
        path: "/admin",
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
                    router.push("/admin");
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
