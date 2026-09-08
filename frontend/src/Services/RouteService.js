import api from "./axiosInstance";

const getRoutes = async (search = "") => {
    const response = await api.get(
        "/api/Route",
        {
            params: {
                search: search
            }
        }
    );

    return response.data;
};

const getRouteById = async (routeId) => {
    const response = await api.get(
        `/api/Route/${routeId}`
    );

    return response.data;
};

const addRoute = async (routeData) => {
    const response = await api.post(
        "/api/Route",
        routeData
    );

    return response.data;
};

const updateRoute = async (routeId, routeData) => {
    const response = await api.put(
        `/api/Route/${routeId}`,
        routeData
    );

    return response.data;
};

const deleteRoute = async (routeId) => {
    const response = await api.delete(
        `/api/Route/${routeId}`
    );

    return response.data;
};

export default {
    getRoutes,
    getRouteById,
    addRoute,
    updateRoute,
    deleteRoute
};