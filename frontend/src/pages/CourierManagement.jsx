import { useEffect, useState } from "react";
import CourierService from "../Services/CourierService";
import ViewCourierModal from "../Components/Courier/ViewCourierModal";
import EditCourierModal from "../Components/Courier/EditCourierModal";
import { Eye, Pencil } from "lucide-react";

function CourierManagement() {

    const [couriers, setCouriers] = useState([]);
    const [selectedCourier, setSelectedCourier] = useState(null);

    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [formData, setFormData] = useState({
        courierCode: "",
        courierName: "",
        email: "",
        city: "",
        phone: "",
        emergencyContact: "",
        emergencyPhone: "",
        address: "",
        isActive: true
    });


    const getCouriers = async () => {

        try {

            const data = await CourierService.getCouriers();

            setCouriers(data);

        } catch (error) {

            console.error("Error fetching couriers:", error);

        }

    };


    useEffect(() => {

        getCouriers();

    }, []);


    const handleEditCourier = (courier) => {

        setSelectedCourier(courier);

        setFormData({
            courierCode: courier.courierCode || "",
            courierName: courier.courierName || "",
            email: courier.email || "",
            city: courier.city || "",
            phone: courier.phone || "",
            emergencyContact: courier.emergencyContact || "",
            emergencyPhone: courier.emergencyPhone || "",
            address: courier.address || "",
            isActive: courier.isActive
        });

        setShowEditModal(true);

    };


    const change = (name, value) => {

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const updateCourier = async () => {

    try {

        console.log("Courier data to update:", formData);

        await CourierService.updateCourier(
            selectedCourier.courierId,
            formData
        );

        setShowEditModal(false);
        setSelectedCourier(null);

        await getCouriers();

    } catch (error) {

        console.error("Error updating courier:", error);

    }

};


    return (

        <div>

            {/* Page Header */}

            <div className="mb-4">

                <h2>Courier Management</h2>

                <p className="text-muted">
                    Couriers are created through Admin User Management.
                </p>

            </div>


            {/* Courier Table */}

            <div className="card">

                <div className="card-body">

                    <table className="table align-middle">

                        <thead>

                            <tr>

                                <th>Code</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>

                            </tr>

                        </thead>


                        <tbody>

                            {couriers.map((courier) => (

                                <tr key={courier.courierId}>

                                    <td>
                                        {courier.courierCode}
                                    </td>

                                    <td>
                                        {courier.courierName}
                                    </td>

                                    <td>
                                        {courier.email}
                                    </td>

                                    <td>
                                        {courier.city}
                                    </td>

                                    <td>
                                        {courier.phone}
                                    </td>

                                    <td>
                                        {courier.isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </td>

                                    <td>

    <div className="parcel-actions">

        {/* View */}
        <button
            type="button"
            className="parcel-icon-btn"
            onClick={() => {

                setSelectedCourier(courier);
                setShowViewModal(true);

            }}
            title="View courier"
            aria-label="View courier"
        >
            <Eye size={17} strokeWidth={1.8} />
        </button>


        {/* Edit */}
        <button
            type="button"
            className="parcel-icon-btn"
            onClick={() =>
                handleEditCourier(courier)
            }
            title="Edit courier"
            aria-label="Edit courier"
        >
            <Pencil size={17} strokeWidth={1.8} />
        </button>

    </div>

</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* View Courier Modal */}

            <ViewCourierModal
                show={showViewModal}
                courier={selectedCourier}
                onClose={() => {

                    setShowViewModal(false);
                    setSelectedCourier(null);

                }}
            />


            {/* Edit Courier Modal */}

            <EditCourierModal
                show={showEditModal}
                courier={selectedCourier}
                formData={formData}
                change={change}
                onSave={updateCourier}
                onClose={() => {

                    setShowEditModal(false);
                    setSelectedCourier(null);

                }}
            />

        </div>

    );

}

export default CourierManagement;