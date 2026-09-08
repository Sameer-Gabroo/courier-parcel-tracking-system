import api from "./axiosInstance";

const getCustomers = async (page, pageSize, search) => {
    return (
        await api.get("/api/Customer", {
            params: {
                page,
                pageSize,
                search
            }
        })
    ).data;
};

const addCustomer = async (customerData) => {
    const response = await api.post(
        "/api/Customer",
        customerData
    );

    return response.data;
};

const updateCustomer = async (customerId, customerData) => {
    const response = await api.put(
        `/api/Customer/${customerId}`,
        customerData
    );

    return response.data;
};

const deleteCustomer = async (customerId) => {
    const response = await api.delete(
        `/api/Customer/${customerId}`
    );

    return response.data;
};

export default {
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
};