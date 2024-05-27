// src/components/HomeCard.js
import React from 'react';
import '../styles/HomeCard.css';

const HomeCard = () => (
    <div className="home-card">
        <h2>Saynam Sharma</h2>
        <p>Experienced Data Engineer with expertise in Python, Scala, SQL, AWS, and more.</p>
        <div className="contact-info">
            <p>Email: saynam1101@gmail.com</p>
            <p>Phone: +91 9419271101</p>
        </div>
        <div className="social-links">
            <a href="https://www.linkedin.com/in/saynam-sharma/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://portfolio1-one-gamma.vercel.app/index" target="_blank" rel="noopener noreferrer">Portfolio</a>
        </div>
    </div>
);

export default HomeCard;
