// src/components/ExperienceItem.js
import React from 'react';
import '../styles/ExperienceItem.css';

const ExperienceItem = ({ title, duration, location, description }) => (
    <div className="experience-item">
        <h3>{title}</h3>
        <p>{duration} | {location}</p>
        <p>{description}</p>
    </div>
);

export default ExperienceItem;
