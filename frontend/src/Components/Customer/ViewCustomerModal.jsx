function ViewCustomerModal({ show, onClose, customer }) {

  if (!show || !customer) return null;

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
              <h5 className="modal-title">Customer Details</h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">

              <h6 className="fw-bold mb-3">
                Customer Information
              </h6>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <small className="text-muted">Full Name</small>
                  <div className="fw-semibold">
                  {customer.customerName}
                </div>
                </div>

                <div className="col-md-6 mb-3">
                  <small className="text-muted">Email</small>
                  <div className="fw-semibold">
                      {customer.email}
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <small className="text-muted">Phone Number</small>
                  <div className="fw-semibold">
                     {customer.phone}
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <small className="text-muted">City</small>
                  <div className="fw-semibold">
                    {customer.city}
                  </div>
                </div>

                


                <div className="col-md-6 mb-3">
                <small className="text-muted">Customer Code</small>
                <div className="fw-semibold">
                  {customer.customerCode}
                </div>
              </div>

              <div className="col-md-6 mb-3">
            <small className="text-muted">Postal Code</small>
            <div className="fw-semibold">
              {customer.postalCode}
            </div>
          </div>

          

          <div className="col-md-6 mb-3">
        <small className="text-muted">Status</small>
        <div className="fw-semibold">
          {customer.isActive ? "Active" : "Inactive"}
        </div>
      </div>

      <div className="col-6 mb-3">
                  <small className="text-muted">Address</small>
                  <div className="fw-semibold">
                     {customer.address}
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

export default ViewCustomerModal;