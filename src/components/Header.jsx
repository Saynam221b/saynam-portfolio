import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';
import { useTheme, useGyro } from '../App';

const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: ${props => props.isDarkMode ?
    'rgba(17, 24, 39, 0.85)' :
    'rgba(255, 255, 255, 0.85)'
  };
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: ${props => props.theme.shadows.sm};
  transform: translateY(${props => props.isVisible ? '0' : '-100%'});
  transition: transform 0.3s ease, background-color 0.3s ease;
  
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  
  span {
    background: ${props => props.theme.gradients.primary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.gradients.primary};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    
    &:after {
      width: 100%;
    }
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
    
    &:after {
      width: 100%;
    }
  }
`;

const ControlButton = styled.button`
  background: transparent;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    transform: rotate(15deg);
  }
`;

const MobileMenuButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  &:hover {
    background: ${props => props.theme.colors.primary}20;
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: ${props => props.theme.colors.background};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 1.5rem;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  @media (max-width: 350px) {
    width: 100%;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileMenuClose = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary}20;
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MobileNavLink = styled.a`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: 1.25rem;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1000;
`;

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isGyroEnabled, toggleGyro } = useGyro();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
    { name: 'D3xTRverse', href: '/d3xtrverse' }
  ];

  return (
    <>
      <HeaderWrapper isVisible={isVisible} isDarkMode={isDarkMode}>
        <HeaderContainer>
          <Logo href="#home">
            Saynam<span>.</span>
          </Logo>

          <Nav>
            <NavLinks>
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  as={item.href.startsWith('/#') && isHome ? ScrollLink : Link}
                  to={item.href.startsWith('/#') && isHome ? item.href.substring(2) : item.href}
                  href={item.href}
                  smooth={item.href.startsWith('/#') ? true : undefined}
                  duration={500}
                  offset={-70}
                >
                  {item.name}
                </NavLink>
              ))}
            </NavLinks>

            <ControlButton onClick={toggleGyro} active={isGyroEnabled} title="Toggle 3D Gyro Effect">
              <i className="fas fa-mobile-alt" style={{ transform: isGyroEnabled ? 'rotate(0deg)' : 'rotate(0deg)' }}></i>
            </ControlButton>

            <ControlButton onClick={toggleTheme} title="Toggle Dark Mode">
              {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </ControlButton>
          </Nav>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ControlButton className="mobile-only" onClick={toggleGyro} active={isGyroEnabled} style={{ display: 'none' }}>
              <i className="fas fa-mobile-alt"></i>
            </ControlButton>
            <MobileMenuButton onClick={toggleMobileMenu}>
              <i className="fas fa-bars"></i>
            </MobileMenuButton>
          </div>
        </HeaderContainer>
      </HeaderWrapper>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />

            <MobileMenu
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <MobileMenuHeader>
                <Logo href="#home" onClick={toggleMobileMenu}>
                  Saynam<span>.</span>
                </Logo>

                <MobileMenuClose onClick={toggleMobileMenu}>
                  <i className="fas fa-times"></i>
                </MobileMenuClose>
              </MobileMenuHeader>

              <MobileNavLinks>
                {navItems.map((item, index) => (
                  <MobileNavLink
                    key={index}
                    as={item.href.startsWith('/#') && isHome ? ScrollLink : Link}
                    to={item.href.startsWith('/#') && isHome ? item.href.substring(2) : item.href}
                    href={item.href}
                    smooth={item.href.startsWith('/#') ? true : undefined}
                    duration={500}
                    offset={-70}
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </MobileNavLink>
                ))}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <ControlButton onClick={() => { toggleGyro(); toggleMobileMenu(); }} active={isGyroEnabled}>
                    <i className="fas fa-mobile-alt"></i>
                  </ControlButton>
                  <ControlButton onClick={() => { toggleTheme(); toggleMobileMenu(); }} active={isDarkMode}>
                    {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                  </ControlButton>
                </div>
              </MobileNavLinks>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
