import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"; // For redirection

import { fetchDashboard } from "../services/api";
import { useAuth } from "../context/AuthContext"; // Use context for authentication

const Dashboard = () => {
    const { isAuthenticated } = useAuth(); // Get authentication state from context

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

    if (!isAuthenticated) return <Navigate to="/login" />; // Redirect if not authenticated

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="page-container">
            <h2 className="page-header">Dashboard</h2>
            {content.summary ? (
                <>
                    <p className="summary-section">{content.summary}</p>
                    <a
                        href={content.referenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dashboard-link"
                    >
                        Source
                    </a>
                    <h3 className="tech-header">Technical Overview</h3> {/* Added header for tech summary */}
                    <p className="dashboard-tech-stack">{content.techStack}</p>
                </>
            ) : (
                <p className="loading-message">Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
