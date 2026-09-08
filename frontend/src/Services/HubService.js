import api from "./axiosInstance";

const getHubs = async (search = "") => {
    const response = await api.get(
        "/api/Hub",
        {
            params: {
                search: search
            }
        }
    );

    return response.data;
};

const addHub = async (hubData) => {
    const response = await api.post(
        "/api/Hub",
        hubData
    );

    return response.data;
};

const getHubById = async (hubId) => {
    const response = await api.get(
        `/api/Hub/${hubId}`
    );

    return response.data;
};

const updateHub = async (hubId, hubData) => {
    const response = await api.put(
        `/api/Hub/${hubId}`,
        hubData
    );

    return response.data;
};

const deleteHub = async (hubId) => {
    const response = await api.delete(
        `/api/Hub/${hubId}`
    );

    return response.data;
};

export default {
    getHubs,
    addHub,
    getHubById,
    updateHub,
    deleteHub
};