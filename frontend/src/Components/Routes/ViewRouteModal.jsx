function ViewRouteModal({ show, onClose, route }) {
    if (!show || !route) return null;

    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        {/* Modal Header */}
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Route Details
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">

                            <h6 className="fw-bold mb-3">
                                Route Information
                            </h6>

                            <div className="row">

                                {/* Route Code */}
                                <div className="col-md-6 mb-3">
                                    <small className="text-muted">
                                        Route Code
                                    </small>

                                    <div className="fw-semibold">
                                        {route.routeCode}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-md-6 mb-3">
                                    <small className="text-muted">
                                        Status
                                    </small>

                                    <div>
                                        <span
                                            className={`badge ${
                                                route.isActive
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                            }`}
                                        >
                                            {route.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </div>
                                </div>

                                {/* Origin Hub */}
                                <div className="col-md-6 mb-3">
                                    <small className="text-muted">
                                        Origin Hub
                                    </small>

                                    <div className="fw-semibold">
                                        {route.originHubName}
                                    </div>
                                </div>

                                {/* Destination Hub */}
                                <div className="col-md-6 mb-3">
                                    <small className="text-muted">
                                        Destination Hub
                                    </small>

                                    <div className="fw-semibold">
                                        {route.destinationHubName}
                                    </div>
                                </div>

                                {/* Distance */}
                                <div className="col-md-6 mb-3">
                                    <small className="text-muted">
                                        Distance
                                    </small>

                                    <div className="fw-semibold">
                                        {route.distanceKm} km
                                    </div>
                                </div>

                                {/* Estimated Hours */}
                                <div className="col-md-6 mb-3">
                                    <small className="text-muted">
                                        Estimated Hours
                                    </small>

                                    <div className="fw-semibold">
                                        {route.estimatedHours} hours
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Close
                            </button>

                        </div>

                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default ViewRouteModal;