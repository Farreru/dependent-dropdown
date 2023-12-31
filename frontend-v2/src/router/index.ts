import { createRouter, createWebHistory } from "vue-router";
import { login } from "../views/login";
import { register } from "../views/register";
import http from "../http";
import auth from "../middleware/auth";
import { data_penduduk } from "../views/data_penduduk";
const routes = [
    {
        path: "/",
        name: "LoginPage",
        component: login,
    },
    {
        path: "/register",
        name: "RegisterPage",
        component: register,
    },
    {
        path: "/data-penduduk",
        name: "DataPendudukPage",
        component: data_penduduk,
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
        const middleware: any = to.meta.middleware;
        middleware.forEach((mw: any) => mw(to, from, next));
    } else {
        next();
    }

    if (to.name === "LoginPage") {
        const token = localStorage.getItem("token");
        http.get(`/auth/check-token`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res: any) => {
                if (res.data.success) {
                    router.push("/data-penduduk");
                }
            })
            .catch((err: any) => {
                if (err.response.status == 401) {
                    return null;
                }
            });
    }
});

export default router;
