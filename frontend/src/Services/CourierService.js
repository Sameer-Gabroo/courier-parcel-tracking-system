import api from "./axiosInstance";

const getCouriers = async () => {
    return (
        await api.get(
            "/api/Courier"
        )
    ).data;
};

const getCourierById = async (courierId) => {
    return (
        await api.get(
            `/api/Courier/${courierId}`
        )
    ).data;
};

const updateCourier = async (courierId, courier) => {
    return (
        await api.put(
            `/api/Courier/${courierId}`,
            courier
        )
    ).data;
};

const deleteCourier = async (courierId) => {
    return (
        await api.delete(
            `/api/Courier/${courierId}`
        )
    ).data;
};

const getAvailableCouriersForParcel = async (parcelId) => {
    return (
        await api.get(
            `/api/Courier/available-for-parcel/${parcelId}`
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

export default {
    getCourierParcels,
    getCouriers,
    getCourierById,
    updateCourier,
    deleteCourier,
    getAvailableCouriersForParcel
};