import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const [chartData, setChartData] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("http:64.225.11.18:3000/chartData/reports", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setChartData(response.data.data);
        setDescription(response.data.description);
      } catch (err) {
        alert("Failed to fetch reports chart data!");
      }
    };
    fetchChartData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Reports</h2>
      <Bar
        data={{
          labels: chartData.labels,
          datasets: chartData.datasets,
        }}
      />
      <p>{description}</p>
    </div>
  );
};

export default Reports;
