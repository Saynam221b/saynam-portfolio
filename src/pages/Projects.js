// src/pages/Projects.js
import React from 'react';
import ProjectItem from '../components/ProjectItem';
import '../styles/Projects.css';

const Projects = () => (
    <div className="projects-section">
        <h1>Projects</h1>
        <ProjectItem 
            title="Cloud-Enabled ETL Transformation" 
            description="Orchestrated data transfer from Oracle DB to S3 using Databricks Notebooks..."
        />
        <ProjectItem 
            title="Google Sheets API Data Pipeline" 
            description="Engineered a data pipeline that utilized the Google Sheets API for data extraction..."
        />
        <ProjectItem 
            title="Data Prediction Machine Learning Model" 
            description="Developed a machine learning model enabling predictions from a CSV dataset..."
        />
    </div>
);

export default Projects;
