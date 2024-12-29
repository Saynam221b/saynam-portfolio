import React from 'react';
import ExperienceItem from '../components/ExperienceItem';
import '../styles/Experience.css';

const Experience = () => (
    <div className="experience-section">
        <h1 className="section-title">Professional Experience</h1>
        <ExperienceItem 
            title="Data Engineer I, KPI Partners" 
            duration="09/2022 – Present" 
            location="Pune, India" 
            description={
                <>
                    <p>• Spearheaded the design and implementation of an end-to-end ETL pipeline processing over 100 GB of AR module data monthly from Oracle Fusion to Snowflake, enabling real-time reporting and analytics.</p>
                    <p>• Implemented incremental data load logic in Airflow and reduced data processing time by 60% by handling over 1 million records per iteration efficiently, while ensuring scalable and efficient data handling.</p>
                    <p>• Automated data extraction via Oracle BI API and UCM integration, delivering secure and seamless data transfers to AWS S3 with advanced encryption and decryption mechanisms.</p>
                    <p>• Developed and deployed DBT models for data transformations, improving data quality by performing comprehensive validations such as null handling, and schema drift detection.</p>
                    <p>• Deployed containerized DBT models using Docker and AWS ECS clusters, achieving a scalable, high-performance transformation pipeline.</p>
                    <p>• Streamlined AWS infrastructure provisioning and pipeline automation using Terraform, ensuring consistent, scalable, and repeatable deployments across MWAA, ECS, and S3 services.</p>
                    <p>• Enhanced pipeline observability by integrating monitoring tools like AWS CloudWatch and Snowflake Query History, improving performance visibility and troubleshooting.</p>
                    <p>• Strengthened data security by leveraging AWS KMS for encryption and enforcing role-based access controls in Snowflake, ensuring compliance with data protection standards.</p>
                    <p>• Collaborated cross-functionally to define pipeline requirements and drove the delivery of insights that supported data-driven decision-making at scale.</p>
                    <p>• Developed real-time data pipelines using PySpark to process and transform large datasets with low-latency requirements, ensuring timely insights for business decision-making.</p>
                    <p>• Designed and implemented serverless ETL workflows using AWS Glue, processing real-time data streams from various sources such as S3, databases, and APIs.</p>
                    <p>• Optimized Databricks clusters to handle high-throughput real-time data processing, reducing job execution times by up to 45% while maintaining data consistency and accuracy.</p>
                    <p>• Ensured seamless monitoring and auditing of real-time pipelines by integrating AWS CloudWatch and audit tables, providing real-time insights and traceability of data flows.</p>
                </>
            }
        />
        <ExperienceItem 
            title="Python Intern, Entuple Technologies" 
            duration="08/2021 – 09/2021" 
            location="Bangalore, India" 
            description={
                <>
                    <p>• Engineered a full-stack web application utilizing Django for the backend and React with CSS for the frontend, resulting in a 25% increase in user engagement.</p>
                    <p>• Deployed the application on Heroku, implementing CI/CD pipelines that streamlined the deployment process and reduced deployment time by 40%.</p>
                    <p>• Conducted comprehensive testing and debugging, achieving a 30% reduction in reported issues and enhancing overall application stability.</p>
                    <p>• Leveraged Django’s robust features for scalable development, optimizing performance to accommodate a 50% increase in concurrent users.</p>
                </>
            }
        />
    </div>
);

export default Experience;