import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../services/api";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ReportsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await api.get("/chartData/reports");
        setChartData(response.data.data);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching reports chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="chart-container">
      <h2 className="page-header">Reports Chart</h2>
      {chartData ? (
        <div className="chart-wrapper">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true, // Keep consistent aspect ratio
              plugins: {
                legend: { display: true },
                tooltip: { enabled: true },
              },
              layout: {
                padding: 10, // Add padding for clean appearance
              },
            }}
          />
        </div>
      ) : (
        <p className="loading-message">Loading chart data...</p>
      )}
      <p className="chart-description">
        {description || "This chart showcases participation levels in events and surveys at UNC Charlotte."}
      </p>
    </div>
  );
};

export default ReportsChart;
