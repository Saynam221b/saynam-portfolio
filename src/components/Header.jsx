import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaBars } from 'react-icons/fa';

const HeaderContainer = styled(motion.header)`
  background-color: ${props => props.theme.headerBg};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 100;
  box-shadow: ${props => props.theme.headerShadow};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  ${(props) =>
    props.isScrolled &&
    css`
      background-color: ${props => props.theme.headerBg};
      box-shadow: ${props => props.theme.headerShadow};
    `}
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  margin-right: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: ${props => props.theme.headerBg};
    padding: 1rem;
    align-items: center;
    backdrop-filter: blur(8px);
    border-bottom: 1px solid ${props => props.theme.text.secondary}20;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.headerText};
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Logo = styled.span`
  font-size: 1.7rem;
  font-weight: bold;
  color: ${props => props.theme.headerText};
  letter-spacing: 1px;
`;

const MenuIcon = styled.div`
  display: none;
  color: ${props => props.theme.headerText};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Logo>DataEng</Logo>
      <MenuIcon onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </MenuIcon>
      <Nav isOpen={isOpen}>
        <NavLink 
          to="introduction" 
          smooth={true} 
          duration={500} 
          offset={-80}
          spy={true}
          onClick={handleLinkClick}
        >
          Introduction
        </NavLink>
        <NavLink 
          to="experience" 
          smooth={true} 
          duration={500} 
          offset={-80}
          spy={true}
          onClick={handleLinkClick}
        >
          Experience
        </NavLink>
        <NavLink 
          to="projects" 
          smooth={true} 
          duration={500} 
          offset={-80}
          spy={true}
          onClick={handleLinkClick}
        >
          Projects
        </NavLink>
        <NavLink 
          to="free-time" 
          smooth={true} 
          duration={500} 
          offset={-80}
          spy={true}
          onClick={handleLinkClick}
        >
          Free Time
        </NavLink>
        <NavLink 
          to="contact" 
          smooth={true} 
          duration={500} 
          offset={-80}
          spy={true}
          onClick={handleLinkClick}
        >
          Contact
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
