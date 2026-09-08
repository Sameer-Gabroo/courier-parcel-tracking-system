import { useEffect, useState } from "react";

function EditCustomerModal({ show, onClose, onSave, customer }) {

  const initialFormData = {
    customerName: "",
    email: "",
    isActive: true,
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  };

  const [formData, setFormData] = useState(initialFormData);


  // Load customer data when modal opens
  // Reset form when modal closes or customer changes
  useEffect(() => {

    if (show && customer) {

      setFormData({
        customerName: customer.customerName ?? "",
        email: customer.email ?? "",
        isActive: customer.isActive ?? true,
        phone: customer.phone ?? "",
        address: customer.address ?? "",
        city: customer.city ?? "",
        postalCode: customer.postalCode ?? ""
      });

    } else if (!show) {

      // Clear form when modal closes
      setFormData(initialFormData);
    }

  }, [show, customer]);


  if (!show) return null;


  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
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

            {/* Modal Header */}
            <div className="modal-header">

              <h5 className="modal-title">
                Edit Customer
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>

            </div>


            {/* Modal Body */}
            <div className="modal-body">

              <div className="row">

                {/* Full Name */}
                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="customerName"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={formData.customerName}
                    onChange={handleChange}
                  />

                </div>


                {/* Email */}
                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>


                {/* Customer Code - READ ONLY */}
                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Customer Code
                  </label>

                  <input
                    type="text"
                    className="form-control bg-light"
                    value={customer?.customerCode ?? ""}
                    readOnly
                    disabled
                  />

                  <small className="text-muted">
                    Customer code is generated automatically.
                  </small>

                </div>


                {/* Phone Number */}
                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Phone Number
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


                {/* City */}
                <div className="col-md-6 mb-3">

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


                {/* Postal Code */}
                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    className="form-control"
                    placeholder="Enter postal code"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />

                </div>


                {/* Address */}
                <div className="col-12 mb-3">

                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    name="address"
                    className="form-control"
                    placeholder="Enter Address"
                    rows="3"
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
                onClick={() =>
                  onSave(customer.customerId, formData)
                }
              >
                Update Customer
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

export default EditCustomerModal;