import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth'; // Reuse auth function

const MenuBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear JWT
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav aria-label="Main Navigation">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/summary">Summary</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                {isAuthenticated() && (
                    <li><button onClick={handleLogout}>Logout</button></li>
                )}
            </ul>
        </nav>
    );
};

export default MenuBar;
