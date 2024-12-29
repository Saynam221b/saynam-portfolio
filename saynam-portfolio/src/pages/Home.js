import React from 'react';
import '../styles/Home.css';

const Home = () => (
    <div className="home-section">
        <div className="intro-content">
            <h1 className="intro-title">Saynam Sharma</h1>
            <p className="intro-text">Data Engineer with a passion for building scalable data solutions and optimizing data workflows. Proficient in Python, SQL, AWS, and data pipeline orchestration.</p>
            <div className="skills">
                <h2>Skills</h2>
                <ul>
                    <li>Python</li>
                    <li>SQL</li>
                    <li>AWS (S3, Glue, Lambda)</li>
                    <li>Apache Airflow</li>
                    <li>Databricks</li>
                    <li>Snowflake</li>
                </ul>
            </div>
            <div className="contact-info">
                <h2>Contact Information</h2>
                <p>Email: saynam1101@gmail.com</p>
                <p>Phone: +91 9419271101</p>
            </div>
        </div>
    </div>
);

export default Home;