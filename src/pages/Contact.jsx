import React from 'react';
    import styled from 'styled-components';
    import { motion } from 'framer-motion';
    import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
    
    const ContactContainer = styled(motion.div)`
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
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
    
    const ContactLink = styled.a`
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
    
    const SocialLink = styled.a`
      color: #fff;
      transition: color 0.3s ease;
    
      &:hover {
        color: #00bcd4;
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
      return (
        <ContactContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={itemVariants}>Contact Me</Title>
          <ContactInfo variants={itemVariants}>
            <ContactLink href="mailto:saynamsharma221b@gmail.com">
              <FaEnvelope />
              saynamsharma221b@gmail.com
            </ContactLink>
          </ContactInfo>
          <SocialIcons variants={itemVariants}>
            <SocialLink href="https://github.com/saynam221b" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/saynam-sharma" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
          </SocialIcons>
        </ContactContainer>
      );
    }
    
    export default Contact;
