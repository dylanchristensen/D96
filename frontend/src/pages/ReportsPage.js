import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"; // Using Pie chart
import { Navigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement, // Required for Pie charts
  Tooltip,
  Legend,
} from "chart.js";

import { useAuth } from "../context/AuthContext"; // Use context for authentication
import { fetchChartReports } from "../services/api"; // API call for reports

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportsPage = () => {
    const { isAuthenticated } = useAuth(); // Get authentication state from context

    const [chartData, setChartData] = useState(null);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await fetchChartReports();
                setChartData(response.data.data);
                setDescription(response.data.description);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error("Failed to fetch reports chart data:", err);
                setError("Failed to load chart data. Please try again later.");
            }
        };

        fetchChartData();
    }, []);

    if (!isAuthenticated) return <Navigate to="/login" />; // Redirect if not authenticated
    if (error) return <p className="error-message">{error}</p>; // Display error message
    if (!chartData) return <p>Loading...</p>;

    return (
        <div className="page-container">
            <h2 className="page-header">Reports</h2>
            <div className="chart-container pie-chart">
                <Pie
                    data={{
                        labels: chartData.labels,
                        datasets: chartData.datasets,
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { display: true, position: "bottom" },
                            tooltip: { enabled: true },
                        },
                    }}
                />
            </div>

            <p className="chart-description">{description}</p>
        </div>
    );
};

export default ReportsPage;
