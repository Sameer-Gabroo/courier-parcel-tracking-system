function EditCourierModal({
    show,
    courier,
    formData,
    change,
    onClose,
    onSave
}) {

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
                                Edit Courier
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            >
                            </button>

                        </div>


                        <div className="modal-body">

                            <h6 className="fw-bold mb-3">
                                Update Courier Information
                            </h6>


                            <div className="row g-3">

                                {/* Courier Code */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Courier Code
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.courierCode}
                                        onChange={(e) =>
                                            change(
                                                "courierCode",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* Courier Name */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Courier Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.courierName}
                                        onChange={(e) =>
                                            change(
                                                "courierName",
                                                e.target.value
                                            )
                                        }
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
                                        value={formData.email}
                                        onChange={(e) =>
                                            change(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* City */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.city}
                                        onChange={(e) =>
                                            change(
                                                "city",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>


                            <hr className="my-4" />


                            <h6 className="fw-bold mb-3">
                                Contact Information
                            </h6>


                            <div className="row g-3">

                                {/* Phone */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            change(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* Emergency Contact */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Emergency Contact
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.emergencyContact}
                                        onChange={(e) =>
                                            change(
                                                "emergencyContact",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* Emergency Phone */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Emergency Phone
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.emergencyPhone}
                                        onChange={(e) =>
                                            change(
                                                "emergencyPhone",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* Status */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        value={formData.isActive.toString()}
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


                                {/* Address */}

                                <div className="col-12">

                                    <label className="form-label">
                                        Address
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={formData.address}
                                        onChange={(e) =>
                                            change(
                                                "address",
                                                e.target.value
                                            )
                                        }
                                    >
                                    </textarea>

                                </div>

                            </div>

                        </div>


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
                                Update Courier
                            </button>

                        </div>

                    </div>

                </div>
            </div>


            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default EditCourierModal;