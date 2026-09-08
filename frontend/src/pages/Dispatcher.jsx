import { useEffect, useState } from "react";
import ParcelService from "../Services/ParcelService";
import CourierService from "../Services/CourierService";

function Dispatcher() {
    const [parcels, setParcels] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [courierId, setCourierId] = useState("");

    const loadData = async () => {
        try {
            const pendingParcels =
                await ParcelService.getPendingParcels();

            setParcels(pendingParcels);
        } catch (error) {
            console.error(
                "Error loading dispatcher data:",
                error
            );
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSelectParcel = async (parcel) => {
        setSelectedParcel(parcel);
        setCourierId("");
        setCouriers([]);

        try {
            const availableCouriers =
                await CourierService.getAvailableCouriersForParcel(
                    parcel.parcelId
                );

            setCouriers(availableCouriers);
        } catch (error) {
            console.error(
                "Error getting available couriers:",
                error
            );

            setCouriers([]);
        }
    };

    const assignParcel = async () => {
        try {
            await ParcelService.assignParcel(
                selectedParcel.parcelId,
                {
                    courierId: Number(courierId)
                }
            );

            setSelectedParcel(null);
            setCourierId("");
            setCouriers([]);

            loadData();
        } catch (error) {
            console.error(
                "Error assigning parcel:",
                error
            );
        }
    };

    const cancelSelection = () => {
        setSelectedParcel(null);
        setCourierId("");
        setCouriers([]);
    };

    return (
        <div>

            {/* Page Header */}

            <div className="mb-4">

                <h2 className="fw-bold mb-1">
                    Dispatcher Dashboard
                </h2>

                <p className="text-muted mb-0">
                    Review pending parcels and assign them to available couriers.
                </p>

            </div>


            {/* Summary Cards */}

            <div className="row g-3 mb-4">

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>
                                    <p className="text-muted mb-1">
                                        Pending Parcels
                                    </p>

                                    <h3 className="fw-bold mb-0">
                                        {parcels.length}
                                    </h3>
                                </div>

                                <div
                                    className="rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px"
                                    }}
                                >
                                    <span className="text-warning fw-bold">
                                        !
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>
                                    <p className="text-muted mb-1">
                                        Selected Parcel
                                    </p>

                                    <h6 className="fw-bold mb-0">
                                        {selectedParcel
                                            ? selectedParcel.trackingNumber
                                            : "None selected"}
                                    </h6>
                                </div>

                                <div
                                    className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px"
                                    }}
                                >
                                    <span className="text-primary fw-bold">
                                        P
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>
                                    <p className="text-muted mb-1">
                                        Available Couriers
                                    </p>

                                    <h3 className="fw-bold mb-0">
                                        {selectedParcel
                                            ? couriers.length
                                            : "-"}
                                    </h3>
                                </div>

                                <div
                                    className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px"
                                    }}
                                >
                                    <span className="text-success fw-bold">
                                        C
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Main Content */}

            <div className="row g-4">

                {/* Pending Parcels */}

                <div className="col-lg-5">

                    <div className="card border-0 shadow-sm">

                        <div className="card-header bg-white border-0 pt-4 px-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        Pending Parcels
                                    </h5>

                                    <small className="text-muted">
                                        Select a parcel to assign a courier
                                    </small>

                                </div>

                                <span className="badge bg-warning text-dark px-3 py-2">
                                    {parcels.length} Pending
                                </span>

                            </div>

                        </div>


                        <div className="card-body px-4">

                            {parcels.length === 0 ? (

                                <div className="text-center py-5">

                                    <div
                                        className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3"
                                        style={{
                                            width: "60px",
                                            height: "60px"
                                        }}
                                    >
                                        <span className="text-success fs-4">
                                            ✓
                                        </span>
                                    </div>

                                    <h6 className="fw-semibold">
                                        All caught up!
                                    </h6>

                                    <p className="text-muted mb-0">
                                        There are no pending parcels right now.
                                    </p>

                                </div>

                            ) : (

                                <div>

                                    {parcels.map((parcel) => (

                                        <button
                                            key={parcel.parcelId}
                                            type="button"
                                            className={`w-100 text-start border rounded p-3 mb-3 ${
                                                selectedParcel?.parcelId === parcel.parcelId
                                                    ? "border-primary bg-primary bg-opacity-10"
                                                    : "bg-white"
                                            }`}
                                            onClick={() =>
                                                handleSelectParcel(parcel)
                                            }
                                            style={{
                                                cursor: "pointer"
                                            }}
                                        >

                                            <div className="d-flex justify-content-between align-items-start">

                                                <div>

                                                    <div className="fw-bold mb-1">
                                                        {parcel.trackingNumber}
                                                    </div>

                                                    <div className="small text-muted mb-1">
                                                        Customer:{" "}
                                                        <span className="text-dark">
                                                            {parcel.customerName || "-"}
                                                        </span>
                                                    </div>

                                                    <div className="small text-muted">
                                                        Receiver:{" "}
                                                        <span className="text-dark">
                                                            {parcel.parcelRecipient?.receiverName || "-"}
                                                        </span>
                                                    </div>

                                                </div>

                                                <span className="badge bg-warning text-dark">
                                                    Pending
                                                </span>

                                            </div>

                                            {selectedParcel?.parcelId === parcel.parcelId && (

                                                <div className="mt-3 pt-2 border-top">

                                                    <small className="text-primary fw-semibold">
                                                        Selected for assignment
                                                    </small>

                                                </div>

                                            )}

                                        </button>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>

                </div>


                {/* Parcel Details */}

                <div className="col-lg-7">

                    {selectedParcel ? (

                        <div className="card border-0 shadow-sm">

                            {/* Header */}

                            <div className="card-header bg-white border-0 pt-4 px-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <small className="text-muted">
                                            Tracking Number
                                        </small>

                                        <h4 className="fw-bold mb-0">
                                            {selectedParcel.trackingNumber}
                                        </h4>

                                    </div>

                                    <span className="badge bg-primary px-3 py-2">
                                        {selectedParcel.currentStatus}
                                    </span>

                                </div>

                            </div>


                            <div className="card-body px-4">


                                {/* Customer */}

                                <div className="mb-4">

                                    <h6 className="fw-bold mb-3">
                                        Customer Information
                                    </h6>

                                    <div className="bg-light rounded p-3">

                                        <div className="row g-3">

                                            <div className="col-md-6">

                                                <small className="text-muted">
                                                    Name
                                                </small>

                                                <div className="fw-semibold">
                                                    {selectedParcel.customerName || "-"}
                                                </div>

                                            </div>

                                            <div className="col-md-6">

                                                <small className="text-muted">
                                                    Phone
                                                </small>

                                                <div className="fw-semibold">
                                                    {selectedParcel.customerPhone || "-"}
                                                </div>

                                            </div>

                                            <div className="col-md-8">

                                                <small className="text-muted">
                                                    Address
                                                </small>

                                                <div className="fw-semibold">
                                                    {selectedParcel.customerAddress || "-"}
                                                </div>

                                            </div>

                                            <div className="col-md-4">

                                                <small className="text-muted">
                                                    City
                                                </small>

                                                <div className="fw-semibold">
                                                    {selectedParcel.customerCity || "-"}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* Receiver */}

                                <div className="mb-4">

                                    <h6 className="fw-bold mb-3">
                                        Receiver Information
                                    </h6>

                                    <div className="bg-light rounded p-3">

                                        <div className="row g-3">

                                            <div className="col-md-6">

                                                <small className="text-muted">
                                                    Receiver Name
                                                </small>

                                                <div className="fw-semibold">
                                                    {selectedParcel.parcelRecipient?.receiverName || "-"}
                                                </div>

                                            </div>

                                            <div className="col-md-6">

                                                <small className="text-muted">
                                                    Phone
                                                </small>

                                                <div className="fw-semibold">
                                                    {selectedParcel.parcelRecipient?.receiverPhone || "-"}
                                                </div>

                                            </div>

                                            <div className="col-12">

                                                <small className="text-muted">
                                                    Address
                                                </small>

                                                <div className="fw-semibold">
                                                    {selectedParcel.parcelRecipient?.receiverAddress || "-"}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* Route */}

                                <div className="mb-4">

                                    <h6 className="fw-bold mb-3">
                                        Route Information
                                    </h6>

                                    <div className="row g-3">

                                        <div className="col-md-4">

                                            <div className="border rounded p-3 h-100">

                                                <small className="text-muted">
                                                    Route
                                                </small>

                                                <div className="fw-bold">
                                                    {selectedParcel.routeCode || "-"}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-4">

                                            <div className="border rounded p-3 h-100">

                                                <small className="text-muted">
                                                    Origin Hub
                                                </small>

                                                <div className="fw-bold">
                                                    {selectedParcel.originHubName || "-"}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-4">

                                            <div className="border rounded p-3 h-100">

                                                <small className="text-muted">
                                                    Destination Hub
                                                </small>

                                                <div className="fw-bold">
                                                    {selectedParcel.destinationHubName || "-"}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* Parcel Details */}

                                <div className="mb-4">

                                    <h6 className="fw-bold mb-3">
                                        Parcel Details
                                    </h6>

                                    {selectedParcel.parcelDetails?.length > 0 ? (

                                        selectedParcel.parcelDetails.map((detail) => (

                                            <div
                                                key={detail.parcelDetailId}
                                                className="border rounded p-3 mb-3"
                                            >

                                                <div className="row g-3">

                                                    <div className="col-md-6">

                                                        <small className="text-muted">
                                                            Item Name
                                                        </small>

                                                        <div className="fw-semibold">
                                                            {detail.itemName || "-"}
                                                        </div>

                                                    </div>

                                                    <div className="col-md-3">

                                                        <small className="text-muted">
                                                            Quantity
                                                        </small>

                                                        <div className="fw-semibold">
                                                            {detail.quantity}
                                                        </div>

                                                    </div>

                                                    <div className="col-md-3">

                                                        <small className="text-muted">
                                                            Weight
                                                        </small>

                                                        <div className="fw-semibold">
                                                            {detail.weightKg} Kg
                                                        </div>

                                                    </div>

                                                    <div className="col-12">

                                                        <small className="text-muted">
                                                            Description
                                                        </small>

                                                        <div className="fw-semibold">
                                                            {detail.description || "-"}
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        ))

                                    ) : (

                                        <p className="text-muted">
                                            No parcel details available.
                                        </p>

                                    )}

                                </div>


                                {/* Assignment */}

                                <div className="border-top pt-4">

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <div>

                                            <h6 className="fw-bold mb-1">
                                                Courier Assignment
                                            </h6>

                                            <small className="text-muted">
                                                Choose an available courier for this parcel.
                                            </small>

                                        </div>

                                        {couriers.length > 0 && (

                                            <span className="badge bg-success">
                                                {couriers.length} Available
                                            </span>

                                        )}

                                    </div>


                                    {couriers.length === 0 ? (

                                        <div className="alert alert-warning mb-4">

                                            <strong>
                                                No courier available
                                            </strong>

                                            <div className="small mt-1">
                                                There is currently no available courier
                                                matching the requirements for this parcel.
                                            </div>

                                        </div>

                                    ) : (

                                        <div className="mb-4">

                                            <label className="form-label fw-semibold">
                                                Available Courier
                                            </label>

                                            <select
                                                className="form-select form-select-lg"
                                                value={courierId}
                                                onChange={(e) =>
                                                    setCourierId(e.target.value)
                                                }
                                            >

                                                <option value="">
                                                    Select a courier
                                                </option>

                                                {couriers.map((courier) => (

                                                    <option
                                                        key={courier.courierId}
                                                        value={courier.courierId}
                                                    >
                                                        {courier.courierName} - {courier.city}
                                                    </option>

                                                ))}

                                            </select>

                                            <small className="text-muted">
                                                Only active couriers with no active order
                                                and a matching customer city are shown.
                                            </small>

                                        </div>

                                    )}


                                    <div className="d-flex gap-2">

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={cancelSelection}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-primary flex-grow-1"
                                            disabled={!courierId}
                                            onClick={assignParcel}
                                        >
                                            Assign Parcel
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ) : (

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body d-flex align-items-center justify-content-center">

                                <div className="text-center py-5 px-4">

                                    <div
                                        className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4"
                                        style={{
                                            width: "75px",
                                            height: "75px"
                                        }}
                                    >
                                        <span className="text-primary fs-3">
                                            →
                                        </span>
                                    </div>

                                    <h5 className="fw-bold">
                                        Select a Parcel
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Select a pending parcel from the list
                                        to view its details and assign a courier.
                                    </p>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Dispatcher;