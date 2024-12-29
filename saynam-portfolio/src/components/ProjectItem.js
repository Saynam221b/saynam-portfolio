// src/components/ProjectItem.js
import React from 'react';
import '../styles/ProjectItem.css';

const ProjectItem = ({ title, description }) => (
    <div className="project-item">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
    </div>
);

export default ProjectItem;