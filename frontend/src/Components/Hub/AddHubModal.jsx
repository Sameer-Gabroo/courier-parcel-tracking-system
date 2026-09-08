import { useState } from "react";
function AddHubModal({ show, onClose, onSave }) {


  const [formData, setFormData] = useState({
  hubName: "",
  city: "",
  address: "",
  phone: "",
  isActive: true
});

  if (!show) return null;

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
                Add Hub
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

                {/* Hub Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Hub Name
                  </label>

                  <input
                type="text"
                className="form-control"
                placeholder="Enter hub name"
                value={formData.hubName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hubName: e.target.value
                  })
                }
              />
                </div>

                {/* City */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    City
                  </label>

                  <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city: e.target.value
                    })
                  }
                />
                </div>

                {/* Contact Number */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Contact Number
                  </label>

                  <input
                  type="text"
                  className="form-control"
                  placeholder="Enter contact number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value
                    })
                  }
                />
                </div>

                {/* Address */}
                <div className="col-12 mb-3">
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                className="form-control"
                rows="3"
                placeholder="Enter hub address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value
                  })
                }
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
                Save Hub
              </button>

            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default AddHubModal;