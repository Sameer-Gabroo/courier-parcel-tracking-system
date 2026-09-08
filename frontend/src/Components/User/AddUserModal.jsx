function AddUserModal({ show, onSave, onClose }) {

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

                <div className="modal-dialog modal-lg modal-dialog-centered">

                    <div className="modal-content">


                        {/* Modal Header */}

                        <div className="modal-header">

                            <h5 className="modal-title">
                                Add User
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            >
                            </button>

                        </div>


                        {/* Modal Body */}

                        <div className="modal-body">

                            <h6 className="fw-bold mb-3">
                                User Information
                            </h6>


                            <div className="row g-3">


                                {/* Full Name */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter full name"
                                    />

                                </div>


                                {/* Email */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email address"
                                    />

                                </div>


                                {/* Password */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                    />

                                </div>


                                {/* Confirm Password */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm password"
                                    />

                                </div>


                                {/* Role */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Role
                                    </label>

                                    <select className="form-select">

                                        <option value="">
                                            Select Role
                                        </option>

                                        <option value="Admin">
                                            Admin
                                        </option>

                                        <option value="Booking Agent">
                                            Booking Agent
                                        </option>

                                        <option value="Dispatcher">
                                            Dispatcher
                                        </option>

                                        <option value="Courier">
                                            Courier
                                        </option>

                                        <option value="Customer Viewer">
                                            Customer Viewer
                                        </option>

                                    </select>

                                </div>


                                {/* Status */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select className="form-select">

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


                        {/* Modal Footer */}

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
                                Save User
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            <div className="modal-backdrop fade show"></div>

        </>

    );

}


export default AddUserModal;