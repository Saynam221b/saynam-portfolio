import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: "Cloud-Enabled ETL Transformation",
    description:[
      <>
          • Orchestrated data transfer from Oracle DB to S3 using Databricks Notebooks, enhancing reusability and reducing development time by 30%.<br />
          • Conducted data profiling and analysis, improving data quality by 25% through effective outlier detection and statistical evaluations.<br />
          • Executed stage layer transformations, including deduplication and audit column addition, resulting in a 15% reduction in data redundancy.<br />
          • Created Delta tables in S3 using SQL files, optimizing data processing and achieving a 40% improvement in query performance.<br />
          • Configured the serve layer with DDL for target tables, translating SQL to Spark DataFrames, which enhanced processing speed by 20%.<br />
          • Applied Apache Airflow for pipeline orchestration, ensuring efficient scheduling and monitoring that reduced workflow execution time by 35%.
      </>
    ],
    tech: ["Python", "SQL", "Databricks", "PySpark"],
    github: "",
    live: ""
  },
  {
    title: "Data Prediction Machine Learning Model",
    description:[
      <>
                    • Developed a machine learning model for predictions using a user-uploaded CSV dataset, achieving an accuracy rate of 85%.<br />
                    • Created a user-friendly web interface for CSV file uploads, enhancing user engagement and reducing upload time by 40%.<br />
                    • Trained and deployed the machine learning model, improving prediction speed by 30% compared to previous methods.<br />
                    • Integrated the model into a web platform, providing seamless data prediction that resulted in a 25% increase in user satisfaction.      </>
    ],
    tech: ["ML", "Python", "HTML", "CSS", "JavaScript"],
    github: "",
    live: ""
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-900 rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-blue-500 mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="bg-gray-700 text-blue-400 px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <FaExternalLinkAlt size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;