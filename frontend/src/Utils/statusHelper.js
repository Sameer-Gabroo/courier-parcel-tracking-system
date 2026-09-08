export const getStatusColor = (status) => {

    const normalizedStatus = status?.trim().toLowerCase();

    switch (normalizedStatus) {

        case "delivered":
            return "#198754";

        case "out for delivery":
            return "#ffc107";

        case "in transit":
            return "#0d6efd";

        case "picked up":
            return "#0dcaf0";

        case "assigned":
            return "#ffc107";

        case "pending":
            return "#6c757d";

        default:
            return "#6c757d";
    }
};


export const getStatusTextColor = (status) => {

    const normalizedStatus = status?.trim().toLowerCase();

    switch (normalizedStatus) {

        case "out for delivery":
        case "assigned":
        case "picked up":
            return "#212529";

        default:
            return "#ffffff";
    }
};