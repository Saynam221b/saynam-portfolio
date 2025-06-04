import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: ${props => props.theme.headerBg};
  backdrop-filter: blur(10px);
  padding: 3rem 2rem 2rem;
  color: ${props => props.theme.text.secondary};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLogo = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.text.primary};
  margin-bottom: 1.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a`
  color: ${props => props.theme.text.secondary};
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.text.secondary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: ${props => props.theme.text.light};
  opacity: 0.1;
  margin: 1.5rem 0;
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.text.light};
  text-align: center;
`;

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>Saynam Sharma</FooterLogo>
        
        <FooterLinks>
          <FooterLink href="#introduction">Home</FooterLink>
          <FooterLink href="#skills">Skills</FooterLink>
          <FooterLink href="#experience">Experience</FooterLink>
          <FooterLink href="#projects">Projects</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterLinks>
        
        <SocialLinks>
          <SocialLink 
            href="https://www.linkedin.com/in/saynam-sharma/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
          >
            <i className="fab fa-linkedin"></i>
          </SocialLink>
          <SocialLink 
            href="https://github.com/Saynam221b" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
          >
            <i className="fab fa-github"></i>
          </SocialLink>
          <SocialLink 
            href="mailto:saynam1101@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
          >
            <i className="fas fa-envelope"></i>
          </SocialLink>
        </SocialLinks>
        
        <Divider />
        
        <Copyright>
          © {currentYear} Saynam Sharma. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
