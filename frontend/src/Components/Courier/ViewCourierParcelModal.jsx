import { getStatusColor,getStatusTextColor} from "../../Utils/statusHelper";
function ViewCourierParcelModal({ show, parcel, onClose }) {

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
                                    COURIER ORDER
                                </div>

                                <h4 className="fw-bold mb-1">
                                    Order Details
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


                            {/* ================= STATUS SUMMARY ================= */}

                            <div className="card border-0 shadow-sm rounded-4 mb-4">

                                <div className="card-body p-4">

                                    <div className="row g-4">

                                        <div className="col-md-4">

                                            <div className="text-muted small mb-2">
                                                CURRENT STATUS
                                            </div>

                                      <span
                                      className="badge px-3 py-2 rounded-pill"
                                      style={{
                                          backgroundColor: getStatusColor(
                                              parcel.currentStatus
                                          ),
                                          color: getStatusTextColor(
                                              parcel.currentStatus
                                          )
                                      }}
                                  >
                                      {parcel.currentStatus}
                                  </span>

                                        </div>


                                        <div className="col-md-4">

                                            <div className="text-muted small mb-2">
                                                ROUTE
                                            </div>

                                            <div className="fw-semibold">
                                                {parcel.routeCode ||
                                                    "Unassigned"}
                                            </div>

                                        </div>


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


                            {/* ================= CUSTOMER + RECEIVER ================= */}

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


                                            <div className="mb-3">

                                                <div className="text-muted small">
                                                    Email
                                                </div>

                                                <div className="fw-semibold">
                                                    {parcel.customerEmail || "-"}
                                                </div>

                                            </div>


                                            <div className="mb-3">

                                                <div className="text-muted small">
                                                    Phone
                                                </div>

                                                <div className="fw-semibold">
                                                    {parcel.customerPhone || "-"}
                                                </div>

                                            </div>


                                            <div>

                                                <div className="text-muted small">
                                                    Address
                                                </div>

                                                <div className="fw-semibold">
                                                    {parcel.customerAddress || "-"}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* RECEIVER */}

                                <div className="col-md-6">

                                    <div className="card border-0 shadow-sm rounded-4 h-100">

                                        <div className="card-body p-4">

                                            <h5 className="fw-bold mb-4">
                                                Receiver Information
                                            </h5>


                                            <div className="mb-3">

                                                <div className="text-muted small">
                                                    Name
                                                </div>

                                                <div className="fw-semibold">
                                                    {parcel.parcelRecipient?.receiverName || "-"}
                                                </div>

                                            </div>


                                            <div className="mb-3">

                                                <div className="text-muted small">
                                                    Phone
                                                </div>

                                                <div className="fw-semibold">
                                                    {parcel.parcelRecipient?.receiverPhone || "-"}
                                                </div>

                                            </div>


                                            <div>

                                                <div className="text-muted small">
                                                    Delivery Address
                                                </div>

                                                <div className="fw-semibold">
                                                    {parcel.parcelRecipient?.receiverAddress || "-"}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ================= PARCEL DETAILS ================= */}

                            <div className="card border-0 shadow-sm rounded-4 mb-4">

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center mb-4">

                                        <h5 className="fw-bold mb-0">
                                            Parcel Details
                                        </h5>

                                        <span className="badge bg-light text-dark border">

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

                                                        <div className="border rounded-3 p-3 h-100 bg-light">

                                                            <div className="d-flex justify-content-between mb-3">

                                                                <div>

                                                                    <div className="text-muted small">
                                                                        Item
                                                                    </div>

                                                                    <div className="fw-bold">
                                                                        {detail.itemName || "-"}
                                                                    </div>

                                                                </div>


                                                                <div className="text-end">

                                                                    <div className="text-muted small">
                                                                        Quantity
                                                                    </div>

                                                                    <div className="fw-bold">
                                                                        {detail.quantity}
                                                                    </div>

                                                                </div>

                                                            </div>


                                                            <div className="row">

                                                                <div className="col-6">

                                                                    <div className="text-muted small">
                                                                        Weight
                                                                    </div>

                                                                    <div className="fw-semibold">

                                                                        {detail.weightKg != null
                                                                            ? `${detail.weightKg} kg`
                                                                            : "-"}

                                                                    </div>

                                                                </div>


                                                                <div className="col-6">

                                                                    <div className="text-muted small">
                                                                        Description
                                                                    </div>

                                                                    <div className="fw-semibold">
                                                                        {detail.description || "-"}
                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    ) : (

                                        <div className="text-muted">
                                            No parcel details available.
                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* ================= TRACKING HISTORY ================= */}

                            <div className="card border-0 shadow-sm rounded-4">

                                <div className="card-body p-4">

                                    <h5 className="fw-bold mb-4">
                                        Tracking History
                                    </h5>


                                    {parcel.statusEvents?.length > 0 ? (

                                        <div>

                                            {parcel.statusEvents.map(
                                                (event, index) => (

                                                    <div
                                                        className="d-flex"
                                                        key={
                                                            event.statusEventId
                                                        }
                                                    >

                                                        {/* Timeline */}

                                                        <div className="d-flex flex-column align-items-center me-3">

                                                            <div
                                                      className="rounded-circle"
                                                      style={{
                                                          width: "14px",
                                                          height: "14px",
                                                          backgroundColor: getStatusColor(
                                                              event.status
                                                          )
                                                      }}
                                                  />

                                                            {index !==
                                                                parcel.statusEvents.length -
                                                                1 && (

                                                                <div
                                                                    style={{
                                                                        width: "2px",
                                                                        minHeight: "70px",
                                                                        background: "#dee2e6"
                                                                    }}
                                                                />

                                                            )}

                                                        </div>


                                                        {/* EVENT */}

                                                        <div className="pb-4 flex-grow-1">

                                                            <div className="d-flex justify-content-between align-items-start">

                                                                <div>

                                                                    <div className="fw-bold">
                                                                        {event.status}
                                                                    </div>

                                                                    <div className="text-muted small">
                                                                        {event.hubName ||
                                                                            "Hub not available"}
                                                                    </div>

                                                                </div>


                                                                <div className="text-muted small text-end">

                                                                    {event.eventTime
                                                                        ? new Date(
                                                                            event.eventTime
                                                                        ).toLocaleString()
                                                                        : "-"}

                                                                </div>

                                                            </div>


                                                            <div className="mt-2 small">

                                                                <span className="text-muted">
                                                                    Courier:
                                                                </span>{" "}

                                                                <span className="fw-semibold">
                                                                    {event.courierName ||
                                                                        "-"}
                                                                </span>

                                                            </div>


                                                            {event.remarks && (

                                                                <div className="mt-1 small text-muted">

                                                                    Remarks:{" "}
                                                                    {event.remarks}

                                                                </div>

                                                            )}

                                                        </div>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    ) : (

                                        <div className="text-center py-4">

                                            <div className="text-muted">
                                                No tracking history available.
                                            </div>

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


            {/* BACKDROP */}

            <div className="modal-backdrop fade show"></div>

        </>
    );
}

export default ViewCourierParcelModal;