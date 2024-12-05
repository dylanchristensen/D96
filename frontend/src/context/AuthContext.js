import { createContext, useContext, useState, useEffect } from "react";

import { isAuthenticated as checkAuth } from "../services/auth";

const AuthContext = createContext();

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
