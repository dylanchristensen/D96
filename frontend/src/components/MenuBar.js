import React, { memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import './MenuBar.css';

const MenuBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="menu-bar" aria-label="Main Navigation">
            <div className="menu-bar-logo">
                <img src="/favicon.ico" alt="App Logo" className="favicon" />
            </div>
            <ul className="menu-bar-list">
                <li className="menu-bar-item">
                    <NavLink 
                        to="/dashboard" 
                        className={({ isActive }) => isActive ? 'menu-bar-link active' : 'menu-bar-link'}
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li className="menu-bar-item" role="menuitem">
                    <NavLink 
                        to="/summary" 
                        className={({ isActive }) => isActive ? 'menu-bar-link active' : 'menu-bar-link'}
                    >
                        Summary
                    </NavLink>
                </li>
                <li className="menu-bar-item" role="menuitem">
                    <NavLink 
                        to="/reports" 
                        className={({ isActive }) => isActive ? 'menu-bar-link active' : 'menu-bar-link'}
                    >
                        Reports
                    </NavLink>
                </li>
            </ul>
            {isAuthenticated() && (
                <button 
                    className="logout-button" 
                    onClick={handleLogout}
                    aria-label="Logout"
                >
                    Logout
                </button>
            )}
        </nav>
    );
};

export default memo(MenuBar);
