import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${props => props.theme.headerBg};
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  box-shadow: ${props => props.theme.headerShadow};
  transition: all 0.3s ease;
  transform: translateY(${props => props.isVisible ? '0' : '-100%'});
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const LogoHighlight = styled.span`
  color: ${props => props.theme.primary};
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(ScrollLink)`
  color: ${props => props.theme.text.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 0;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 101;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(20px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(ScrollLink)`
  color: ${props => props.theme.text.primary};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
    transform: translateY(-2px);
  }
`;

const ContactButton = styled.a`
  background: ${props => props.theme.buttonGradient};
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(2, 132, 199, 0.3);
    background: ${props => props.theme.buttonHoverGradient};
  }
`;

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const linkVariants = {
  closed: { opacity: 0, y: 20 },
  open: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { isDarkMode } = useTheme();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Show header when scrolling up or at the top
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);
  
  const navItems = [
    { name: "Home", to: "introduction" },
    { name: "Skills", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
  ];
  
  return (
    <HeaderContainer isVisible={visible}>
      <HeaderContent>
        <Logo>
          <img src="/logo.png" alt="Logo" />
          <div>
            Saynam<LogoHighlight>.</LogoHighlight>
          </div>
        </Logo>
        
        <NavLinks>
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              activeClass="active"
            >
              {item.name}
            </NavLink>
          ))}
          <ContactButton href="#contact">Contact Me</ContactButton>
        </NavLinks>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </MobileMenuButton>
      </HeaderContent>
      
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {navItems.map((item, index) => (
              <MobileNavLink
                key={index}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                custom={index}
                variants={linkVariants}
                initial="closed"
                animate="open"
                onClick={closeMenu}
              >
                {item.name}
              </MobileNavLink>
            ))}
            <MobileNavLink
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              custom={navItems.length}
              variants={linkVariants}
              initial="closed"
              animate="open"
              onClick={closeMenu}
            >
              Contact
            </MobileNavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
}

export default Header;
