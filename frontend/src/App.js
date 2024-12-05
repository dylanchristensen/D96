import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated as checkAuth } from "./services/auth"; // Import authentication check
import MenuBar from "./components/MenuBar";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Summary from "./pages/SummaryPage";
import Reports from "./pages/ReportsPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  useEffect(() => {
    // Synchronize authentication state if localStorage changes (e.g., across tabs)
    const syncAuthState = () => setIsAuthenticated(checkAuth());
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  return (
    <Router>
      {isAuthenticated && <MenuBar handleLogout={handleLogout} />} {/* Show menu bar if authenticated */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/summary"
          element={isAuthenticated ? <Summary /> : <Navigate to="/login" />}
        />
        <Route
          path="/reports"
          element={isAuthenticated ? <Reports /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
