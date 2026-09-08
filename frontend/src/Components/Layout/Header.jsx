import {
    FiTruck,
    FiLogOut
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";


function Header() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

       const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="app-header">

            {/* Brand */}
            <div className="header-brand">

                <div className="header-logo">
                    <FiTruck />
                </div>

                <div className="header-brand-text">
                    <h1>Courier Parcel Tracking</h1>
                    <span>Management System</span>
                </div>

            </div>

            {/* Right Side */}
            <div className="header-actions">

                <div className="header-user">

                    <div className="user-avatar">
                        SA
                    </div>

                    <div className="user-info">

                        <span className="user-name">
                            {user?.userName || "User"}
                        </span>

                        <span className="user-role">
                            {user?.roles?.[0]}
                        </span>

                    </div>

                </div>

                <button
                className="logout-button"
                onClick={handleLogout}
            >
                <FiLogOut />
                <span>Logout</span>
            </button>

            </div>

        </header>
    );
}

export default Header;
