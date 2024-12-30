import React, { useState, useEffect } from 'react';
    import styled, { css } from 'styled-components';
    import { Link } from 'react-scroll';
    import { motion, useAnimation } from 'framer-motion';
    import { FaBars } from 'react-icons/fa';
    
    const HeaderContainer = styled(motion.header)`
      background-color: transparent;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: backdrop-filter 0.3s ease;
    
      ${(props) =>
        props.isScrolled &&
        css`
          backdrop-filter: blur(2px);
        `}
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
        background-color: transparent;
        backdrop-filter: blur(2px);
        padding: 1rem;
        align-items: center;
        opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
        transform-origin: top;
        transform: ${({ isOpen }) =>
          isOpen
            ? 'translateY(0) rotateX(0deg) scaleY(1)'
            : 'translateY(-20px) rotateX(-45deg) scaleY(0.8)'};
        transition: opacity 0.3s ease, transform 0.3s ease, backdrop-filter 0.3s ease;
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
      const [isScrolled, setIsScrolled] = useState(false);
      const navAnimation = useAnimation();
    
      const toggleMenu = async () => {
        setIsOpen(!isOpen);
        if (isOpen) {
          await navAnimation.start({ opacity: 0, translateY: '-20px', rotateX: '-45deg', scaleY: 0.8 });
        } else {
          await navAnimation.start({ opacity: 1, translateY: '0', rotateX: '0deg', scaleY: 1 });
        }
      };
    
      useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.pageYOffset;
          setIsScrolled(scrollTop > 50);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      return (
        <HeaderContainer
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          isScrolled={isScrolled}
        >
          <Logo>DataEng</Logo>
          <MenuIcon onClick={toggleMenu}>
            <FaBars />
          </MenuIcon>
          <Nav
            isOpen={isOpen}
            variants={navVariants}
            initial="hidden"
            animate={isOpen ? "visible" : ""}
            exit="exit"
            style={{ transformOrigin: 'top' }}
          >
            <NavLink to="introduction" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Introduction</NavLink>
            <NavLink to="experience" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Experience</NavLink>
            <NavLink to="projects" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Projects</NavLink>
             <NavLink to="free-time" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Free Time</NavLink>
            <NavLink to="contact" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Contact</NavLink>
          </Nav>
        </HeaderContainer>
      );
    }
    
    export default Header;
