import React from 'react';
    import styled from 'styled-components';
    import { Link } from 'react-scroll';
    import { motion } from 'framer-motion';
    
    const HeaderContainer = styled(motion.header)`
      background-color: #334155;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;
    
    const Nav = styled(motion.nav)`
      display: flex;
      gap: 20px;
    `;
    
    const NavLink = styled(Link)`
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      cursor: pointer;
      transition: color 0.3s ease;
      position: relative;
    
      &:hover {
        color: #00bcd4;
      }
    
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #00bcd4;
        transition: width 0.3s ease;
      }
    
      &:hover::after {
        width: 100%;
      }
    `;
    
    const Logo = styled(motion.span)`
      font-size: 1.7rem;
      font-weight: bold;
      color: #fff;
      letter-spacing: 1px;
    `;
    
    const headerVariants = {
      hidden: { y: -50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };
    
    function Header() {
      return (
        <HeaderContainer
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <Logo>DataEng</Logo>
          <Nav>
            <NavLink to="introduction" smooth={true} duration={500}>Introduction</NavLink>
            <NavLink to="experience" smooth={true} duration={500}>Experience</NavLink>
            <NavLink to="projects" smooth={true} duration={500}>Projects</NavLink>
             <NavLink to="free-time" smooth={true} duration={500}>Free Time</NavLink>
            <NavLink to="contact" smooth={true} duration={500}>Contact</NavLink>
          </Nav>
        </HeaderContainer>
      );
    }
    
    export default Header;
