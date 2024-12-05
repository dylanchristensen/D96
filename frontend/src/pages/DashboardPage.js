import React, { useEffect, useState } from "react"; 
import { fetchDashboard } from "../services/api";
import { Navigate } from "react-router-dom"; // Added for redirection
import { isAuthenticated } from "../services/auth"; 

const Dashboard = () => {
  if (!isAuthenticated()) return <Navigate to="/login" />; // Redirect if not logged in

  const [content, setContent] = useState({});
  const [error, setError] = useState(null);

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
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="page-container">
      <h2 className="page-header">Dashboard</h2>
      {content.summary ? (
        <>
          <p>{content.summary}</p>
          <a href={content.referenceUrl} target="_blank" rel="noopener noreferrer" className="dashboard-link">
            Source
          </a>
          <p className="dashboard-tech-stack">{content.techStack}</p>
        </>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
