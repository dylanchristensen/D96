import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Navigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useAuth } from "../context/AuthContext"; // Use context for authentication
import { fetchChartSummary } from "../services/api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SummaryPage = () => {
    const { isAuthenticated } = useAuth(); // Get authentication state from context

    const [chartData, setChartData] = useState(null);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await fetchChartSummary();
                setChartData(response.data.data);
                setDescription(response.data.description);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error("Failed to fetch summary chart data:", err);
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
            <h2 className="page-header">Summary</h2>
            <div className="chart-container line-chart">
                <Line
                    data={{
                        labels: chartData.labels,
                        datasets: chartData.datasets,
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false, // Allow chart to adjust to container
                        plugins: {
                            legend: { display: true, position: "top" },
                            tooltip: { enabled: true },
                            title: { display: true, text: "Participation in Sustainability Events" },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: "Year",
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Participants",
                                },
                            },
                        },
                    }}
                />
            </div>
            <p className="chart-description">{description}</p>
        </div>
    );
};

export default SummaryPage;
