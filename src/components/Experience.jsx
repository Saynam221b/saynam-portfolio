import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: "Data Engineer I",
    company: "KPI Partners",
    period: "Sept. 2022 - Present",
    description: [<>
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

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center"
        >
          Experience
        </motion.h2>
        
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-blue-500">{exp.title}</h3>
              <p className="text-gray-400 mb-4">{exp.company} | {exp.period}</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="text-sm sm:text-base">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;