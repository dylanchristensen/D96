import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Define the checkAuth function to determine the initial authentication status
const checkAuth = () => {
  // Check if the token exists in localStorage
  return !!localStorage.getItem("token");
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
