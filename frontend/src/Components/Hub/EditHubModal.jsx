import { useState, useEffect } from "react";

function EditHubModal({ show, onClose, hub, onUpdate }) {

  const [formData, setFormData] = useState({
    hubName: "",
    city: "",
    phone: "",
    address: "",
    isActive: true
  });

  // Load selected hub data into the form
  useEffect(() => {
    if (hub) {
      setFormData({
        hubName: hub.hubName || "",
        city: hub.city || "",
        phone: hub.phone || "",
        address: hub.address || "",
        isActive: hub.isActive
      });
    }
  }, [hub]);

  if (!show || !hub) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onUpdate(hub.hubId, formData);
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

            <div className="modal-header">
              <h5 className="modal-title">
                Edit Hub
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">

                {/* Hub Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Hub Name
                  </label>

                  <input
                    type="text"
                    name="hubName"
                    className="form-control"
                    value={formData.hubName}
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
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                {/* Contact Number */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Contact Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
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
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                  />
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
                onClick={handleSubmit}
              >
                Update Hub
              </button>

            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default EditHubModal;