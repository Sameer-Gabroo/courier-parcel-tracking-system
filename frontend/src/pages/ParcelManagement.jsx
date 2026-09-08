import { useEffect, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import AddParcelModal from "../Components/Parcel/AddParcelModal";
import CustomerService from "../Services/CustomerService";
import EditParcelModal from "../Components/Parcel/EditParcelModal";
import ParcelService from "../Services/ParcelService";
import RouteService from "../Services/RouteService";
import ViewParcelModal from "../Components/Parcel/ViewParcelModal";
import "../styles/Button.css";

const getStatusClass = (status) => {
    switch (status) {
        case "Pending":
            return "status-badge pending";

        case "Assigned":
            return "status-badge assigned";

        case "Picked Up":
            return "status-badge picked-up";

        case "In Transit":
            return "status-badge in-transit";

        case "Out for Delivery":
            return "status-badge out-for-delivery";

        case "Delivered":
            return "status-badge delivered";

        default:
            return "status-badge default";
    }
};



function ParcelManagement() {
    const [parcels, setParcels] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [showViewModal, setShowViewModal] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    // Success Modal
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const userRoles = loggedInUser?.roles || [];

    const canEditParcel =
        !userRoles.includes("Dispatcher") &&
        !userRoles.includes("Courier");

    const handleEditParcel = (parcel) => {
        setSelectedParcel(parcel);
        setShowEditModal(true);
    };

    const getRoutes = async () => {
        try {
            setRoutes(await RouteService.getRoutes());
        } catch (error) {
            console.error("Error getting routes:", error);
        }
    };

    const getParcels = async () => {
        try {
            const response = await ParcelService.getParcels(
                currentPage,
                pageSize,
                search,
                status
            );

            setParcels(response.parcels);
            setTotalPages(response.totalPages);
            setTotalCount(response.totalCount);
        } catch (error) {
            console.error("Error getting parcels:", error);
        }
    };

  const getCustomers = async () => {
    try {
        const response = await CustomerService.getCustomers(
            1,
            1000,
            ""
        );

        setCustomers(response.customers);

    } catch (error) {
        console.error("Error getting customers:", error);
    }
};

    useEffect(() => {
        getParcels();
    }, [currentPage, pageSize, search, status]);

    useEffect(() => {
        getCustomers();
        getRoutes();
    }, []);

    const handleSaveParcel = async (parcel) => {
        try {
            await ParcelService.addParcel(parcel);

            setShowModal(false);

            await getParcels();

            setSuccessMessage("Parcel added successfully!");
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Error adding parcel:", error);
        }
    };

    const handleUpdateParcel = async (parcelId, parcel) => {
        try {
            await ParcelService.updateParcel(parcelId, parcel);

            setShowEditModal(false);
            setSelectedParcel(null);

            await getParcels();

            setSuccessMessage("Parcel updated successfully!");
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Error updating parcel:", error);
        }
    };

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">
                        Parcel Management
                    </h2>

                    <p className="text-muted mb-0">
                        Create and view courier parcels.
                    </p>
                </div>

                {canEditParcel && (
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Parcel
                    </button>
                )}
            </div>


            {/* Search / Filter */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="row g-3">

                        {/* Search */}

                        <div className="col-md-6">

                            <label className="form-label fw-semibold">
                                Search Parcels
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search tracking number, customer or receiver..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />

                        </div>


                        {/* Status Filter */}

                        <div className="col-md-4">

                            <label className="form-label fw-semibold">
                                Filter by Status
                            </label>

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >

                                <option value="">
                                    All Statuses
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Assigned">
                                    Assigned
                                </option>

                                <option value="Picked Up">
                                    Picked Up
                                </option>

                                <option value="In Transit">
                                    In Transit
                                </option>

                                <option value="Out for Delivery">
                                    Out for Delivery
                                </option>

                                <option value="Delivered">
                                    Delivered
                                </option>

                            </select>

                        </div>


                        {/* Page Size */}

                        <div className="col-md-2">

                            <label className="form-label fw-semibold">
                                Show
                            </label>

                            <select
                                className="form-select"
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                            >

                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>


            {/* Parcel Table */}

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>

                                    <th>Tracking Number</th>
                                    <th>Customer</th>
                                    <th>Receiver</th>
                                    <th>Courier</th>
                                    <th>Route</th>
                                    <th>Status</th>
                                    <th>Expected Delivery</th>
                                    <th>Actions</th>

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
                                            {parcel.courierName || "Unassigned"}
                                        </td>

                                        <td>
                                            {parcel.routeCode || "Unassigned"}
                                        </td>

                                        <td>
                                            <span className={getStatusClass(parcel.currentStatus)}>
                                                {parcel.currentStatus}
                                            </span>
                                        </td>

                                        <td>
                                            {parcel.expectedDeliveryDate
                                                ? new Date(
                                                    parcel.expectedDeliveryDate
                                                ).toLocaleString()
                                                : "-"}
                                        </td>

                                        <td>

                                            {/* View */}

                                          {/* Actions */}

<div className="parcel-actions">

    <button
        type="button"
        className="parcel-icon-btn view"
        onClick={async () => {
            try {
                const data =
                    await ParcelService.getParcelById(
                        parcel.parcelId
                    );

                setSelectedParcel(data);
                setShowViewModal(true);

            } catch (error) {
                console.error(
                    "Error loading parcel details:",
                    error
                );
            }
        }}
        title="View parcel"
        aria-label="View parcel"
    >
        <Eye size={17} strokeWidth={1.7} />
    </button>

    {canEditParcel && (
        <button
            type="button"
            className="parcel-icon-btn edit"
            onClick={() =>
                handleEditParcel(parcel)
            }
            title="Edit parcel"
            aria-label="Edit parcel"
        >
            <Pencil size={17} strokeWidth={1.7} />
        </button>
    )}

</div>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>


                        {/* Pagination */}

                        <div className="d-flex justify-content-between align-items-center mt-4">

                            <div className="text-muted">

                                Showing page {currentPage} of {totalPages}

                                <span className="ms-2">
                                    ({totalCount} parcels)
                                </span>

                            </div>


                            <div className="d-flex gap-2">

                                <button
                                    className="btn btn-outline-secondary"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                >
                                    Previous
                                </button>


                                <span className="btn btn-primary">
                                    {currentPage}
                                </span>


                                <button
                                    className="btn btn-outline-secondary"
                                    disabled={
                                        currentPage === totalPages ||
                                        totalPages === 0
                                    }
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                >
                                    Next
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Add Parcel Modal */}

            <AddParcelModal
                show={showModal}
                onSave={handleSaveParcel}
                onClose={() => setShowModal(false)}
                customers={customers}
                routes={routes}
            />


            {/* Edit Parcel Modal */}

            <EditParcelModal
                show={showEditModal}
                onSave={handleUpdateParcel}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedParcel(null);
                }}
                customers={customers}
                parcel={selectedParcel}
                routes={routes}
            />


            {/* View Parcel Modal */}

            <ViewParcelModal
                show={showViewModal}
                onClose={() => {
                    setShowViewModal(false);
                    setSelectedParcel(null);
                }}
                parcel={selectedParcel}
            />


            {/* Success Modal */}

            {showSuccessModal && (
                <>
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                    >
                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5 className="modal-title">
                                        Success
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() =>
                                            setShowSuccessModal(false)
                                        }
                                    ></button>

                                </div>


                                <div className="modal-body text-center">

                                    <h5 className="text-success">
                                        ✓ {successMessage}
                                    </h5>

                                </div>


                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() =>
                                            setShowSuccessModal(false)
                                        }
                                    >
                                        OK
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="modal-backdrop fade show"></div>
                </>
            )}

        </div>
    );
}

export default ParcelManagement;