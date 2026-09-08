import { useState } from "react";
function AddRouteModal({ show, onClose, onSave, hubs }) {

 const [formData, setFormData] = useState({
        routeCode: "",
        originHubId: "",
        destinationHubId: "",
        distanceKm: "",
        estimatedHours: "",
        isActive: true
    });

    const handleSubmit = () => {
   onSave({
    routeCode: formData.routeCode,
    originHubId: Number(formData.originHubId),
    destinationHubId: Number(formData.destinationHubId),
    distanceKm: Number(formData.distanceKm),
    estimatedHours: Number(formData.estimatedHours),
    isActive: formData.isActive
});
};

    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]: value
    });
};


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
                                Add Route
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

                                {/* Route Name */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Route Name
                                    </label>

                                    <input
                                        type="text"
                                        name="routeCode"
                                        className="form-control"
                                        placeholder="Enter route code"
                                        value={formData.routeCode}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Distance */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Distance (KM)
                                    </label>

                                    <input
                                    type="number"
                                    name="distanceKm"
                                    className="form-control"
                                    placeholder="Enter distance"
                                    value={formData.distanceKm}
                                    onChange={handleChange}
                                />
                                </div>

                                {/* Origin Hub */}
                                <select
                                    className="form-select"
                                    name="originHubId"
                                    value={formData.originHubId}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select origin hub
                                    </option>

                                    {hubs.map((hub) => (
                                        <option
                                            key={hub.hubId}
                                            value={hub.hubId}
                                        >
                                            {hub.hubName}
                                        </option>
                                    ))}
                                </select>

                                {/* Destination Hub */}
                                <select
                                className="form-select"
                                name="destinationHubId"
                                value={formData.destinationHubId}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select destination hub
                                </option>

                                {hubs.map((hub) => (
                                    <option
                                        key={hub.hubId}
                                        value={hub.hubId}
                                    >
                                        {hub.hubName}
                                    </option>
                                ))}
                            </select>


                            <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Estimated Hours
                            </label>

                            <input
                                type="number"
                                name="estimatedHours"
                                className="form-control"
                                placeholder="Enter estimated hours"
                                value={formData.estimatedHours}
                                onChange={handleChange}
                            />
                        </div>

                                {/* Status */}
                               <select
                                name="isActive"
                                className="form-select"
                                value={formData.isActive}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        isActive: e.target.value === "true"
                                    })
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
                            onClick={handleSubmit}
                        >
                            Save Route
                        </button>

                        </div>

                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default AddRouteModal;