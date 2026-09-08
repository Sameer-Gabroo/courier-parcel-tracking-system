function ViewUserModal({ show, onClose, user }) {

    if (!show || !user) {
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

                        {/* Header */}
                        <div className="modal-header">

                            <h5 className="modal-title">
                                User Details
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            >
                            </button>

                        </div>


                        {/* Body */}
                        <div className="modal-body">

                            {/* User Information */}
                            <h6 className="fw-bold mb-3">
                                User Information
                            </h6>

                            <div className="row g-3">

                                {/* User ID */}
                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        User ID
                                    </label>

                                    <p className="fw-semibold">
                                        {user.userId || "-"}
                                    </p>

                                </div>


                                {/* Username */}
                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        User Name
                                    </label>

                                    <p className="fw-semibold">
                                        {user.userName || "-"}
                                    </p>

                                </div>


                                {/* Email */}
                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Email
                                    </label>

                                    <p className="fw-semibold">
                                        {user.email || "-"}
                                    </p>

                                </div>


                                {/* First Name */}
                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        First Name
                                    </label>

                                    <p className="fw-semibold">
                                        {user.firstName || "-"}
                                    </p>

                                </div>


                                {/* Last Name */}
                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Last Name
                                    </label>

                                    <p className="fw-semibold">
                                        {user.lastName || "-"}
                                    </p>

                                </div>


                                {/* Phone */}
                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Phone
                                    </label>

                                    <p className="fw-semibold">
                                        {user.phone || "-"}
                                    </p>

                                </div>


                                {/* City */}
                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        City
                                    </label>

                                    <p className="fw-semibold">
                                        {user.city || "-"}
                                    </p>

                                </div>


                                {/* Address */}
                                <div className="col-12">

                                    <label className="text-muted small">
                                        Address
                                    </label>

                                    <p className="fw-semibold">
                                        {user.address || "-"}
                                    </p>

                                </div>

                            </div>


                            <hr className="my-4" />


                            {/* Account Information */}
                            <h6 className="fw-bold mb-3">
                                Account Information
                            </h6>

                            <div className="row g-3">

                                {/* Role */}
                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Role
                                    </label>

                                    <p>

                                        {user.roles && user.roles.length > 0 ? (
                                            user.roles.map((role, index) => (
                                                <span
                                                    key={index}
                                                    className="badge bg-primary me-1"
                                                >
                                                    {role}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-muted">
                                                -
                                            </span>
                                        )}

                                    </p>

                                </div>


                                {/* Role ID */}
                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Role ID
                                    </label>

                                    <p className="fw-semibold">
                                        {user.roleId || "-"}
                                    </p>

                                </div>


                                {/* Status */}
                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Status
                                    </label>

                                    <p>

                                        <span
                                            className={`badge ${
                                                user.isActive
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                            }`}
                                        >
                                            {user.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Footer */}
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


            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default ViewUserModal;