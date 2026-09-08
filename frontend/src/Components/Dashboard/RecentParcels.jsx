function RecentParcels({ parcels }) {

    const getStatusClass = (status) => {

        switch (status?.toLowerCase()) {

            case "assigned":
                return "recent-status-assigned";

            case "out for delivery":
                return "recent-status-out-for-delivery";

            case "delivered":
                return "recent-status-delivered";

            case "delayed":
                return "recent-status-delayed";

            default:
                return "recent-status-default";
        }
    };


    return (
        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <h5 className="fw-bold mb-4">
                    Recent Parcels
                </h5>

                {parcels && parcels.length > 0 ? (

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>
                                    <th>Tracking Number</th>
                                    <th>Customer</th>
                                    <th>Destination</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>

                            </thead>

                            <tbody>

                                {parcels.map((parcel) => (

                                    <tr
                                        key={parcel.trackingNumber}
                                    >

                                        <td className="fw-semibold">
                                            {parcel.trackingNumber}
                                        </td>

                                        <td>
                                            {parcel.customer}
                                        </td>

                                        <td>
                                            {parcel.destination}
                                        </td>

                                        <td>

                                            <span
                                                className={`recent-status-badge ${getStatusClass(
                                                    parcel.status
                                                )}`}
                                            >
                                                {parcel.status}
                                            </span>

                                        </td>

                                        <td>
                                            {parcel.date
                                                ? new Date(
                                                    parcel.date
                                                ).toLocaleDateString()
                                                : "-"
                                            }
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="text-center text-muted py-4">

                        <p className="mb-0">
                            No recent parcels available.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default RecentParcels;