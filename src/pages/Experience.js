// src/pages/Experience.js
import React from 'react';
import ExperienceItem from '../components/ExperienceItem';
import '../styles/Experience.css';

const Experience = () => (
    <div className="experience-section">
        <h1>Experience</h1>
        <ExperienceItem 
            title="Data Engineer I, KPI Partners" 
            duration="09/2022 – present" 
            location="Pune, India" 
            description="Details of your experience "
        />
        <ExperienceItem 
            title="Python Intern, Entuple Technologies" 
            duration="08/2021 – 09/2021" 
            location="Bangalore, India" 
            description="Details of your experience at Entuple Technologies..."
        />
    </div>
);

export default Experience;
