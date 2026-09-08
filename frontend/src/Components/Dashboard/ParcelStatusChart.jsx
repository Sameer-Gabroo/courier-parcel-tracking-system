import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

const barColors = {
    Assigned: "#4F46E5",
    Delivered: "#059669",
    "Out for Delivery": "#D97706"
};

function ParcelStatusChart({ data }) {

    const chartData = data.map((item) => ({
        status: item.status,
        parcels: item.count
    }));

    const CustomTooltip = ({ active, payload }) => {

        if (!active || !payload || !payload.length) {
            return null;
        }

        const data = payload[0];

        return (
            <div
                style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)"
                }}
            >
                <div
                    style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#64748B",
                        marginBottom: "4px"
                    }}
                >
                    {data.payload.status}
                </div>

                <div
                    style={{
                        fontSize: "17px",
                        fontWeight: "700",
                        color: "#0F172A"
                    }}
                >
                    {data.value} parcels
                </div>
            </div>
        );
    };

    return (
        <div
            className="card border-0"
            style={{
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.06)"
            }}
        >

            <div className="card-body p-4">

                {/* Header */}
                <div className="mb-3">

                    <h5
                        className="mb-1"
                        style={{
                            fontSize: "18px",
                            fontWeight: "700",
                            color: "#0F172A"
                        }}
                    >
                        Parcel Status Overview
                    </h5>

                    <p
                        className="mb-0"
                        style={{
                            fontSize: "13px",
                            color: "#64748B"
                        }}
                    >
                        Current distribution of parcel statuses
                    </p>

                </div>

                {/* Chart */}
                <div
                    style={{
                        width: "100%",
                        height: "320px"
                    }}
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 0,
                                bottom: 10
                            }}
                            barCategoryGap="35%"
                        >

                            <CartesianGrid
                                stroke="#E2E8F0"
                                strokeDasharray="4 4"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="status"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#64748B",
                                    fontSize: 13,
                                    fontWeight: 500
                                }}
                                dy={10}
                            />

                            <YAxis
                                allowDecimals={false}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#94A3B8",
                                    fontSize: 12
                                }}
                                width={30}
                            />

                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{
                                    fill: "rgba(15, 23, 42, 0.025)"
                                }}
                            />

                            <Bar
                                dataKey="parcels"
                                radius={[8, 8, 4, 4]}
                                maxBarSize={85}
                            >

                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            barColors[entry.status] ||
                                            "#64748B"
                                        }
                                    />
                                ))}

                            </Bar>

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}

export default ParcelStatusChart;