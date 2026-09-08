import axios from "axios";
import config from "../appsettings";

const api = axios.create({
    baseURL: config.BASE_URL
});

api.interceptors.request.use((request) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
        request.headers.Authorization = `Bearer ${user.token}`;
    }

    return request;
});

export default api;