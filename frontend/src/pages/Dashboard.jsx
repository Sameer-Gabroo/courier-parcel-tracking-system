import { useEffect, useState } from "react";

import SummaryCard from "../Components/Dashboard/SummaryCard";
import ParcelStatusChart from "../Components/Dashboard/ParcelStatusChart";
import RecentParcels from "../Components/Dashboard/RecentParcels";

import DashboardService from "../Services/DashboardService";

import "../styles/dashboard.css";

function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);

    const getDashboardData = async () => {
        try {
            const data =
                await DashboardService.getDashboardSummary();

            setDashboardData(data);
        } catch (error) {
            console.error(
                "Error getting dashboard data:",
                error
            );
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    if (!dashboardData) {
        return (
            <div className="dashboard-page">

                <div className="text-center py-5">
                    <div
                        className="spinner-border"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="text-muted mt-3">
                        Loading dashboard...
                    </p>
                </div>

            </div>
        );
    }

    const summary = dashboardData.summary;

    return (
        <div className="dashboard-page">

            {/* Page Header */}
            <div className="dashboard-header">

                <div>

                    <h2 className="dashboard-title">
                        Dashboard Overview
                    </h2>

                    <p className="dashboard-subtitle">
                        Welcome back! Here's what's happening
                        with your deliveries.
                    </p>

                </div>

                <div className="dashboard-badge">

                    <span className="dashboard-badge-dot"></span>

                    Courier Management

                </div>

            </div>


            {/* Summary Cards */}
            <div className="row g-4 dashboard-summary">

                <div className="col-12 col-sm-6 col-xl-3">

                    <SummaryCard
                        title="Total Parcels"
                        value={summary.totalParcels}
                        description="All registered parcels"
                        type="total"
                    />

                </div>


                <div className="col-12 col-sm-6 col-xl-3">

                    <SummaryCard
                        title="In Transit"
                        value={summary.inTransit}
                        description="Currently in transit"
                        type="transit"
                    />

                </div>


                <div className="col-12 col-sm-6 col-xl-3">

                    <SummaryCard
                        title="Delivered"
                        value={summary.delivered}
                        description="Successfully delivered"
                        type="delivered"
                    />

                </div>


                <div className="col-12 col-sm-6 col-xl-3">

                    <SummaryCard
                        title="Delayed"
                        value={summary.delayed}
                        description="Requires attention"
                        type="delayed"
                    />

                </div>

            </div>


            {/* Chart Section */}
           <div className="dashboard-chart-ai">

    {/* Parcel Status Overview */}
    <div className="dashboard-section chart-panel">

        <ParcelStatusChart
            data={dashboardData.statusOverview}
        />

    </div>


    {/* AI Predictor */}
    <div className="dashboard-section ai-predictor-panel">

        <div className="ai-predictor-header">

            <div>
                <h3>AI Predictor</h3>

                <p>
                    Intelligent parcel delivery insights
                </p>
            </div>

            <div className="ai-predictor-icon">
                ✦
            </div>

        </div>


        <div className="ai-predictor-content">

            <div className="ai-prediction-item">

                <span className="ai-prediction-label">
                    Delivery Prediction
                </span>

                <strong>
                    High
                </strong>

            </div>


            <div className="ai-prediction-item">

                <span className="ai-prediction-label">
                    On-time Delivery
                </span>

                <strong>
                    92%
                </strong>

            </div>


            <div className="ai-prediction-item">

                <span className="ai-prediction-label">
                    Risk Level
                </span>

                <span className="ai-risk-badge">
                    Low Risk
                </span>

            </div>


            <div className="ai-predictor-message">

                <span className="ai-message-icon">
                    ✓
                </span>

                <p>
                    Current parcel activity indicates
                    a positive delivery trend.
                </p>

            </div>


            <button className="ai-predictor-button">
                View Prediction Details
            </button>

        </div>

    </div>

</div>


            {/* Recent Parcels Section */}
            <div className="dashboard-section">

                <RecentParcels
                    parcels={dashboardData.recentParcels}
                />

            </div>

        </div>
    );
}

export default Dashboard;
