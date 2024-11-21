import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http:64.225.11.18:3000/dashboard", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setContent(response.data);
      } catch (err) {
        alert("Failed to fetch dashboard content!");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{content.summary}</p>
      <a href={content.referenceUrl}>Source</a>
      <p>{content.techStack}</p>
    </div>
  );
};

export default Dashboard;
