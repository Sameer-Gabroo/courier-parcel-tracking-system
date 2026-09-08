import { useEffect, useState } from "react";

function AddParcelModal({ show, onSave, onClose, routes, customers }) {

    const initialFormData = {
        customerId: "",
        routeId: "",
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
        itemName: "",
        quantity: "",
        weightKg: "",
        description: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    const [errors, setErrors] = useState({});


    // Reset form every time the modal opens
    useEffect(() => {

        if (show) {
            setFormData(initialFormData);
            setErrors({});
        }

    }, [show]);


    if (!show) {
        return null;
    }


    // Handle input changes
    const change = (name, value) => {

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Remove error when user starts correcting the field
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };


    // Validation
    const validate = () => {

        const newErrors = {};


        // Receiver phone validation
        if (!formData.receiverPhone) {

            newErrors.receiverPhone =
                "Receiver phone is required.";

        } else if (!/^03\d{9}$/.test(formData.receiverPhone)) {

            newErrors.receiverPhone =
                "Phone number must be exactly 11 digits and start with 03.";

        }


        // Customer validation
        if (!formData.customerId) {

            newErrors.customerId =
                "Please select a customer.";

        }


        // Route validation
        if (!formData.routeId) {

            newErrors.routeId =
                "Please select a route.";

        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    // Save
    const handleSave = () => {

        if (!validate()) {
            return;
        }


        onSave({

            customerId: Number(formData.customerId),

            routeId: Number(formData.routeId),

            parcelRecipient: {
                receiverName: formData.receiverName,
                receiverPhone: formData.receiverPhone,
                receiverAddress: formData.receiverAddress
            },

            parcelDetails: [
                {
                    itemName: formData.itemName,
                    quantity: Number(formData.quantity),
                    weightKg: Number(formData.weightKg),
                    description: formData.description
                }
            ]

        });
    };


    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
            >

                <div className="modal-dialog modal-lg modal-dialog-centered">

                    <div className="modal-content">


                        {/* Modal Header */}

                        <div className="modal-header">

                            <h5 className="modal-title">
                                Add Parcel
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>

                        </div>


                        {/* Modal Body */}

                        <div className="modal-body">


                            {/* Parcel Information */}

                            <h6 className="fw-bold mb-3">
                                Parcel Information
                            </h6>


                            {/* Customer */}

                            <select
                                className={`form-select mb-1 ${
                                    errors.customerId
                                        ? "is-invalid"
                                        : ""
                                }`}
                                value={formData.customerId}
                                onChange={(e) =>
                                    change(
                                        "customerId",
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Select Customer
                                </option>

                                {customers.map((customer) => (

                                    <option
                                        key={customer.customerId}
                                        value={customer.customerId}
                                    >
                                        {customer.customerName}
                                    </option>

                                ))}

                            </select>


                            {errors.customerId && (
                                <div className="invalid-feedback d-block mb-3">
                                    {errors.customerId}
                                </div>
                            )}


                            {/* Route */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label">
                                    Route
                                </label>

                                <select
                                    className={`form-select ${
                                        errors.routeId
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    value={formData.routeId}
                                    onChange={(e) =>
                                        change(
                                            "routeId",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select Route
                                    </option>

                                    {routes.map((route) => (

                                        <option
                                            key={route.routeId}
                                            value={route.routeId}
                                        >
                                            {route.routeCode}
                                        </option>

                                    ))}

                                </select>


                                {errors.routeId && (
                                    <div className="invalid-feedback">
                                        {errors.routeId}
                                    </div>
                                )}

                            </div>


                            {/* Recipient Information */}

                            <h6 className="fw-bold mb-3">
                                Recipient Information
                            </h6>


                            <div className="row g-3 mb-4">


                                {/* Receiver Name */}

                                <div className="col-md-6">

                                    <input
                                        className="form-control"
                                        placeholder="Receiver name"
                                        value={formData.receiverName}
                                        onChange={(e) =>
                                            change(
                                                "receiverName",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* Receiver Phone */}

                                <div className="col-md-6">

                                    <input
                                        type="tel"
                                        className={`form-control ${
                                            errors.receiverPhone
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Receiver phone (03XXXXXXXXX)"
                                        value={formData.receiverPhone}
                                        maxLength={11}
                                        inputMode="numeric"
                                        onChange={(e) => {

                                            // Only allow numbers
                                            const value =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                );

                                            change(
                                                "receiverPhone",
                                                value
                                            );

                                        }}
                                    />

                                    {errors.receiverPhone && (
                                        <div className="invalid-feedback">
                                            {errors.receiverPhone}
                                        </div>
                                    )}

                                </div>


                                {/* Receiver Address */}

                                <div className="col-12">

                                    <input
                                        className="form-control"
                                        placeholder="Receiver address"
                                        value={formData.receiverAddress}
                                        onChange={(e) =>
                                            change(
                                                "receiverAddress",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>


                            {/* Parcel Details */}

                            <h6 className="fw-bold mb-3">
                                Parcel Details
                            </h6>


                            <div className="row g-3">


                                {/* Item Name */}

                                <div className="col-md-6">

                                    <input
                                        className="form-control"
                                        placeholder="Item name"
                                        value={formData.itemName}
                                        onChange={(e) =>
                                            change(
                                                "itemName",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* Quantity */}

                                <div className="col-md-3">

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Quantity"
                                        value={formData.quantity}
                                        onChange={(e) =>
                                            change(
                                                "quantity",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* Weight */}

                                <div className="col-md-3">

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Weight (Kg)"
                                        value={formData.weightKg}
                                        onChange={(e) =>
                                            change(
                                                "weightKg",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* Description */}

                                <div className="col-12">

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            change(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    ></textarea>

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
                                onClick={handleSave}
                            >
                                Save Parcel
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* Background */}

            <div className="modal-backdrop fade show"></div>

        </>
    );
}

export default AddParcelModal;