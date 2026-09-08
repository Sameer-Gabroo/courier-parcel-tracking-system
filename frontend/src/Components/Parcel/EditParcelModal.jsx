import { useEffect, useState } from "react";

function EditParcelModal({ show, onClose,routes ,customers, onSave, parcel }) {
    const [formData, setFormData] = useState({
        customerId: "",
        routeId: "",
    parcelDetailId: "",
    itemName: "",
    quantity: "",
    weightKg: "",
    description: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: ""
    });

    useEffect(() => {
        if (parcel) {
console.log("EDIT PARCEL:", parcel);
console.log("EDIT PARCEL ROUTE ID:", parcel?.routeId);

            const detail = parcel.parcelDetails?.[0];
           const recipient = parcel.parcelRecipient;

            setFormData({
                routeId: parcel.routeId ?? "",
                customerId: parcel.customerId ?? "",
                parcelDetailId: detail?.parcelDetailId ?? "",
                itemName: detail?.itemName ?? "",
                quantity: detail?.quantity ?? "",
                weightKg: detail?.weightKg ?? "",
                description: detail?.description ?? "",
                receiverName: recipient?.receiverName ??"",
                receiverPhone: recipient?.receiverPhone ??"",
                receiverAddress: recipient?.receiverAddress ??""
            });
        }
    }, [parcel]);

    if (!show || !parcel) {
        return null;
    }

    const change = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const save = () => {
        onSave(
            parcel.parcelId,
            {
                customerId: Number(formData.customerId),
                routeId:Number(formData.routeId),
                parcelDetail: {
                    parcelDetailId: Number(formData.parcelDetailId),
                    itemName: formData.itemName,
                    description: formData.description,
                    quantity: Number(formData.quantity),
                    weightKg: Number(formData.weightKg)
                },
                  parcelRecipient: {
                receiverName: formData.receiverName,
                receiverPhone: formData.receiverPhone,
                receiverAddress: formData.receiverAddress
            }
            }
        );
    };

    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Edit Parcel</h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body">

                            <p className="text-muted small">
                                Courier, route, delivery dates, and status are managed
                                through dispatch and courier workflows.
                            </p>

                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label">
                                        Customer
                                    </label>

                                    <select
                                        className="form-select"
                                        value={formData.customerId}
                                        onChange={(e) =>
                                            change("customerId", e.target.value)
                                        }
                                    >
                                        {customers.map((customer) => (
                                            <option
                                                key={customer.customerId}
                                                value={customer.customerId}
                                            >
                                                {customer.customerName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">
                                        Routes
                                    </label>

                                    <select
                                        className="form-select"
                                        value={formData.routeId}
                                        onChange={(e) =>
                                            change("routeId", e.target.value)
                                        }
                                    >
                                        {routes.map((route) => (
                                            <option
                                                key={route.routeId}
                                                value={route.routeId}
                                            >
                                                {route.routeCode}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">
                                        Reciver Name
                                    </label>

                                    <input
                                    type="text"
                                        className="form-control"
                                        value={formData.receiverName}
                                        onChange={(e) =>
                                            change("receiverName", e.target.value)
                                        }
                                    />
                                </div>

                                    <div className="col-md-6">
                                    <label className="form-label">
                                        Reciver Phone
                                    </label>

                                    <input
                                    type="text"
                                        className="form-control"
                                        value={formData.receiverPhone}
                                        onChange={(e) =>
                                            change("receiverPhone", e.target.value)
                                        }
                                    />
                                </div>

                                  <div className="col-md-6">
                                    <label className="form-label">
                                        Reciver Address
                                    </label>

                                    <input
                                    type="text"
                                        className="form-control"
                                        value={formData.receiverAddress}
                                        onChange={(e) =>
                                            change("receiverAddress", e.target.value)
                                        }
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">
                                        Item Name
                                    </label>

                                    <input
                                        className="form-control"
                                        value={formData.itemName}
                                        onChange={(e) =>
                                            change("itemName", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        className="form-control"
                                        value={formData.quantity}
                                        onChange={(e) =>
                                            change("quantity", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">
                                        Weight (Kg)
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="form-control"
                                        value={formData.weightKg}
                                        onChange={(e) =>
                                            change("weightKg", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={formData.description}
                                        onChange={(e) =>
                                            change("description", e.target.value)
                                        }
                                    ></textarea>
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
                                onClick={save}
                            >
                                Update Parcel
                            </button>

                        </div>

                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default EditParcelModal;