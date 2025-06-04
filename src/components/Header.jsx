import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { useTheme } from '../App';

const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${props => props.isDarkMode ? 
    'rgba(17, 24, 39, 0.8)' : 
    'rgba(255, 255, 255, 0.8)'
  };
  backdrop-filter: blur(10px);
  z-index: 100;
  box-shadow: ${props => props.theme.shadows.sm};
  transform: translateY(${props => props.isVisible ? '0' : '-100%'});
  transition: transform 0.3s ease, background-color 0.3s ease;
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
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  
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

const ThemeToggle = styled(motion.button)`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${props => props.isDarkMode ? 
    'linear-gradient(135deg, #1F2937 0%, #374151 100%)' : 
    'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)'
  };
  border: 2px solid ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(0, 0, 0, 0.05)'
  };
  color: ${props => props.isDarkMode ? '#F9FAFB' : '#4B5563'};
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.isDarkMode ? 
    '0 0 10px rgba(255, 255, 255, 0.1)' : 
    '0 0 10px rgba(0, 0, 0, 0.1)'
  };
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.isDarkMode ? 
      '0 0 15px rgba(255, 255, 255, 0.2)' : 
      '0 0 15px rgba(0, 0, 0, 0.2)'
    };
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -1;
    background: ${props => props.theme.gradients.primary};
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 0.3;
  }
`;

const ThemeIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MobileMenuButton = styled.button`
  width: 40px;
  height: 40px;
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
  width: 300px;
  background: ${props => props.theme.colors.background};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 2rem;
  z-index: 101;
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileMenuClose = styled.button`
  width: 40px;
  height: 40px;
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
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileThemeToggle = styled(ThemeToggle)`
  margin: 1.5rem 0 0 0;
  align-self: flex-start;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 100;
`;

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0, transition: { type: "spring", duration: 0.5 } },
  exit: { scale: 0, rotate: 180, transition: { duration: 0.3 } }
};

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
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
                  href={item.href}
                >
                  {item.name}
                </NavLink>
              ))}
            </NavLinks>
            
            <ThemeToggle 
              onClick={toggleTheme} 
              isDarkMode={isDarkMode}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <ThemeIcon
                    key="sun"
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <i className="fas fa-sun"></i>
                  </ThemeIcon>
                ) : (
                  <ThemeIcon
                    key="moon"
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <i className="fas fa-moon"></i>
                  </ThemeIcon>
                )}
              </AnimatePresence>
            </ThemeToggle>
          </Nav>
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </MobileMenuButton>
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
                    href={item.href}
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </MobileNavLink>
                ))}
              </MobileNavLinks>
              
              <MobileThemeToggle 
                onClick={toggleTheme} 
                isDarkMode={isDarkMode}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <ThemeIcon
                      key="sun"
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <i className="fas fa-sun"></i>
                    </ThemeIcon>
                  ) : (
                    <ThemeIcon
                      key="moon"
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <i className="fas fa-moon"></i>
                    </ThemeIcon>
                  )}
                </AnimatePresence>
              </MobileThemeToggle>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
