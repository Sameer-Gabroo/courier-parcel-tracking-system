import api from "./axiosInstance";

const getParcels = async (
    page = 1,
    pageSize = 10,
    search = "",
    status = ""
) => {

    const response = await api.get(
        "/api/Parcel",
        {
            params: {
                page: page,
                pageSize: pageSize,
                search: search,
                status: status
            }
        }
    );

    return response.data;
};

const addParcel = async (parcelData) => {
    return (
        await api.post(
            "/api/Parcel",
            parcelData
        )
    ).data;
};

const getParcelById = async (parcelId) => {
    return (
        await api.get(
            `/api/Parcel/${parcelId}`
        )
    ).data;
};

const updateParcel = async (parcelId, formData) => {
    return (
        await api.put(
            `/api/Parcel/${parcelId}`,
            formData
        )
    ).data;
};

const deleteParcel = async (parcelId) => {
    return (
        await api.delete(
            `/api/Parcel/${parcelId}`
        )
    ).data;
};

const getPendingParcels = async () => {
    return (
        await api.get(
            "/api/Parcel/pending"
        )
    ).data;
};

const assignParcel = async (parcelId, assignData) => {
    return (
        await api.put(
            `/api/Parcel/${parcelId}/assign`,
            assignData
        )
    ).data;
};

const getCourierParcels = async () => {
    return (
        await api.get(
            "/api/Parcel/courier"
        )
    ).data;
};

const updateCourierParcelStatus = async (parcelId, statusData) => {
    return (
        await api.put(
            `/api/Parcel/${parcelId}/courier-status`,
            statusData
        )
    ).data;
};

export default {
    getParcels,
    addParcel,
    getParcelById,
    updateParcel,
    deleteParcel,
    getPendingParcels,
    assignParcel,
    getCourierParcels,
    updateCourierParcelStatus
};