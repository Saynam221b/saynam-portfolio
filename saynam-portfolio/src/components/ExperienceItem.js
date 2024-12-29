import React from 'react';
import '../styles/ExperienceItem.css';

const ExperienceItem = ({ title, duration, location, description }) => (
    <div className="experience-item">
        <h3 className="experience-title">{title}</h3>
        <p className="experience-duration">{duration} | {location}</p>
        <div className="experience-description">{description}</div>
    </div>
);

export default ExperienceItem;