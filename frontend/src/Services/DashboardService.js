import api from "./axiosInstance";

const getDashboardSummary = async () => {
    return (
        await api.get(
            "/api/Dashboard/Summary"
        )
    ).data;
};

export default {
    getDashboardSummary
};