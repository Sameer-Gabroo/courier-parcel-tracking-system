function ViewCourierModal({ show, courier, onClose }) {

    if (!show || !courier) {
        return null;
    }

    return (
        <>

            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
            >

                <div className="modal-dialog modal-lg modal-dialog-centered">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">
                                Courier Details
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            >
                            </button>

                        </div>


                        <div className="modal-body">

                            {/* Courier Information */}

                            <h6 className="fw-bold mb-3">
                                Courier Information
                            </h6>


                            <div className="row g-3">

                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Courier Code
                                    </label>

                                    <p className="fw-semibold">
                                        {courier.courierCode}
                                    </p>

                                </div>


                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Status
                                    </label>

                                    <p>

                                        <span
                                            className={`badge ${
                                                courier.isActive
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                            }`}
                                        >
                                            {courier.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </p>

                                </div>


                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Courier Name
                                    </label>

                                    <p className="fw-semibold">
                                        {courier.courierName}
                                    </p>

                                </div>


                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Email
                                    </label>

                                    <p className="fw-semibold">
                                        {courier.email}
                                    </p>

                                </div>


                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        City
                                    </label>

                                    <p className="fw-semibold">
                                        {courier.city}
                                    </p>

                                </div>

                            </div>


                            <hr className="my-4" />


                            {/* Contact Information */}

                            <h6 className="fw-bold mb-3">
                                Contact Information
                            </h6>


                            <div className="row g-3">

                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Phone
                                    </label>

                                    <p className="fw-semibold">
                                        {courier.phone}
                                    </p>

                                </div>


                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Emergency Contact
                                    </label>

                                    <p className="fw-semibold">
                                        {courier.emergencyContact}
                                    </p>

                                </div>


                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Emergency Phone
                                    </label>

                                    <p className="fw-semibold">
                                        {courier.emergencyPhone}
                                    </p>

                                </div>


                                <div className="col-6">

                                    <label className="text-muted small">
                                        Address
                                    </label>

                                    <p className="fw-semibold mb-0">
                                        {courier.address}
                                    </p>

                                </div>

                            </div>

                        </div>


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

export default ViewCourierModal;