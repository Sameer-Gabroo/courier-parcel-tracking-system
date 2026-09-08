function EditUserModal({
    show,
    onSave,
    onClose,
    formData,
    change
}) {
    if (!show) {
        return null;
    }

    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog modal-md modal-dialog-centered">

                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header">

                            <h5 className="modal-title">
                                Edit User
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />

                        </div>


                        {/* Body */}
                        <div className="modal-body">

                            <h6 className="fw-bold mb-3">
                                Update User Account
                            </h6>

                            <p className="text-muted small mb-4">
                                You can change the password, role,
                                and account status.
                            </p>


                            <div className="row g-3">

                                {/* Password */}
                                <div className="col-12">

                                    <label className="form-label">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter new password"
                                        value={formData.password || ""}
                                        onChange={(e) =>
                                            change(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <div className="form-text">
                                        Leave blank to keep the current
                                        password.
                                    </div>

                                </div>


                                {/* Role */}
                                <div className="col-12">

                                    <label className="form-label">
                                        Role
                                    </label>

                                    <select
                                        className="form-select"
                                        value={formData.roleId || ""}
                                        onChange={(e) =>
                                            change(
                                                "roleId",
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Role
                                        </option>

                                        <option value="1">
                                            Admin
                                        </option>

                                        <option value="2">
                                            Booking Agent
                                        </option>

                                        <option value="3">
                                            Dispatcher
                                        </option>

                                        <option value="4">
                                            Courier
                                        </option>

                                        <option value="5">
                                            Customer Viewer
                                        </option>

                                    </select>

                                </div>


                                {/* Status */}
                                <div className="col-12">

                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        value={
                                            formData.isActive
                                                ? "true"
                                                : "false"
                                        }
                                        onChange={(e) =>
                                            change(
                                                "isActive",
                                                e.target.value === "true"
                                            )
                                        }
                                    >

                                        <option value="true">
                                            Active
                                        </option>

                                        <option value="false">
                                            Inactive
                                        </option>

                                    </select>

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
                                Cancel
                            </button>

                            <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onSave}
                        >
                            Update User
                        </button>

                        </div>

                    </div>

                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default EditUserModal;