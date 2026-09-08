import { useState } from "react";

function AddCourierModal({ show, onSave, onClose }) {

    const [formData, setFormData] = useState({
    courierName: "",
    email: "",
    city: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    address: "",
    isActive: true
});

          

            const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({...formData,[name]: value});
        };

        const handleSave = () => {
            onSave(formData);
        };

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
                                Add Courier
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


                            {/* Basic Information */}

                            <h6 className="fw-bold mb-3">
                                Courier Information
                            </h6>


                            <div className="row g-3">

                              {/* Courier Name */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Courier Name
                                    </label>


                                    <input
                                    type="text"
                                    name="courierName"
                                    className="form-control"
                                    placeholder="Enter courier name"
                                    value={formData.courierName}
                                    onChange={handleChange}
                                />

                                </div>



                                {/* Email */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Email
                                    </label>


                                    <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                </div>



                                {/* City */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        City
                                    </label>


                                    <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    placeholder="Enter City"
                                    value={formData.city}
                                    onChange={handleChange}
                                />

                                </div>


                            </div>



                            <hr className="my-4" />



                            {/* Contact Information */}

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
                                    name="phone"
                                    className="form-control"
                                    placeholder="Enter Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                                </div>



                                {/* Emergency Contact */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Emergency Contact
                                    </label>


                                      <input
                                    type="text"
                                    name="emergencyContact"
                                    className="form-control"
                                    placeholder="Enter Emergency Contact"
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                />

                                </div>



                                {/* Emergency Phone */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Emergency Phone
                                    </label>


                                    <input
                                    type="text"
                                    name="emergencyPhone"
                                    className="form-control"
                                    placeholder="Enter Emergency Phone"
                                    value={formData.emergencyPhone}
                                    onChange={handleChange}
                                />

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



                                {/* Address */}

                                <div className="col-12">

                                    <label className="form-label">
                                        Address
                                    </label>


                                    <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    placeholder="Enter  Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />

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
                                onClick={() => onSave(formData)}
                            >
                                Save Courier
                            </button>


                        </div>


                    </div>

                </div>

            </div>


            <div className="modal-backdrop fade show"></div>

        </>

    );

}


export default AddCourierModal;