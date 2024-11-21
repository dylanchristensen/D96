import React, { useEffect, useState } from "react";
import { fetchDashboard } from "../services/api";

const Dashboard = () => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDashboard();
        setContent(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard content:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{content.summary}</p>
      {content.referenceUrl && <a href={content.referenceUrl}>Source</a>}
      <p>{content.techStack}</p>
    </div>
  );
};

export default Dashboard;
