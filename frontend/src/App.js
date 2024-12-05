import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import MenuBar from "./components/MenuBar";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Summary from "./pages/SummaryPage";
import Reports from "./pages/ReportsPage";

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogin = () => {
    setIsAuthenticated(true); // Update auth state globally
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      {isAuthenticated && <MenuBar handleLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/summary" element={isAuthenticated ? <Summary /> : <Navigate to="/login" />} />
        <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
