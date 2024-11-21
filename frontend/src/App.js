import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Summary from "./pages/Summary";
import Reports from "./pages/Reports";

const App = () => {
  const isAuthenticated = () => !!localStorage.getItem("token");

  return (
    <Router>
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
