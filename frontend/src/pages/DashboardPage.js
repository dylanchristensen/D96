import React, { useEffect, useState } from "react";
import { fetchDashboard } from "../services/api";
import { isAuthenticated } from "../services/auth"; // Import auth function


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
