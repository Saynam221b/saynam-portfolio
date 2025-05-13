import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const HeaderContainer = styled(motion.header)`
  background-color: ${props => props.theme.headerBg};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: ${props => props.theme.headerShadow};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  ${props => props.isScrolled && css`
    height: 60px;
    background-color: ${props => props.theme.headerBg};
  `}
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.headerText};
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 1rem;

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
    top: ${props => props.isScrolled ? '60px' : '70px'};
    left: 0;
    right: 0;
    background-color: ${props => props.theme.headerBg};
    backdrop-filter: blur(10px);
    padding: 1rem;
    gap: 0.5rem;
    border-bottom: 1px solid ${props => props.isDarkMode ? 
      'rgba(255, 255, 255, 0.1)' : 
      'rgba(15, 23, 42, 0.1)'
    };
    transform-origin: top center;
    box-shadow: ${props => props.theme.headerShadow};
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.headerText};
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
    background-color: ${props => props.isDarkMode ? 
      'rgba(255, 255, 255, 0.1)' : 
      'rgba(15, 23, 42, 0.1)'
    };
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem 1rem;
    text-align: center;
    font-size: 1.1rem;
  }
`;

const MobileNavLink = styled(motion.div)`
  width: 100%;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.headerText};
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isDarkMode ? 
      'rgba(255, 255, 255, 0.1)' : 
      'rgba(15, 23, 42, 0.1)'
    };
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

const navItems = [
  { to: "introduction", label: "Introduction" },
  { to: "experience", label: "Experience" },
  { to: "projects", label: "Projects" },
  { to: "free-time", label: "Free Time" },
  { to: "contact", label: "Contact" }
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const NavLinks = ({ onClick, isMobile }) => (
    <>
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          smooth={true}
          duration={500}
          offset={-70}
          spy={true}
          onClick={onClick}
          isDarkMode={isDarkMode}
        >
          {label}
        </NavLink>
      ))}
    </>
  );

  return (
    <HeaderContainer isScrolled={isScrolled} isDarkMode={isDarkMode}>
      <Logo>DataEng</Logo>
      <NavContainer>
        <DesktopNav>
          <NavLinks />
        </DesktopNav>
        <MenuButton 
          onClick={() => setIsOpen(!isOpen)}
          isDarkMode={isDarkMode}
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
            isDarkMode={isDarkMode}
          >
            <NavLinks onClick={() => setIsOpen(false)} />
          </MobileNav>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
}

export default Header;
