import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import MenuBar from "./components/MenuBar"; 
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Summary from "./pages/SummaryPage";
import Reports from "./pages/ReportsPage";

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      {isAuthenticated() && <MenuBar handleLogout={handleLogout} />} {/* Show menu bar if authenticated */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/summary"
          element={isAuthenticated() ? <Summary /> : <Navigate to="/login" />}
        />
        <Route
          path="/reports"
          element={isAuthenticated() ? <Reports /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

/**
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth"; // Import authentication check
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import SummaryPage from "./pages/SummaryPage";
import ReportsPage from "./pages/ReportsPage"; 

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
 */
