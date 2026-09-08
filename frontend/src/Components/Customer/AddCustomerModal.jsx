import { useEffect, useState } from "react";

function AddCustomerModal({ show, onClose, onSave }) {

    const initialFormData = {
        customerName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        isActive: true
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});


    // Reset form every time modal opens
    useEffect(() => {
        if (show) {
            setFormData(initialFormData);
            setErrors({});
        }
    }, [show]);


    if (!show) return null;


    // Handle input changes
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Remove error when user starts correcting field
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };


    // Validation
    const validateForm = () => {

        const newErrors = {};


        // Customer Name
        if (!formData.customerName.trim()) {

            newErrors.customerName =
                "Customer name is required.";

        } else if (!/^[A-Za-z\s]+$/.test(formData.customerName)) {

            newErrors.customerName =
                "Customer name can contain letters and spaces only.";
        }


        // Email
        if (!formData.email.trim()) {

            newErrors.email =
                "Email is required.";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {

            newErrors.email =
                "Please enter a valid email address.";
        }


        // Phone
        if (!formData.phone.trim()) {

            newErrors.phone =
                "Phone number is required.";

        } else if (!/^03\d{9}$/.test(formData.phone)) {

            newErrors.phone =
                "Phone number must start with 03 and contain exactly 11 digits.";
        }


        // City
        if (!formData.city.trim()) {

            newErrors.city =
                "City is required.";

        } else if (!/^[A-Za-z\s]+$/.test(formData.city)) {

            newErrors.city =
                "City can contain letters and spaces only.";
        }


        // Postal Code
        if (!formData.postalCode.trim()) {

            newErrors.postalCode =
                "Postal code is required.";

        } else if (!/^\d+$/.test(formData.postalCode)) {

            newErrors.postalCode =
                "Postal code must contain numbers only.";
        }


        // Address
        if (!formData.address.trim()) {

            newErrors.address =
                "Address is required.";
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    // Save
    const handleSave = () => {

        if (!validateForm()) {
            return;
        }

        onSave(formData);
    };


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
                                Add Customer
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>

                        </div>


                        {/* Body */}
                        <div className="modal-body">

                            <div className="row">

                                {/* Customer Name */}
                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="customerName"
                                        className={`form-control ${
                                            errors.customerName
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Enter full name"
                                        value={formData.customerName}
                                        onChange={handleChange}
                                    />

                                    {errors.customerName && (
                                        <div className="invalid-feedback">
                                            {errors.customerName}
                                        </div>
                                    )}

                                </div>


                                {/* Email */}
                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${
                                            errors.email
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}

                                </div>


                                {/* Phone */}
                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        className={`form-control ${
                                            errors.phone
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="03XXXXXXXXX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        maxLength={11}
                                    />

                                    {errors.phone && (
                                        <div className="invalid-feedback">
                                            {errors.phone}
                                        </div>
                                    )}

                                </div>


                                {/* City */}
                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        className={`form-control ${
                                            errors.city
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Enter city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />

                                    {errors.city && (
                                        <div className="invalid-feedback">
                                            {errors.city}
                                        </div>
                                    )}

                                </div>


                                {/* Postal Code */}
                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Postal Code
                                    </label>

                                    <input
                                        type="text"
                                        name="postalCode"
                                        className={`form-control ${
                                            errors.postalCode
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Enter postal code"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                    />

                                    {errors.postalCode && (
                                        <div className="invalid-feedback">
                                            {errors.postalCode}
                                        </div>
                                    )}

                                </div>


                                {/* Address */}
                                <div className="col-12 mb-3">

                                    <label className="form-label">
                                        Address
                                    </label>

                                    <textarea
                                        name="address"
                                        className={`form-control ${
                                            errors.address
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        rows="3"
                                        placeholder="Enter customer address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />

                                    {errors.address && (
                                        <div className="invalid-feedback">
                                            {errors.address}
                                        </div>
                                    )}

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
                                onClick={handleSave}
                            >
                                Save Customer
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

export default AddCustomerModal;