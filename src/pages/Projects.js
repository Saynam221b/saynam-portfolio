// src/pages/Projects.js
import React from 'react';
import ProjectItem from '../components/ProjectItem';
import '../styles/Projects.css';

const Projects = () => (
    <div className="projects-section">
        <h1>Projects</h1>
        <ProjectItem 
            title="Cloud-Enabled ETL Transformation" 
            description={
                <>
                    • Orchestrated data transfer from Oracle DB to S3 using Databricks Notebooks, enhancing reusability and reducing development time by 30%.<br />
                    • Conducted data profiling and analysis, improving data quality by 25% through effective outlier detection and statistical evaluations.<br />
                    • Executed stage layer transformations, including deduplication and audit column addition, resulting in a 15% reduction in data redundancy.<br />
                    • Created Delta tables in S3 using SQL files, optimizing data processing and achieving a 40% improvement in query performance.<br />
                    • Configured the serve layer with DDL for target tables, translating SQL to Spark DataFrames, which enhanced processing speed by 20%.<br />
                    • Applied Apache Airflow for pipeline orchestration, ensuring efficient scheduling and monitoring that reduced workflow execution time by 35%.
                </>
            }
        />
        <ProjectItem 
            title="Data Prediction Machine Learning Model" 
            description={
                <>
                    • Developed a machine learning model for predictions using a user-uploaded CSV dataset, achieving an accuracy rate of 85%.<br />
                    • Created a user-friendly web interface for CSV file uploads, enhancing user engagement and reducing upload time by 40%.<br />
                    • Trained and deployed the machine learning model, improving prediction speed by 30% compared to previous methods.<br />
                    • Integrated the model into a web platform, providing seamless data prediction that resulted in a 25% increase in user satisfaction.
                </>
            }
        />
    </div>
);

export default Projects;
