import React, { useEffect, useState } from "react";
import { fetchChartReports } from "../services/api";
import { Bar } from "react-chartjs-2";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth"; // Import auth function
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../index.css"; // Import global styles

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  if (!isAuthenticated()) return <Navigate to="/login" />;

  const [chartData, setChartData] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null); // Capture errors

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

  if (error) return <p className="error-message">{error}</p>; // Display error message
  if (!chartData) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <h2 className="page-header">Reports</h2>
      <div className="chart-container">
        <Bar
          data={{
            labels: chartData.labels,
            datasets: chartData.datasets,
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Reports Chart" },
            },
          }}
        />
      </div>
      <p className="chart-description">{description}</p>
    </div>
  );
};

export default Reports;
