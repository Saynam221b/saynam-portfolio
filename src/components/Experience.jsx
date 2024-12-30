import React from 'react';
    import styled from 'styled-components';
    import { motion } from 'framer-motion';
    
    const ExperienceContainer = styled(motion.div)`
      padding: 2rem;
      min-height: calc(100vh - 60px);
      backdrop-filter: blur(3px);
    `;
    
    const Title = styled(motion.h2)`
      font-size: 2rem;
      margin-bottom: 1.5rem;
      text-align: center;
    `;
    
    const ExperienceList = styled(motion.ul)`
      list-style: none;
      padding: 0;
    `;
    
    const ExperienceItem = styled(motion.li)`
      background-color: rgba(71, 85, 105, 0.15);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      margin-bottom: 1rem;
      backdrop-filter: blur(2px);
    `;
    
    const JobTitle = styled(motion.h3)`
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    `;
    
    const Company = styled(motion.h4)`
      font-size: 1.2rem;
      color: #00bcd4;
      margin-bottom: 0.5rem;
    `;
    
    const Duration = styled(motion.p)`
      color: #ddd;
      margin-bottom: 1rem;
    `;
    
    const Description = styled(motion.p)`
      color: #ddd;
    `;
    
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2,
        },
      },
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };
    
    function Experience() {
      const experiences = [
        {
          title: "Data Engineer I",
          company: "KPI Partners",
          period: "Sept. 2022 - Present",
          description: [
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
          ]
        },
        {
          title: "Python Intern",
          company: "Entuple Technologies",
          period: "2021 Aug - 2021 Oct",
          description: [
            <>
              <p>• Engineered a full-stack web application utilizing Django for the backend and React with CSS for the frontend, resulting in a 25% increase in user engagement.</p>
              <p>• Deployed the application on Heroku, implementing CI/CD pipelines that streamlined the deployment process and reduced deployment time by 40%.</p>
              <p>• Conducted comprehensive testing and debugging, achieving a 30% reduction in reported issues and enhancing overall application stability.</p>
              <p>• Leveraged Django’s robust features for scalable development, optimizing performance to accommodate a 50% increase in concurrent users.</p>
            </>
          ]
        }
      ];
    
      return (
        <ExperienceContainer
          id="experience"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Title variants={itemVariants}>My Experience</Title>
          <ExperienceList>
            {experiences.map((experience, index) => (
              <ExperienceItem key={index} variants={itemVariants}>
                <JobTitle>{experience.title}</JobTitle>
                <Company>{experience.company}</Company>
                <Duration>{experience.period}</Duration>
                <Description>{experience.description}</Description>
              </ExperienceItem>
            ))}
          </ExperienceList>
        </ExperienceContainer>
      );
    }
    
    export default Experience;
