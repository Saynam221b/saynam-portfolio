// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => (
    <header>
        <nav>
            <ul className="nav-list">
                <li><Link to="#home">Home</Link></li>
                <li><Link to="#profile">Profile</Link></li>
                <li><Link to="#experience">Experience</Link></li>
                <li><Link to="#projects">Projects</Link></li>
                <li><Link to="#contact">Contact</Link></li>
            </ul>
        </nav>
    </header>
);

export default Header;