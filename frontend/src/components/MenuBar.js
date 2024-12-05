import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/auth'; // Reuse auth function
import './MenuBar.css';

const MenuBar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route for comparison

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear JWT
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav aria-label="Main Navigation">
            <ul>
                <li>
                    <Link
                        to="/dashboard"
                        className={location.pathname === '/dashboard' ? 'disabled-link' : ''}
                        onClick={(e) => location.pathname === '/dashboard' && e.preventDefault()}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/summary"
                        className={location.pathname === '/summary' ? 'disabled-link' : ''}
                        onClick={(e) => location.pathname === '/summary' && e.preventDefault()}
                    >
                        Summary
                    </Link>
                </li>
                <li>
                    <Link
                        to="/reports"
                        className={location.pathname === '/reports' ? 'disabled-link' : ''}
                        onClick={(e) => location.pathname === '/reports' && e.preventDefault()}
                    >
                        Reports
                    </Link>
                </li>
                {isAuthenticated() && (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default MenuBar;
