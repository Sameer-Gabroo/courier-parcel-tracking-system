import {
    getStatusColor,
    getStatusTextColor
} from "../../Utils/statusHelper";

function ViewParcelModal({ show, onClose, parcel }) {

    if (!show || !parcel) {
        return null;
    }

    return (
        <>
            {/* ================= MODAL ================= */}

            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
            >

                <div
                    className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
                >

                    <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">


                        {/* ================= HEADER ================= */}

                        <div className="modal-header bg-white border-bottom px-4 py-3">

                            <div>

                                <div className="text-muted small mb-1">
                                    PARCEL ORDER
                                </div>

                                <h4 className="fw-bold mb-1">
                                    Parcel Details
                                </h4>

                                <div className="small text-muted">

                                    Tracking Number:

                                    <span className="fw-semibold text-dark ms-2">
                                        {parcel.trackingNumber}
                                    </span>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />

                        </div>


                        {/* ================= BODY ================= */}

                        <div className="modal-body bg-light p-4">


                            {/* ================= PARCEL SUMMARY ================= */}

                            <div className="card border-0 shadow-sm rounded-4 mb-4">

                                <div className="card-body p-4">

                                    <div className="row g-4">


                                        {/* STATUS */}

                                        <div className="col-md-4">

                                            <div className="text-muted small mb-2">
                                                CURRENT STATUS
                                            </div>

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


                                        {/* BOOKED DATE */}

                                        <div className="col-md-4">

                                            <div className="text-muted small mb-2">
                                                BOOKED DATE
                                            </div>

                                            <div className="fw-semibold">

                                                {parcel.bookedAt
                                                    ? new Date(
                                                        parcel.bookedAt
                                                    ).toLocaleString()
                                                    : "-"}

                                            </div>

                                        </div>


                                        {/* COURIER */}

                                        <div className="col-md-4">

                                            <div className="text-muted small mb-2">
                                                COURIER
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.courierName ||
                                                    "Unassigned"}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ================= DELIVERY INFORMATION ================= */}

                            <div className="card border-0 shadow-sm rounded-4 mb-4">

                                <div className="card-body p-4">

                                    <h5 className="fw-bold mb-4">
                                        Delivery Information
                                    </h5>


                                    <div className="row g-4">


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
                                                    : "Not delivered yet"}

                                            </div>

                                        </div>


                                        <div className="col-md-3">

                                            <div className="text-muted small mb-1">
                                                ORIGIN HUB
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.originHubName || "-"}
                                            </div>

                                        </div>


                                        <div className="col-md-3">

                                            <div className="text-muted small mb-1">
                                                DESTINATION HUB
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.destinationHubName || "-"}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ================= CUSTOMER + COURIER ================= */}

                            <div className="row g-4 mb-4">


                                {/* CUSTOMER */}

                                <div className="col-md-6">

                                    <div className="card border-0 shadow-sm rounded-4 h-100">

                                        <div className="card-body p-4">

                                            <h5 className="fw-bold mb-4">
                                                Customer Information
                                            </h5>


                                            <div className="mb-3">

                                                <div className="text-muted small">
                                                    Name
                                                </div>

                                                <div className="fw-semibold">
                                                    {parcel.customerName || "-"}
                                                </div>

                                            </div>


                                            <div>

                                                <div className="text-muted small">
                                                    Customer ID
                                                </div>

                                                <div className="fw-semibold">
                                                    {parcel.customerId || "-"}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* COURIER */}

                                <div className="col-md-6">

                                    <div className="card border-0 shadow-sm rounded-4 h-100">

                                        <div className="card-body p-4">

                                            <h5 className="fw-bold mb-4">
                                                Courier Information
                                            </h5>


                                            <div className="mb-3">

                                                <div className="text-muted small">
                                                    Courier
                                                </div>

                                                <div className="fw-semibold">
                                                    {parcel.courierName ||
                                                        "Unassigned"}
                                                </div>

                                            </div>


                                            <div>

                                                <div className="text-muted small">
                                                    Route
                                                </div>

                                                <div className="fw-semibold">
                                                    {parcel.routeCode ||
                                                        "Unassigned"}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ================= RECEIVER INFORMATION ================= */}

                            <div className="card border-0 shadow-sm rounded-4 mb-4">

                                <div className="card-body p-4">

                                    <h5 className="fw-bold mb-4">
                                        Receiver Information
                                    </h5>


                                    <div className="row g-4">


                                        <div className="col-md-4">

                                            <div className="text-muted small mb-1">
                                                NAME
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.parcelRecipient?.receiverName ||
                                                    "-"}
                                            </div>

                                        </div>


                                        <div className="col-md-4">

                                            <div className="text-muted small mb-1">
                                                PHONE
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.parcelRecipient?.receiverPhone ||
                                                    "-"}
                                            </div>

                                        </div>


                                        <div className="col-md-4">

                                            <div className="text-muted small mb-1">
                                                DELIVERY ADDRESS
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.parcelRecipient?.receiverAddress ||
                                                    "-"}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ================= ROUTE INFORMATION ================= */}

                            <div className="card border-0 shadow-sm rounded-4 mb-4">

                                <div className="card-body p-4">

                                    <h5 className="fw-bold mb-4">
                                        Route Information
                                    </h5>


                                    <div className="row g-4">


                                        <div className="col-md-4">

                                            <div className="text-muted small mb-1">
                                                ROUTE CODE
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.routeCode ||
                                                    "Unassigned"}
                                            </div>

                                        </div>


                                        <div className="col-md-4">

                                            <div className="text-muted small mb-1">
                                                ORIGIN HUB
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.originHubName || "-"}
                                            </div>

                                        </div>


                                        <div className="col-md-4">

                                            <div className="text-muted small mb-1">
                                                DESTINATION HUB
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.destinationHubName || "-"}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ================= PARCEL DETAILS ================= */}

                            <div className="card border-0 shadow-sm rounded-4">

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center mb-4">

                                        <h5 className="fw-bold mb-0">
                                            Parcel Details
                                        </h5>

                                        <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">

                                            {parcel.parcelDetails?.length || 0}
                                            {" "}Item(s)

                                        </span>

                                    </div>


                                    {parcel.parcelDetails?.length > 0 ? (

                                        <div className="row g-3">

                                            {parcel.parcelDetails.map(
                                                (detail) => (

                                                    <div
                                                        className="col-md-6"
                                                        key={
                                                            detail.parcelDetailId
                                                        }
                                                    >

                                                        <div className="border rounded-4 p-4 h-100">

                                                            {/* ITEM HEADER */}

                                                            <div className="d-flex justify-content-between align-items-start mb-4">

                                                                <div>

                                                                    <div className="text-muted small mb-1">
                                                                        ITEM NAME
                                                                    </div>

                                                                    <div className="fw-bold fs-5">
                                                                        {detail.itemName ||
                                                                            "-"}
                                                                    </div>

                                                                </div>


                                                                <div className="text-end">

                                                                    <div className="text-muted small mb-1">
                                                                        QUANTITY
                                                                    </div>

                                                                    <div className="fw-bold fs-5">
                                                                        {detail.quantity}
                                                                    </div>

                                                                </div>

                                                            </div>


                                                            {/* WEIGHT */}

                                                            <div className="mb-3">

                                                                <div className="text-muted small mb-1">
                                                                    WEIGHT
                                                                </div>

                                                                <div className="fw-semibold">
                                                                    {detail.weightKg != null
                                                                        ? `${detail.weightKg} Kg`
                                                                        : "-"}
                                                                </div>

                                                            </div>


                                                            {/* DESCRIPTION */}

                                                            <div>

                                                                <div className="text-muted small mb-1">
                                                                    DESCRIPTION
                                                                </div>

                                                                <div className="fw-semibold">
                                                                    {detail.description ||
                                                                        "-"}
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    ) : (

                                        <div className="text-muted text-center py-4">
                                            No parcel details available.
                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* ================= TRACKING HISTORY ================= */}

<div className="card border-0 shadow-sm rounded-4 mt-4">

    <div className="card-body p-4">

        <h5 className="fw-bold mb-4">
            Tracking History
        </h5>

        {parcel.statusEvents?.length > 0 ? (

            <div className="position-relative">

                {parcel.statusEvents.map((event, index) => (

                    <div
                        key={event.statusEventId}
                        className="d-flex position-relative mb-4"
                    >

                        {/* Timeline Line */}

                        {index !== parcel.statusEvents.length - 1 && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: "9px",
                                    top: "20px",
                                    bottom: "-24px",
                                    width: "2px",
                                    backgroundColor: "#dee2e6"
                                }}
                            />
                        )}


                        {/* Status Circle */}

                        <div
                            className="rounded-circle flex-shrink-0"
                            style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: getStatusColor(
                                    event.status
                                ),
                                border: "3px solid white",
                                boxShadow:
                                    "0 0 0 1px #dee2e6"
                            }}
                        />


                        {/* Event Content */}

                        <div className="ms-3 flex-grow-1">

                            <div className="d-flex justify-content-between align-items-start">

                                <div>

                                    <span
                                        className="badge px-3 py-2 rounded-pill"
                                        style={{
                                            backgroundColor:
                                                getStatusColor(
                                                    event.status
                                                ),
                                            color:
                                                getStatusTextColor(
                                                    event.status
                                                )
                                        }}
                                    >
                                        {event.status}
                                    </span>

                                </div>


                                <small className="text-muted">

                                    {event.eventTime
                                        ? new Date(
                                            event.eventTime
                                        ).toLocaleString()
                                        : "-"}

                                </small>

                            </div>


                            {/* Hub */}

                            <div className="mt-2">

                                <div className="small text-muted">
                                    Hub
                                </div>

                                <div className="fw-semibold">
                                    {event.hubName ||
                                        "Hub not available"}
                                </div>

                            </div>


                            {/* Courier */}

                            <div className="mt-2">

                                <div className="small text-muted">
                                    Courier
                                </div>

                                <div className="fw-semibold">

                                    {event.courierName || "-"}

                                </div>

                            </div>


                            {/* Remarks */}

                            {event.remarks && (

                                <div className="mt-2">

                                    <div className="small text-muted">
                                        Remarks
                                    </div>

                                    <div>
                                        {event.remarks}
                                    </div>

                                </div>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        ) : (

            <div className="text-muted text-center py-4">

                No tracking history available.

            </div>

        )}

    </div>

</div>

                        </div>


                        {/* ================= FOOTER ================= */}

                        <div className="modal-footer bg-white border-0 px-4 py-3">

                            <button
                                type="button"
                                className="btn btn-secondary px-4"
                                onClick={onClose}
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= BACKDROP ================= */}

            <div className="modal-backdrop fade show"></div>

        </>
    );
}

export default ViewParcelModal;