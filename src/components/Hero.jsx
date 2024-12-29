import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 px-4">
      <div className="max-w-7xl w-full mx-auto py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6">
            Data Engineer
            <span className="text-blue-500">.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transforming raw data into meaningful insights through innovative solutions and scalable architectures
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            Download Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;