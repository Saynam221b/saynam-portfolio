import React, { useState } from 'react';
    import styled from 'styled-components';
    import { Link } from 'react-scroll';
    import { motion, AnimatePresence } from 'framer-motion';
    import { FaBars } from 'react-icons/fa';
    
    const HeaderContainer = styled(motion.header)`
      background-color: #1a132b;
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
    
      @media (max-width: 768px) {
        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
        flex-direction: column;
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        background-color: #1a132b;
        padding: 1rem;
        align-items: center;
      }
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
    
      @media (max-width: 768px) {
        padding: 0.5rem;
      }
    `;
    
    const Logo = styled(motion.span)`
      font-size: 1.7rem;
      font-weight: bold;
      color: #fff;
      letter-spacing: 1px;
    `;
    
    const MenuIcon = styled(motion.div)`
      display: none;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
    
      @media (max-width: 768px) {
        display: block;
      }
    `;
    
    const headerVariants = {
      hidden: { y: -50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };
    
    const navVariants = {
      hidden: { x: '-100%' },
      visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
      exit: { x: '-100%', transition: { duration: 0.2 } },
    };
    
    function Header() {
      const [isOpen, setIsOpen] = useState(false);
    
      const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    
      return (
        <HeaderContainer
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <Logo>DataEng</Logo>
          <MenuIcon onClick={toggleMenu}>
            <FaBars />
          </MenuIcon>
          <AnimatePresence>
            {isOpen && (
              <Nav
                isOpen={isOpen}
                variants={navVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <NavLink to="introduction" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Introduction</NavLink>
                <NavLink to="experience" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Experience</NavLink>
                <NavLink to="projects" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Projects</NavLink>
                 <NavLink to="free-time" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Free Time</NavLink>
                <NavLink to="contact" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Contact</NavLink>
              </Nav>
            )}
          </AnimatePresence>
        </HeaderContainer>
      );
    }
    
    export default Header;
