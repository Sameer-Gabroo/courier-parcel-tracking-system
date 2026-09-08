function ViewHubModal({ show, onClose, hub }) {
  if (!show || !hub) return null;

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
                Hub Details
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">

              <h6 className="fw-bold mb-3">
                Hub Information
              </h6>

              <div className="row">

                <div className="col-md-6 mb-3">
              <small className="text-muted">Hub Code</small>
              <div className="fw-semibold">
                {hub.hubCode}
              </div>
            </div>

                <div className="col-md-6 mb-3">
              <small className="text-muted">Hub Name</small>
              <div className="fw-semibold">
                {hub.hubName}
              </div>
            </div>

                <div className="col-md-6 mb-3">
            <small className="text-muted">City</small>
            <div className="fw-semibold">
              {hub.city}
            </div>
          </div>

                <div className="col-md-6 mb-3">
              <small className="text-muted">Contact Number</small>
              <div className="fw-semibold">
                {hub.phone || "N/A"}
              </div>
            </div>

                <div className="col-12 mb-3">
          <small className="text-muted">Address</small>
          <div className="fw-semibold">
            {hub.address || "N/A"}
          </div>
        </div>

        <div className="col-md-6 mb-3">
  <small className="text-muted">Status</small>
  <div className="fw-semibold">
    {hub.isActive ? "Active" : "Inactive"}
  </div>
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
                Close
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default ViewHubModal;