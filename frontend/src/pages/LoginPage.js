import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/api";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for displaying error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      localStorage.setItem("token", response.data.token);
      setError(""); // Clear any previous errors
      onLogin(); // Notify the parent component of successful login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} aria-label="Login Form" className="login-form">
        <h2 className="page-header">Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error messages */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username" // Helps browser handle autofill
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" // Helps browser handle autofill
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
