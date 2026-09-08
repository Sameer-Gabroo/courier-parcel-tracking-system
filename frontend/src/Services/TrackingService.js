import api from "./axiosInstance";

const trackParcel = async (trackingNumber) => {
    const response = await api.get(
        `/api/Parcel/track/${trackingNumber}`
    );

    return response.data;
};

export default {
    trackParcel
};