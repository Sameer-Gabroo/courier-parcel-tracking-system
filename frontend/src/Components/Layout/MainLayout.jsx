import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./footer";

function MainLayout({ children }) {

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.roles?.[0];

    return (
        <div className="app-shell d-flex flex-column">

            <Header />

            <div className="d-flex flex-grow-1">

                {role !== "Customer" && <Sidebar />}

                <main className="app-content flex-grow-1">
                    {children}
                </main>

            </div>

            <Footer />

        </div>
    );
}

export default MainLayout;
