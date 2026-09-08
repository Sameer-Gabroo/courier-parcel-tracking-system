import { useState, useEffect } from "react";
import RouteService from "../Services/RouteService";
import AddRouteModal from "../Components/Routes/AddRouteModal";
import ViewRouteModal from "../Components/Routes/ViewRouteModal";
import EditRouteModal from "../Components/Routes/EditRouteModal";
import { Eye, Pencil, Trash2 } from "lucide-react";

import HubService from "../Services/HubService";

function RoutesManagement() {

    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [hubs, setHubs] = useState([]);
    const [search, setSearch] = useState("");
    const [routes, setRoutes] = useState([]);


const loadHubs = async () => {
    try {
        const data = await HubService.getHubs();

        setHubs(data);
    } catch (error) {
        console.error("Error loading hubs:", error);
    }
};

const handleDeleteRoute = async (routeId) => {
    try {
        await RouteService.deleteRoute(routeId);

        loadRoutes();

    } catch (error) {
        console.error(
            "Error deleting route:",
            error.response?.data
        );
    }
};


const handleUpdateRoute = async (routeData) => {
    try {
        await RouteService.updateRoute(
            selectedRoute.routeId,
            routeData
        );

        setShowEditModal(false);

        loadRoutes();

    } catch (error) {
        console.error(
            "Error updating route:",
            error.response?.data
        );
    }
};


    const loadRoutes = async () => {
    try {
        const data = await RouteService.getRoutes(search);

        setRoutes(data);
    } catch (error) {
        console.error("Error loading routes:", error);
    }
};

const handleAddRoute = async (routeData) => {
    try {
        await RouteService.addRoute(routeData);

        setShowModal(false);

        loadRoutes();

    } catch (error) {
    console.error("Error adding route:", error.response?.data);
    console.log("Validation errors:", error.response?.data?.errors);
}
};

useEffect(() => {
     loadRoutes();
    loadHubs();
}, [search]);

    return (
        <div>

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2>Route Management</h2>

                    <p className="text-muted">
                        Manage courier routes and delivery connections.
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    + Add Route
                </button>

            </div>


            {/* Search Section */}
            <div className="card mb-4">
                <div className="card-body">

                    <label className="form-label">
                        Search Routes
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by route code, origin or destination"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>
            </div>


            {/* Route List */}
            <div className="card">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h5 className="mb-0">
                            Route List
                        </h5>

                        <span className="text-muted">
                            {routes.length} routes
                        </span>

                    </div>


                    <div className="table-responsive">

                        <table className="table align-middle">

                            <thead>
                                <tr>
                                    <th>Route Name</th>
                                    <th>Origin Hub</th>
                                    <th>Destination Hub</th>
                                    <th>Distance</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
    {routes.map((route) => (
        <tr key={route.routeId}>
            <td>{route.routeCode}</td>

            <td>{route.originHubName}</td>

            <td>{route.destinationHubName}</td>

            <td>{route.distanceKm} km</td>

            <td>
                <span
                    className={`badge ${
                        route.isActive
                            ? "bg-success"
                            : "bg-secondary"
                    }`}
                >
                    {route.isActive ? "Active" : "Inactive"}
                </span>
            </td>

            <td>
              <div className="parcel-actions">

    {/* View */}
    <button
        type="button"
        className="parcel-icon-btn"
        onClick={() => {
            setSelectedRoute(route);
            setShowViewModal(true);
        }}
        title="View route"
        aria-label="View route"
    >
        <Eye size={17} strokeWidth={1.8} />
    </button>


    {/* Edit */}
    <button
        type="button"
        className="parcel-icon-btn"
        onClick={() => {
            setSelectedRoute(route);
            setShowEditModal(true);
        }}
        title="Edit route"
        aria-label="Edit route"
    >
        <Pencil size={17} strokeWidth={1.8} />
    </button>


    {/* Delete */}
    <button
        type="button"
        className="parcel-icon-btn delete"
        onClick={() => handleDeleteRoute(route.routeId)}
        title="Delete route"
        aria-label="Delete route"
    >
        <Trash2 size={17} strokeWidth={1.8} />
    </button>

</div>
            </td>
        </tr>
    ))}
</tbody>
                        </table>

                    </div>

                </div>
            </div>


            {/* Modals */}

          <AddRouteModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleAddRoute}
            hubs={hubs}
        />

            <ViewRouteModal
                show={showViewModal}
                onClose={() => setShowViewModal(false)}
                route={selectedRoute}
            />

          <EditRouteModal
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSave={handleUpdateRoute}
            route={selectedRoute}
            hubs={hubs}
        />

        </div>
    );
}

export default RoutesManagement;