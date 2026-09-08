import { useEffect, useState } from "react";
import api from "../Services/axiosInstance";
import ViewCourierParcelModal from "../Components/Courier/ViewCourierParcelModal";
import {
    getStatusColor,
    getStatusTextColor
} from "../Utils/statusHelper";

function Tracking() {

    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedParcel, setSelectedParcel] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);


    useEffect(() => {

        const loadParcels = async () => {

            try {

                const response = await api.get(
                    "/api/Parcel/customer"
                );

                setParcels(response.data);

            } catch (error) {

                console.error(
                    "Error loading parcels:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        loadParcels();

    }, []);


    if (loading) {

        return (
            <div className="text-center py-5">

                <div
                    className="spinner-border"
                    role="status"
                />

                <p className="text-muted mt-3">
                    Loading your parcels...
                </p>

            </div>
        );
    }


    return (

        <div className="container-fluid py-4">

            {/* ================= PAGE HEADER ================= */}

            <div className="mb-4">

                <h2 className="fw-bold mb-1">
                    My Parcels
                </h2>

                <p className="text-muted mb-0">
                    View and track your parcels.
                </p>

            </div>


            {/* ================= NO PARCELS ================= */}

            {parcels.length === 0 ? (

                <div className="card border-0 shadow-sm rounded-4">

                    <div className="card-body text-center py-5">

                        <h5 className="fw-bold">
                            No Parcels Found
                        </h5>

                        <p className="text-muted mb-0">
                            You don't have any parcels yet.
                        </p>

                    </div>

                </div>

            ) : (

                <div className="row g-4">

                    {parcels.map((parcel) => (

                        <div
                            className="col-12"
                            key={parcel.parcelId}
                        >

                            <div className="card border-0 shadow-sm rounded-4">

                                <div className="card-body p-4">


                                    {/* ================= TOP ================= */}

                                    <div className="d-flex justify-content-between align-items-center mb-4">

                                        <div>

                                            <div className="text-muted small mb-1">
                                                TRACKING NUMBER
                                            </div>

                                            <h5 className="fw-bold mb-0">
                                                {parcel.trackingNumber}
                                            </h5>

                                        </div>


                                        {/* STATUS */}

                                        <span
                                            className="badge px-3 py-2 rounded-pill"
                                            style={{
                                                backgroundColor:
                                                    getStatusColor(
                                                        parcel.currentStatus
                                                    ),
                                                color:
                                                    getStatusTextColor(
                                                        parcel.currentStatus
                                                    )
                                            }}
                                        >
                                            {parcel.currentStatus}
                                        </span>

                                    </div>


                                    <hr />


                                    {/* ================= DELIVERY INFORMATION ================= */}

                                    <div className="row g-4">

                                        <div className="col-md-3">

                                            <div className="text-muted small mb-1">
                                                ROUTE
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.routeCode ||
                                                    "Not assigned"}
                                            </div>

                                        </div>


                                        <div className="col-md-3">

                                            <div className="text-muted small mb-1">
                                                COURIER
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.courierName ||
                                                    "Not assigned"}
                                            </div>

                                        </div>


                                        <div className="col-md-3">

                                            <div className="text-muted small mb-1">
                                                EXPECTED DELIVERY
                                            </div>

                                            <div className="fw-semibold">

                                                {parcel.expectedDeliveryDate
                                                    ? new Date(
                                                        parcel.expectedDeliveryDate
                                                    ).toLocaleString()
                                                    : "-"}

                                            </div>

                                        </div>


                                        <div className="col-md-3">

                                            <div className="text-muted small mb-1">
                                                ACTUAL DELIVERY
                                            </div>

                                            <div className="fw-semibold">

                                                {parcel.actualDeliveryDate
                                                    ? new Date(
                                                        parcel.actualDeliveryDate
                                                    ).toLocaleString()
                                                    : "Not delivered"}

                                            </div>

                                        </div>

                                    </div>


                                    {/* ================= VIEW BUTTON ================= */}

                                    <div className="d-flex justify-content-end mt-4">

                                        <button
                                            type="button"
                                            className="btn btn-outline-dark px-4"
                                            onClick={() => {

                                                setSelectedParcel(parcel);
                                                setShowViewModal(true);

                                            }}
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* ================= VIEW MODAL ================= */}

            <ViewCourierParcelModal
                show={showViewModal}
                parcel={selectedParcel}
                onClose={() => {

                    setShowViewModal(false);
                    setSelectedParcel(null);

                }}
            />

        </div>
    );
}

export default Tracking;