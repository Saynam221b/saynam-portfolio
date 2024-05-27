// src/components/ProjectItem.js
import React from 'react';
import '../styles/ProjectItem.css';

const ProjectItem = ({ title, description }) => (
    <div className="project-item">
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

export default ProjectItem;
