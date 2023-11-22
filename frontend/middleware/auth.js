// auth.js
import axios from "axios";
const baseURL = "http://localhost:8000/api";

const auth = (to, from, next) => {
    const token = localStorage.getItem("token");
    axios
        .get(`${baseURL}/auth/check-token`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (res.data.success && !res.data.token) {
                return next();
            } else if (res.data.success && res.data.token) {
                localStorage.setItem("token", res.data.token);
                return next();
            }
        })
        .catch((err) => {
            if (err.response.status == 401) {
                return next({ name: "LoginPage" });
            }
        });
};

export default auth;
