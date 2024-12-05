import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import './index.css';


const MenuBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="menu-bar" aria-label="Main Navigation">
            <ul className="menu-bar-list">
                <li className="menu-bar-item">
                    <NavLink 
                        to="/dashboard" 
                        className={({ isActive }) => isActive ? 'menu-bar-link active' : 'menu-bar-link'}
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li className="menu-bar-item">
                    <NavLink 
                        to="/summary" 
                        className={({ isActive }) => isActive ? 'menu-bar-link active' : 'menu-bar-link'}
                    >
                        Summary
                    </NavLink>
                </li>
                <li className="menu-bar-item">
                    <NavLink 
                        to="/reports" 
                        className={({ isActive }) => isActive ? 'menu-bar-link active' : 'menu-bar-link'}
                    >
                        Reports
                    </NavLink>
                </li>
                {isAuthenticated() && (
                    <li className="menu-bar-item">
                        <button 
                            className="menu-bar-link logout-button" 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default MenuBar;
