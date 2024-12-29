import React from 'react';
import '../styles/ProfileCard.css';

const ProfileCard = () => (
    <div className="profile-card">
        <h2 className="profile-name">Saynam Sharma</h2>
        <p className="profile-title">Data Engineer</p>
        <p className="profile-description">
            Experienced Data Engineer with expertise in Python, Scala, SQL, AWS, and more. Skilled in designing and optimizing data pipelines and infrastructure.
        </p>
        <div className="profile-contact">
            <p>Email: saynam1101@gmail.com</p>
            <p>Phone: +91 9419271101</p>
        </div>
        <div className="profile-social-links">
            <a href="https://www.linkedin.com/in/saynam-sharma/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://portfolio1-one-gamma.vercel.app/index" target="_blank" rel="noopener noreferrer">Portfolio</a>
        </div>
    </div>
);

export default ProfileCard;