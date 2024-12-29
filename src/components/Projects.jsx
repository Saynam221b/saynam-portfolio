import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: "Data Pipeline Framework",
    description: "Built a scalable ETL framework using Apache Airflow and Python",
    tech: ["Python", "Airflow", "PostgreSQL", "Docker"],
    github: "https://github.com/yourusername/project1",
    live: "https://project1.com"
  },
  {
    title: "Real-time Analytics Dashboard",
    description: "Developed a real-time analytics platform using Kafka and Elasticsearch",
    tech: ["Kafka", "Elasticsearch", "React", "Node.js"],
    github: "https://github.com/yourusername/project2",
    live: "https://project2.com"
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