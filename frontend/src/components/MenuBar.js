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
            <ul className="menu-bar-list" role="menu">
                <li className="menu-bar-item" role="menuitem">
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
                {isAuthenticated() && (
                    <li className="menu-bar-item" role="menuitem">
                        <button 
                            className="menu-bar-link logout-button" 
                            onClick={handleLogout}
                            aria-label="Logout"
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default memo(MenuBar);
