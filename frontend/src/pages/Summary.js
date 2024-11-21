import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Summary = () => {
  const [chartData, setChartData] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("http:64.225.11.18:3000/chartData/summary", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setChartData(response.data.data);
        setDescription(response.data.description);
      } catch (err) {
        alert("Failed to fetch summary chart data!");
      }
    };
    fetchChartData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Summary</h2>
      <Line
        data={{
          labels: chartData.labels,
          datasets: chartData.datasets,
        }}
      />
      <p>{description}</p>
    </div>
  );
};

export default Summary;
