import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div className='header'>
            <Link to="/">Home</Link>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
            <Link to="/registerRBS">RegisterRBS</Link>
        </div>
    );
};

export default Header;