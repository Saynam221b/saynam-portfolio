import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';
import AnimatedSection from './AnimatedSection';

const gradientLine = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FooterWrapper = styled.footer`
  background-color: ${props => props.isDarkMode
    ? 'rgba(17, 24, 39, 0.8)'
    : 'rgba(249, 250, 251, 0.9)'
  };
  backdrop-filter: blur(10px);
  padding: 4rem 1.5rem 2rem;
  position: relative;
  
  /* Animated gradient line at top */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.secondary},
      ${props => props.theme.colors.accent},
      ${props => props.theme.colors.primary}
    );
    background-size: 300% 100%;
    animation: ${gradientLine} 6s ease infinite;
  }
  
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
  font-size: 0.9rem;
  line-height: 1.7;
`;

const FooterSocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const FooterSocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.04)'
  };
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.gradients.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const FooterNavSection = styled.div`
  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.85rem;
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
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.9rem;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
      transform: translateX(5px);
    }
    
    i {
      font-size: 0.75rem;
      color: ${props => props.theme.colors.textLight};
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(0, 0, 0, 0.06)'
  };
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterCopyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 0;
  }
`;

const MadeWith = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.8rem;
  
  i {
    color: #ef4444;
    margin: 0 0.25rem;
  }
`;

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper isDarkMode={isDarkMode}>
      <AnimatedSection animation="fadeUp" threshold={0.1}>
      <FooterContainer>
        <FooterTop>
          <FooterInfo>
            <FooterLogo href="#home">
              Saynam<span>.</span>
            </FooterLogo>
            <FooterDescription>
              Hybrid data and web product engineer focused on resilient ETL platforms, modern React interfaces, and freelance-ready delivery.
            </FooterDescription>
            <FooterSocialLinks>
              <FooterSocialLink
                href="https://www.linkedin.com/in/saynam-sharma/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn profile"
                isDarkMode={isDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-linkedin-in"></i>
              </FooterSocialLink>

              <FooterSocialLink
                href="https://github.com/Saynam221b"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub profile"
                isDarkMode={isDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-github"></i>
              </FooterSocialLink>

              <FooterSocialLink
                href="mailto:saynam1101@gmail.com"
                aria-label="Send an email"
                isDarkMode={isDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-envelope"></i>
              </FooterSocialLink>

              <FooterSocialLink
                href="https://twitter.com/saynam_sharma"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open X profile"
                isDarkMode={isDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-twitter"></i>
              </FooterSocialLink>

              <FooterSocialLink
                href="https://d3xtrverse.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open D3xTRverse site"
                isDarkMode={isDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-gamepad"></i>
              </FooterSocialLink>
            </FooterSocialLinks>
          </FooterInfo>

          <FooterNavSection>
            <h3>Navigation</h3>
            <FooterNavLinks>
              <FooterNavLink><a href="/#home">Home</a></FooterNavLink>
              <FooterNavLink><a href="/#services">Services</a></FooterNavLink>
              <FooterNavLink><a href="/#outcomes">Outcomes</a></FooterNavLink>
              <FooterNavLink><a href="/#projects">Case Studies</a></FooterNavLink>
              <FooterNavLink><a href="/#experience">Credibility</a></FooterNavLink>
              <FooterNavLink><a href="/#contact">Contact</a></FooterNavLink>
            </FooterNavLinks>
          </FooterNavSection>

          <FooterNavSection>
            <h3>Contact</h3>
            <FooterNavLinks>
              <FooterNavLink>
                <a href="mailto:saynam1101@gmail.com">
                  <i className="fas fa-envelope"></i> saynam1101@gmail.com
                </a>
              </FooterNavLink>
              <FooterNavLink>
                <a href="/#contact">
                  <i className="fas fa-map-marker-alt"></i> Jammu, India
                </a>
              </FooterNavLink>
            </FooterNavLinks>
          </FooterNavSection>
        </FooterTop>

        <FooterBottom isDarkMode={isDarkMode}>
          <FooterCopyright>
            © {currentYear} Saynam Sharma. All rights reserved.
          </FooterCopyright>
          <MadeWith>
            Built with <i className="fas fa-heart"></i> for data and product impact
          </MadeWith>
        </FooterBottom>
      </FooterContainer>
      </AnimatedSection>
    </FooterWrapper>
  );
};

export default Footer;
