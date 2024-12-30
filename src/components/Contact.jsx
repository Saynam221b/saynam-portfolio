import React, { useState } from 'react';
    import styled from 'styled-components';
    import { motion } from 'framer-motion';
    import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
    
    const ContactContainer = styled(motion.div)`
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      min-height: calc(100vh - 60px);
    `;
    
    const Title = styled(motion.h2)`
      font-size: 2rem;
      margin-bottom: 1.5rem;
    `;
    
    const ContactInfo = styled(motion.div)`
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    `;
    
    const ContactLink = styled(motion.a)`
      color: #00bcd4;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.3s ease;
    
      &:hover {
        color: #008ba3;
      }
    `;
    
    const SocialIcons = styled(motion.div)`
      display: flex;
      gap: 20px;
      font-size: 2rem;
    `;
    
    const SocialLink = styled(motion.a)`
      color: #fff;
      transition: color 0.3s ease;
    
      &:hover {
        color: #00bcd4;
      }
    `;
    
    const Form = styled(motion.form)`
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      gap: 1rem;
    `;
    
    const Input = styled(motion.input)`
      padding: 1rem;
      border: 1px solid #444;
      border-radius: 5px;
      background-color: #334155;
      color: #fff;
    `;
    
    const Textarea = styled(motion.textarea)`
      padding: 1rem;
      border: 1px solid #444;
      border-radius: 5px;
      background-color: #334155;
      color: #fff;
      resize: vertical;
    `;
    
    const SubmitButton = styled(motion.button)`
      background-color: #00bcd4;
      color: #fff;
      padding: 1rem 2rem;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
    
      &:hover {
        background-color: #008ba3;
      }
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
    
    function Contact() {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const smtpUser = 'saynamsharma221b@gmail.com';
        const smtpPass = 'tfmwcuafqardzief';
        const recipientEmail = 'saynamsharma221b@gmail.com';
    
        try {
          const response = await fetch('http://localhost:3001/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, smtpUser, smtpPass, recipientEmail }),
          });
    
          if (response.ok) {
            alert('Email sent successfully!');
            setFormData({ name: '', email: '', message: '' });
          } else {
            alert('Error sending email.');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('Error submitting form.');
        }
      };
    
      return (
        <ContactContainer
          id="contact"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Title variants={itemVariants}>Contact Me</Title>
          <ContactInfo variants={itemVariants}>
            <ContactLink href="mailto:saynam1101@gmail.com" variants={itemVariants}>
              <FaEnvelope />
              saynam1101@gmail.com
            </ContactLink>
          </ContactInfo>
          <SocialIcons variants={itemVariants}>
            <SocialLink href="https://github.com/saynam221b" target="_blank" rel="noopener noreferrer" variants={itemVariants}>
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/saynam-sharma" target="_blank" rel="noopener noreferrer" variants={itemVariants}>
              <FaLinkedin />
            </SocialLink>
          </SocialIcons>
          <Form variants={itemVariants} onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <SubmitButton type="submit">Send</SubmitButton>
          </Form>
        </ContactContainer>
      );
    }
    
    export default Contact;
