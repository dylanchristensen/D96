import React, { useEffect, useState } from "react";
import { fetchChartSummary } from "../services/api";
import { Line } from "react-chartjs-2";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
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
import "../index.css"; // Import global styles

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Summary = () => {
  if (!isAuthenticated()) return <Navigate to="/login" />;

  const [chartData, setChartData] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null); // Error state for handling issues

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetchChartSummary();
        setChartData(response.data.data);
        setDescription(response.data.description);
        setError(null); // Clear previous errors
      } catch (err) {
        console.error("Failed to fetch summary chart data:", err);
        setError("Failed to load chart data. Please try again later.");
      }
    };
    fetchChartData();
  }, []);

  if (error) return <p className="error-message">{error}</p>; // Display error message
  if (!chartData) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <h2 className="page-header">Summary</h2>
      <div className="chart-container">
        <Line
          data={{
            labels: chartData.labels,
            datasets: chartData.datasets,
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Summary Chart" },
            },
          }}
        />
      </div>
      <p className="chart-description">{description}</p>
    </div>
  );
};

export default Summary;
