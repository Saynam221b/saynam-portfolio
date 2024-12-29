import React from 'react';
import '../styles/HomeCard.css';

const HomeCard = () => (
    <div className="home-card">
        <h2 className="home-card-title">Saynam Sharma</h2>
        <p className="home-card-description">Data Engineer with expertise in Python, Scala, SQL, AWS, and more.</p>
        <div className="home-card-contact-info">
            <p>Email: <a href="mailto:saynam1101@gmail.com">saynam1101@gmail.com</a></p>
            <p>Phone: <a href="tel:+919419271101">+91 9419271101</a></p>
        </div>
        <div className="home-card-social-links">
            <a href="https://www.linkedin.com/in/saynam-sharma/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://portfolio1-one-gamma.vercel.app/index" target="_blank" rel="noopener noreferrer">Portfolio</a>
        </div>
    </div>
);

export default HomeCard;