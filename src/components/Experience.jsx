import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: "Senior Data Engineer",
    company: "Tech Corp",
    period: "2022 - Present",
    description: [
      "Led ETL pipeline development using Apache Spark and Airflow",
      "Optimized data warehouse performance by 40%",
      "Implemented real-time data processing solutions"
    ]
  },
  {
    title: "Data Engineer",
    company: "Data Solutions Inc",
    period: "2021 - 2022",
    description: [
      "Developed and maintained data pipelines using Python",
      "Worked with large-scale datasets in AWS",
      "Collaborated with data scientists on ML pipelines"
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