import React, { useEffect, useState } from "react";
import axios from "../services/api"; // Ensure it uses your `api.js` service

const Dashboard = () => {
  const [content, setContent] = useState({}); // State to hold dashboard content
  const [error, setError] = useState(null); // State to capture errors

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('/dashboard'); // Adjusted to use baseURL from .env
        setContent(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard content");
      }
    };

    fetchDashboard();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {content.summary ? (
        <>
          <p>{content.summary}</p>
          <a href={content.referenceUrl} target="_blank" rel="noopener noreferrer">Source</a>
          <p>{content.techStack}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
