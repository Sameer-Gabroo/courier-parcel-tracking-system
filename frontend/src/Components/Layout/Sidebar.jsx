import { NavLink } from "react-router-dom";
import {
    FiBarChart2, FiBox, FiMapPin, FiMap, FiUsers,
    FiTruck, FiClipboard, FiUserCheck, FiSettings
} from "react-icons/fi";

const navigation = [
    { label: "Dashboard", to: "/dashboard", icon: FiBarChart2, roles: ["Admin", "Dispatcher", "Booking Agent", "Courier"] },
    { label: "Parcels", to: "/Parcels", icon: FiBox, roles: ["Admin", "Booking Agent", "Dispatcher"] },
    { label: "Customers", to: "/Customers", icon: FiUsers, roles: ["Admin", "Booking Agent"] },
    { label: "Hubs", to: "/Hubs", icon: FiMapPin, roles: ["Admin", "Booking Agent", "Dispatcher", "Courier"] },
    { label: "Routes", to: "/Routes", icon: FiMap, roles: ["Admin", "Booking Agent", "Dispatcher", "Courier"] },
    { label: "Tracking", to: "/tracking", icon: FiBox, roles: ["Customer"] },
    { label: "Courier Management", to: "/CourierManagement", icon: FiUserCheck, roles: ["Admin", "Dispatcher"] },
    { label: "Dispatcher", to: "/Dispatcher", icon: FiClipboard, roles: ["Admin", "Dispatcher"] },
    { label: "Courier Parcels", to: "/Courier", icon: FiTruck, roles: [  "Courier"] }
];

function Sidebar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.roles?.[0];

    return (
        <aside className="app-sidebar">
            <h6 className="sidebar-title">Main menu</h6>
            <ul className="sidebar-nav nav nav-pills flex-column">
                {navigation.filter((item) => item.roles.includes(role)).map(({ label, to, icon: Icon }) => (
                    <li className="nav-item" key={to}>
                        <NavLink to={to} className={({ isActive }) => `sidebar-link nav-link ${isActive ? "active" : ""}`}>
                            <Icon aria-hidden="true" />
                            <span>{label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            {role === "Admin" && (
                <>
                    <hr className="sidebar-divider" />
                    <h6 className="sidebar-title">Administration</h6>
                    <ul className="sidebar-nav nav nav-pills flex-column">
                        <li className="nav-item">
                            <NavLink to="/userManagment" className={({ isActive }) => `sidebar-link nav-link ${isActive ? "active" : ""}`}>
                                <FiSettings aria-hidden="true" />
                                <span>Users</span>
                            </NavLink>
                        </li>
                    </ul>
                </>
            )}
        </aside>
    );
}

export default Sidebar;
