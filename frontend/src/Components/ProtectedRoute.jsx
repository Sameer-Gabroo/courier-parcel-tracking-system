import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const role = user?.roles?.[0];

    if (allowedRoles && !allowedRoles.includes(role)) {
        if (role === "Customer") {
            return <Navigate to="/tracking" replace />;
        }

        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;