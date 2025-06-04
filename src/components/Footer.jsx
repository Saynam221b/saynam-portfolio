import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.cardBg};
  padding: 4rem 1.5rem 2rem;
  position: relative;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 5rem 2rem 2rem;
  }
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const FooterInfo = styled.div`
  max-width: 400px;
`;

const FooterLogo = styled.a`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  display: inline-block;
  text-decoration: none;
  
  span {
    background: ${props => props.theme.gradients.primary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const FooterSocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const FooterSocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.gradients.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const FooterNavSection = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1.5rem;
  }
`;

const FooterNavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterNavLink = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: ${props => props.theme.colors.textSecondary};
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
      transform: translateX(5px);
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterCopyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 0;
  }
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterBottomLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterTop>
          <FooterInfo>
            <FooterLogo href="#home">
              Saynam<span>.</span>
            </FooterLogo>
            <FooterDescription>
              Data Engineer and Full Stack Developer specializing in building robust data pipelines and creating scalable web applications.
            </FooterDescription>
            <FooterSocialLinks>
              <FooterSocialLink 
                href="https://www.linkedin.com/in/saynam-sharma/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-linkedin-in"></i>
              </FooterSocialLink>
              
              <FooterSocialLink 
                href="https://github.com/Saynam221b" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-github"></i>
              </FooterSocialLink>
              
              <FooterSocialLink 
                href="mailto:saynam1101@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-envelope"></i>
              </FooterSocialLink>
              
              <FooterSocialLink 
                href="https://twitter.com/saynam_sharma" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-twitter"></i>
              </FooterSocialLink>
            </FooterSocialLinks>
          </FooterInfo>
          
          <FooterNavSection>
            <h3>Navigation</h3>
            <FooterNavLinks>
              <FooterNavLink>
                <a href="#home">Home</a>
              </FooterNavLink>
              <FooterNavLink>
                <a href="#about">About</a>
              </FooterNavLink>
              <FooterNavLink>
                <a href="#skills">Skills</a>
              </FooterNavLink>
              <FooterNavLink>
                <a href="#experience">Experience</a>
              </FooterNavLink>
              <FooterNavLink>
                <a href="#projects">Projects</a>
              </FooterNavLink>
              <FooterNavLink>
                <a href="#contact">Contact</a>
              </FooterNavLink>
            </FooterNavLinks>
          </FooterNavSection>
          
          <FooterNavSection>
            <h3>Contact</h3>
            <FooterNavLinks>
              <FooterNavLink>
                <a href="mailto:saynam1101@gmail.com">
                  <i className="fas fa-envelope mr-2"></i> saynam1101@gmail.com
                </a>
              </FooterNavLink>
              <FooterNavLink>
                <a href="tel:+919419271101">
                  <i className="fas fa-phone mr-2"></i> +91 9419271101
                </a>
              </FooterNavLink>
              <FooterNavLink>
                <a href="#contact">
                  <i className="fas fa-map-marker-alt mr-2"></i> Jammu, India
                </a>
              </FooterNavLink>
            </FooterNavLinks>
          </FooterNavSection>
        </FooterTop>
        
        <FooterBottom>
          <FooterCopyright>
            © {currentYear} Saynam Sharma. All rights reserved.
          </FooterCopyright>
          
          <FooterBottomLinks>
            <FooterBottomLink href="#">Privacy Policy</FooterBottomLink>
            <FooterBottomLink href="#">Terms of Service</FooterBottomLink>
          </FooterBottomLinks>
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
