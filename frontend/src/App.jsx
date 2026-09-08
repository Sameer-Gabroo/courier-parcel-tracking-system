import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./Components/Layout/MainLayout";
import ParcelManagement from "./pages/ParcelManagement";
import Dashboard from "./pages/Dashboard";
import CustomerManagement from "./pages/CustomerManagement";
import HubManagement from "./pages/HubManagement";
import RoutesManagement from "./pages/RoutesManagement";
import Tracking from "./pages/Tracking";
import CourierManagement from "./pages/CourierManagement";
import UserManagement from "./pages/UserManagement";
import Dispatcher from "./pages/Dispatcher";
import Courier from "./pages/Courier";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
    return (
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

                <Route
                path="/"
                element={<Login />}
            />

            {/* Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "Admin",
                            "Dispatcher",
                            "Booking Agent",
                            "Courier"
                        ]}
                    >
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Parcels */}
            <Route
                path="/Parcels"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "Admin",
                            "Booking Agent",
                            "Dispatcher"
                        ]}
                    >
                        <MainLayout>
                            <ParcelManagement />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Customers */}
            <Route
                path="/Customers"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "Admin",
                            "Booking Agent"
                        ]}
                    >
                        <MainLayout>
                            <CustomerManagement />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Hubs */}
            <Route
                path="/Hubs"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "Admin",
                            "Dispatcher",
                            "Booking Agent",
                            "Courier"
                        ]}
                    >
                        <MainLayout>
                            <HubManagement />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Routes */}
            <Route
                path="/Routes"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "Admin",
                            "Dispatcher",
                            "Booking Agent",
                            "Courier"
                        ]}
                    >
                        <MainLayout>
                            <RoutesManagement />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Customer Tracking */}
            <Route
                path="/tracking"
                element={
                    <ProtectedRoute
                        allowedRoles={["Customer"]}
                    >
                        <MainLayout>
                            <Tracking />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Courier Management */}
            <Route
                path="/CourierManagement"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "Admin",
                            "Dispatcher"
                        ]}
                    >
                        <MainLayout>
                            <CourierManagement />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Dispatcher */}
            <Route
                path="/Dispatcher"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "Admin",
                            "Dispatcher"
                        ]}
                    >
                        <MainLayout>
                            <Dispatcher />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Courier Parcels */}
            <Route
                path="/Courier"
                element={
                    <ProtectedRoute
                       allowedRoles={["Courier", "Dispatcher"]}
                    >
                        <MainLayout>
                            <Courier />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* User Management */}
            <Route
                path="/userManagment"
                element={
                    <ProtectedRoute
                        allowedRoles={["Admin"]}
                    >
                        <MainLayout>
                            <UserManagement />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;