import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaLaptopCode } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const HeaderContainer = styled(motion.header)`
  background-color: ${props => props.theme.headerBg};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  box-shadow: ${props => props.theme.headerShadow};
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;

  ${props => props.isScrolled && css`
    height: 65px;
    padding: 0 2.5rem;
    background-color: ${props => props.theme.headerBg};
  `}
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const LogoIcon = styled.div`
  font-size: 1.8rem;
  color: ${props => props.theme.primary};
`;

const Logo = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${props => props.theme.headerText};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 50%;
    height: 3px;
    background: ${props => props.theme.primary};
    border-radius: 3px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled(motion.nav)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: ${props => props.isScrolled ? '65px' : '80px'};
    left: 0;
    right: 0;
    background-color: ${props => props.theme.headerBg};
    backdrop-filter: blur(10px);
    padding: 1rem;
    gap: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.text.primary}10;
    transform-origin: top center;
    box-shadow: ${props => props.theme.headerShadow};
  }
`;

const NavLinkContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.headerText};
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover {
    color: ${props => props.active ? 'white' : props.theme.primary};
  }
  
  ${props => props.active && css`
    color: white;
    font-weight: 600;
  `}

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.9rem 1.2rem;
    text-align: center;
    font-size: 1.1rem;
    border-radius: 8px;
  }
`;

const NavLinkBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.primary};
  border-radius: 30px;
  z-index: -1;
  
  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const MobileNavLink = styled(motion.div)`
  width: 100%;
`;

const MenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.headerText};
  cursor: pointer;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.text.primary}10;
    border-radius: 50%;
    z-index: -1;
    transform: scale(0);
    transition: all 0.3s ease;
  }

  &:hover::before {
    transform: scale(1);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

const ContactButton = styled(motion.a)`
  background-color: ${props => props.theme.primary};
  color: white;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 2px solid ${props => props.theme.primary};
  box-shadow: 0 4px 8px ${props => props.theme.primary}40;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px ${props => props.theme.primary}50;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const navItems = [
  { to: "introduction", label: "Home" },
  { to: "experience", label: "Experience" },
  { to: "projects", label: "Projects" },
  { to: "free-time", label: "Activities" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("introduction");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    
    const handleScrollSpy = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.pageYOffset + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        
        if (scrollPosition >= sectionTop && 
            scrollPosition < sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollSpy);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, []);

  const mobileNavVariants = {
    hidden: {
      clipPath: "inset(0 0 100% 0)",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren"
      }
    },
    visible: {
      clipPath: "inset(0 0 0 0)",
      transition: {
        type: "tween",
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    }
  };

  const linkVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const MotionNavLinks = ({ onClick, isMobile }) => (
    <>
      {navItems.map(({ to, label }) => {
        const isActive = activeLink === to;
        
        return (
          <NavLinkContainer key={to}>
            <NavLink
              to={to}
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              onClick={onClick}
              active={isActive}
            >
              {label}
            </NavLink>
            {isActive && (
              <NavLinkBackground 
                layoutId="navbar-indicator"
                transition={{ 
                  type: "spring", 
                  duration: 0.6, 
                  bounce: 0.25 
                }}
              />
            )}
          </NavLinkContainer>
        );
      })}
    </>
  );

  return (
    <HeaderContainer 
      isScrolled={isScrolled} 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <LogoContainer
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <LogoIcon>
          <FaLaptopCode />
        </LogoIcon>
        <Logo>Saynam</Logo>
      </LogoContainer>
      
      <NavContainer>
        <DesktopNav>
          <MotionNavLinks />
        </DesktopNav>
        
        <ContactButton 
          href="#contact"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me
        </ContactButton>
        
        <MenuButton 
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
      </NavContainer>
      
      <AnimatePresence>
        {isOpen && (
          <MobileNav
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileNavVariants}
            isScrolled={isScrolled}
          >
            <MotionNavLinks onClick={() => setIsOpen(false)} isMobile={true} />
            
            <NavLinkContainer>
              <NavLink
                to="contact"
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                onClick={() => setIsOpen(false)}
                active={activeLink === "contact"}
              >
                Contact
              </NavLink>
              {activeLink === "contact" && (
                <NavLinkBackground 
                  layoutId="navbar-indicator"
                  transition={{ 
                    type: "spring", 
                    duration: 0.6, 
                    bounce: 0.25 
                  }}
                />
              )}
            </NavLinkContainer>
          </MobileNav>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
}

export default Header;
