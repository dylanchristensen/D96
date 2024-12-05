import React, { useEffect, useState } from "react";
import { fetchDashboard } from "../services/api";
import "../index.css"; // Import global styles

const Dashboard = () => {
  const [content, setContent] = useState({}); // State to hold dashboard content
  const [error, setError] = useState(null); // State to capture errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDashboard();
        setContent(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard content");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Dashboard</h2>
      {content.summary ? (
        <div className="dashboard-content">
          <p className="dashboard-summary">{content.summary}</p>
          {content.referenceUrl && (
            <a
              className="dashboard-link"
              href={content.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          )}
          <p className="dashboard-tech-stack">{content.techStack}</p>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
