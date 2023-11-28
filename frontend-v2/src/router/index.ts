import { createRouter, createWebHistory } from "vue-router";
import { login } from "../views/login";
import { register } from "../views/register";

const routes = [
    {
        path: "/",
        name: "loginpage",
        component: login,
    },
    {
        path: "/register",
        name: "registerpage",
        component: register,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
