import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode"; // Import jwt-decode to decode tokens

const AuthContext = createContext();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Define the checkAuth function to determine the initial authentication status
const checkAuth = () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // Check if the token exists and whether it can be decoded
  if (token) {
    try {
      const { exp } = jwtDecode(token);
      // Ensure token hasn't expired
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem("token"); // Remove expired token
        return false;
      }
      return true;
    } catch (err) {
      console.error("Error decoding token:", err.message);
      return false;
    }
  }

  return false; // No valid token found
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

  useEffect(() => {
    const syncAuthState = () => setIsAuthenticated(checkAuth());
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
