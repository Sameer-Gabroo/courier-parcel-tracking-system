import api from "./axiosInstance";

const getUsers = async () => {
    return (await api.get("/api/users")).data;
};

const addUser = async (userData) => {
    return (await api.post("/api/users", userData)).data;
};

const updateUser = async (userId, userData) => {
    return (await api.put(`/api/users/${userId}`, userData)).data;
};

export default {
    getUsers,
    addUser,
    updateUser
};