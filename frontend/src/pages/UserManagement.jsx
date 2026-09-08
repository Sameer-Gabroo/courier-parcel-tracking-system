import { useEffect, useState } from "react";
import UserService from "../Services/UserService";
import EditUserModal from "../Components/User/EditUserModal";
import ViewUserModal from "../Components/User/ViewUserModal";

function UserManagement() {
    const [users, setUsers] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        roleId: "",
        isActive: true,
        emergencyContact: "",
        emergencyPhone: ""
    });

    const getUsers = async () => {
        try {
            setUsers(await UserService.getUsers());
        } catch (error) {
            console.error("Error getting users:", error);
        }
    };

    // Open Edit Modal
    const handleEditUser = (user) => {
        setSelectedUser(user);

        setFormData({
            password: "",
            roleId: user.roleId || "",
            isActive: user.isActive
        });

        setShowEditModal(true);
    };

    // Update User
    const updateUser = async () => {
        try {
            await UserService.updateUser(selectedUser.userId, {
                password: formData.password || null,
                roleId: formData.roleId
                    ? Number(formData.roleId)
                    : null,
                isActive: formData.isActive
            });

            setShowEditModal(false);
            setSelectedUser(null);

            await getUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // Handle form changes
    const change = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Save User
    const saveUser = async () => {
        try {
            await UserService.addUser({
                ...formData,
                roleId: Number(formData.roleId)
            });

            setShowForm(false);

            await getUsers();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    // Open View Modal
    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    // Close View Modal
    const closeViewModal = () => {
        setShowViewModal(false);
        setSelectedUser(null);
    };

    return (
        <div>

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2>
                        User Management
                    </h2>

                    <p className="text-muted">
                        Create normal users and courier users.
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    + Add User
                </button>

            </div>


            {/* User Table */}
            <div className="card">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Roles</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {users.map((user) => (

                                    <tr key={user.userId}>

                                        <td>
                                            {user.firstName} {user.lastName}
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            {user.roles?.join(", ")}
                                        </td>

                                        <td>
                                            {user.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() =>
                                                    handleViewUser(user)
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-warning me-2"
                                                onClick={() =>
                                                    handleEditUser(user)
                                                }
                                            >
                                                Edit
                                            </button>

                                            {/* Delete button - currently disabled */}

                                            {/*
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    handleDeleteUser(user)
                                                }
                                            >
                                                Delete
                                            </button>
                                            */}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* Add User Modal */}
            {showForm && (

                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                >

                    <div className="modal-dialog modal-lg">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    Add User
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowForm(false)}
                                >
                                </button>

                            </div>


                            <div className="modal-body">

                                <div className="row g-3">

                                    {[
                                        ["userName", "User Name"],
                                        ["email", "Email"],
                                        ["password", "Password"],
                                        ["firstName", "First Name"],
                                        ["lastName", "Last Name"],
                                        ["phone", "Phone"],
                                        ["city", "City"],
                                        ["roleId", "Role ID"],
                                        ["emergencyContact", "Emergency Contact"],
                                        ["emergencyPhone", "Emergency Phone"]
                                    ].map(([name, label]) => (

                                        <div
                                            className="col-md-6"
                                            key={name}
                                        >

                                            <label className="form-label">
                                                {label}
                                            </label>

                                            <input
                                                type={
                                                    name === "password"
                                                        ? "password"
                                                        : "text"
                                                }
                                                className="form-control"
                                                value={formData[name]}
                                                onChange={(e) =>
                                                    change(
                                                        name,
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                    ))}


                                    <div className="col-12">

                                        <label className="form-label">
                                            Address
                                        </label>

                                        <input
                                            className="form-control"
                                            value={formData.address}
                                            onChange={(e) =>
                                                change(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>


                                <p className="text-muted mt-3 mb-0">
                                    Enter the Role ID from the existing Roles
                                    data. Emergency fields are used when the
                                    selected role is Courier.
                                </p>

                            </div>


                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={saveUser}
                                >
                                    Save User
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}


            {/* View User Modal */}
            <ViewUserModal
                show={showViewModal}
                onClose={closeViewModal}
                user={selectedUser}
            />


            {/* Edit User Modal */}
            <EditUserModal
                show={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                }}
                onSave={updateUser}
                formData={formData}
                change={change}
            />

        </div>
    );
}

export default UserManagement;