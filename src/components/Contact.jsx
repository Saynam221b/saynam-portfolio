import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-blue-900/30" />
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative max-w-3xl mx-auto px-4 sm:px-6"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center"
        >
          Get in Touch
        </motion.h2>

        <motion.form
          variants={containerVariants}
          className="space-y-6 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl"
          onSubmit={handleSubmit}
        >
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-gray-300 mb-2 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-gray-300 mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-gray-300 mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="5"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </motion.button>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-center text-sm"
            >
              Message sent successfully!
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center text-sm"
            >
              Failed to send message. Please try again.
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;