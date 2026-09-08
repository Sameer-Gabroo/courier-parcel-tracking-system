import { useState, useEffect } from "react";

function EditRouteModal({ show, onClose, onSave, route, hubs }) {

    const [formData, setFormData] = useState({
        routeCode: "",
        originHubId: "",
        destinationHubId: "",
        distanceKm: "",
        estimatedHours: "",
        isActive: true
    });

    useEffect(() => {
        if (route) {
            setFormData({
                routeCode: route.routeCode || "",
                originHubId: route.originHubId || "",
                destinationHubId: route.destinationHubId || "",
                distanceKm: route.distanceKm || "",
                estimatedHours: route.estimatedHours || "",
                isActive: route.isActive
            });
        }
    }, [route]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

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

    if (!show || !route) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Edit Route</h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="row">

                                {/* Route Code */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Route Code
                                    </label>

                                    <input
                                        type="text"
                                        name="routeCode"
                                        className="form-control"
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
                                        value={formData.distanceKm}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Origin Hub */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Origin Hub
                                    </label>

                                    <select
                                        name="originHubId"
                                        className="form-select"
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
                                </div>

                                {/* Destination Hub */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Destination Hub
                                    </label>

                                    <select
                                        name="destinationHubId"
                                        className="form-select"
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
                                </div>

                                {/* Estimated Hours */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Estimated Hours
                                    </label>

                                    <input
                                        type="number"
                                        name="estimatedHours"
                                        className="form-control"
                                        value={formData.estimatedHours}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Status */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        value={formData.isActive}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                isActive:
                                                    e.target.value === "true"
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
                                Update Route
                            </button>

                        </div>

                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default EditRouteModal;