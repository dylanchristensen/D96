import React, { useEffect, useState } from 'react';
import { fetchDashboard } from '../services/api';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await fetchDashboard();
        setData(data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    getData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data.summary}</p>
      <a href={data.referenceUrl} target="_blank" rel="noopener noreferrer">
        Source
      </a>
      <p>Tech Stack: {data.techStack}</p>
    </div>
  );
}

export default Dashboard;
