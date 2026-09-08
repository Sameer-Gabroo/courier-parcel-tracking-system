import { useEffect, useState } from "react";
import ParcelService from "../Services/ParcelService";
import ViewCourierParcelModal from "../Components/Courier/ViewCourierParcelModal";


function Courier() {

    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);

    const loadParcels = async () => {
        try {
            const data = await ParcelService.getCourierParcels();
            setParcels(data);
        } catch (error) {
            console.error("Error getting courier parcels:", error);
        }
    };

    const updateStatus = async (parcelId, status) => {
        try {
            await ParcelService.updateCourierParcelStatus(
                parcelId,
                { status }
            );

            loadParcels();

        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const nextStatus = {
        "Assigned": "Picked Up",
        "Picked Up": "In Transit",
        "In Transit": "Out for Delivery",
        "Out for Delivery": "Delivered"
    };

    useEffect(() => {
        loadParcels();
    }, []);

    return (
        <div>

            <h2 className="fw-bold">
                Courier Parcels
            </h2>

            <p className="text-muted">
                View assigned parcels and update delivery status.
            </p>

            <div className="card">
                <div className="card-body">

                    <table className="table align-middle">

                        <thead>
                            <tr>
                                <th>Tracking</th>
                                <th>Customer</th>
                                <th>Receiver</th>
                                <th>Route</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {parcels.map((parcel) => (

                                <tr key={parcel.parcelId}>

                                    <td>
                                        {parcel.trackingNumber}
                                    </td>

                                    <td>
                                        {parcel.customerName}
                                    </td>

                                    <td>
                                        {parcel.parcelRecipient?.receiverName || "-"}
                                    </td>

                                    <td>
                                        {parcel.routeCode || "-"}
                                    </td>

                                    <td>
                                        {parcel.currentStatus}
                                    </td>

                                    <td>
   <button
    className="btn btn-sm btn-outline-primary"
    onClick={() => {
        setSelectedParcel(parcel);
        setShowViewModal(true);
    }}
>
    View Order
</button>

    {nextStatus[parcel.currentStatus] && (
        <button
            className="btn btn-sm btn-primary ms-2"
            onClick={() =>
                updateStatus(
                    parcel.parcelId,
                    nextStatus[parcel.currentStatus]
                )
            }
        >
            {nextStatus[parcel.currentStatus]}
        </button>
    )}
</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {parcels.length === 0 && (
                        <p className="text-muted mb-0">
                            No parcels assigned.
                        </p>
                    )}

                </div>
            </div>
            <ViewCourierParcelModal
    show={showViewModal}
    parcel={selectedParcel}
    onClose={() => setShowViewModal(false)}
/>

        </div>
    );
}

export default Courier;