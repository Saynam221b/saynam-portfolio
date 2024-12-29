import React from 'react';
import '../styles/Profile.css';
import ProfileCard from '../components/ProfileCard';

const Profile = () => (
    <div className="profile-section">
        <h1 className="profile-title">Profile</h1>
        <ProfileCard />
        <p className="profile-description">
            I am a Data Engineer with a strong background in designing and optimizing data pipelines. 
            My expertise includes Python, SQL, AWS, and various data processing frameworks. 
            I am passionate about leveraging data to drive business insights and improve decision-making.
        </p>
        <h2 className="skills-title">Skills</h2>
        <ul className="skills-list">
            <li>Python</li>
            <li>SQL</li>
            <li>AWS (S3, Glue, Lambda)</li>
            <li>Apache Airflow</li>
            <li>Databricks</li>
            <li>Data Warehousing</li>
            <li>ETL Processes</li>
        </ul>
    </div>
);

export default Profile;