// auth.js
import http from "../http";
const auth = (to: any, from: any, next: any): void => {
    const token = localStorage.getItem("token");
    http.get(`/auth/check-token`, {
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
