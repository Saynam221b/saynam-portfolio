import React, { useState, useEffect, createContext, useContext, useRef, useCallback, useMemo } from 'react';

// Custom cursor component
const CustomCursor = React.memo(() => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        background: 'rgba(124, 58, 237, 0.9)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 10001, mixBlendMode: 'difference',
        opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s ease',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, width: 32, height: 32,
        border: '1.5px solid rgba(124, 58, 237, 0.4)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 10000,
        opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s ease',
      }} />
    </>
  );
});
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import D3xTRverse from './components/D3xTRverse';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import { SectionProvider } from './context/SectionContext';
import 'react-toastify/dist/ReactToastify.css';

// Define theme
const lightTheme = {
  colors: {
    primary: '#7C3AED', // Vibrant purple
    secondary: '#EC4899', // Pink
    accent: '#3B82F6', // Blue
    background: '#FFFFFF',
    cardBg: '#F9FAFB',
    text: '#1F2937',
    textSecondary: '#4B5563',
    textLight: '#9CA3AF',
    border: '#E5E7EB',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
    card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.9) 100%)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

const darkTheme = {
  colors: {
    primary: '#8B5CF6', // Lighter purple for dark mode
    secondary: '#F472B6', // Lighter pink for dark mode
    accent: '#60A5FA', // Lighter blue for dark mode
    background: '#111827',
    cardBg: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textLight: '#6B7280',
    border: '#374151',
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)',
    card: 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.9) 100%)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

// Global styles
const globalStyles = (theme) => css`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Courier+New&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
    font-size: 15px; /* Reduced base font size */
    scroll-padding-top: 80px; /* Ensures scrolling to sections accounts for fixed header */
    
    @media (max-width: 768px) {
      scroll-padding-top: 60px;
      font-size: 14px; /* Even smaller on mobile */
    }
  }
  
  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
    
    @media (min-width: 768px) {
      cursor: none;
    }
  }
  
  @media (min-width: 768px) {
    a, button, input, textarea, [role="button"] {
      cursor: none;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }
  
  h1 {
    font-size: 2.2rem;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
  
  h2 {
    font-size: 1.8rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  h3 {
    font-size: 1.4rem;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
  
  p, li, a, button, input, textarea, span {
    font-size: 0.95rem;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  button {
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  ::selection {
    background-color: ${theme.colors.primary};
    color: white;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary};
  }
  
  .section {
    padding: 3rem 1.5rem;
    padding-top: calc(3rem + 70px);
    
    @media (max-width: 768px) {
      padding: 2rem 1.5rem;
      padding-top: calc(2rem + 60px);
    }
    
    @media (min-width: ${theme.breakpoints.md}) {
      padding: 4rem 2rem;
      padding-top: calc(4rem + 70px);
    }
    
    @media (min-width: ${theme.breakpoints.lg}) {
      padding: 5rem 2rem;
      padding-top: calc(5rem + 70px);
    }
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .section-title {
    position: relative;
    font-size: 1.8rem;
    margin-bottom: 3rem;
    text-align: center;
    
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -0.75rem;
      transform: translateX(-50%);
      width: 50px;
      height: 4px;
      background: ${theme.gradients.primary};
      border-radius: 2px;
    }
    
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: 2.2rem;
    }
  }

  /* Reduced motion accessibility */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

// Create context for theme
export const ThemeContext = createContext();

// Create context for Gyroscope
export const GyroContext = createContext();

// Create custom hook for accessing theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Create custom hook for accessing Gyro
export const useGyro = () => {
  const context = useContext(GyroContext);
  if (!context) {
    throw new Error('useGyro must be used within a GyroProvider');
  }
  return context;
};

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark Mode
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check user preference only once on initial load
    if (!isInitialized) {
      // Logic to check local storage could go here, but for now we default to true (Dark)
      // If we wanted to respect system pref ONLY if it's explicitly light, we could do:
      // const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      // if (prefersLight) setIsDarkMode(false);

      setIsInitialized(true);
    }
  }, [isInitialized]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  const contextValue = useMemo(() => ({
    isDarkMode,
    toggleTheme
  }), [isDarkMode, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const GyroProvider = ({ children }) => {
  const [isGyroEnabled, setIsGyroEnabled] = useState(false);

  useEffect(() => {
    // Auto-enable on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) {
      setIsGyroEnabled(true);
    }
  }, []);

  const toggleGyro = useCallback(() => {
    // For iOS 13+ devices, permission must be requested via user interaction
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            setIsGyroEnabled(prev => !prev);
          } else {
            console.warn('Gyroscope permission denied');
            alert('Gyroscope permission denied. Please allow motion sensors for full experience.');
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS or older devices don't need explicit permission for motion
      setIsGyroEnabled(prev => !prev);
    }
  }, []);

  const contextValue = useMemo(() => ({
    isGyroEnabled,
    toggleGyro
  }), [isGyroEnabled, toggleGyro]);

  return (
    <GyroContext.Provider value={contextValue}>
      {children}
    </GyroContext.Provider>
  );
};

const ThemeTransition = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: ${props => props.isDarkMode ? 'rgba(17, 24, 39, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
  pointer-events: none;
`;

const MainContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled(motion.main)`
  flex: 1;
`;

const App = React.memo(() => {
  const [isThemeChanging, setIsThemeChanging] = useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <GyroProvider> {/* Wrap app in GyroProvider */}
          <SectionProvider>
            <AppContent
              isThemeChanging={isThemeChanging}
              setIsThemeChanging={setIsThemeChanging}
            />
          </SectionProvider>
        </GyroProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
});

// Floating theme toggle button
const FloatingThemeToggle = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
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
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: ${props => props.theme.shadows.md};
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
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
    z-index: -1;
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

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0, transition: { type: "spring", duration: 0.5 } },
  exit: { scale: 0, rotate: 180, transition: { duration: 0.3 } }
};

function AppContent({ isThemeChanging, setIsThemeChanging }) {
  const { isDarkMode, toggleTheme } = useTheme();
  // We can consume useGyro() here if we want floating Gyro button, 
  // but Header is better for that.

  const theme = useMemo(() => isDarkMode ? darkTheme : lightTheme, [isDarkMode]);
  const prevThemeRef = useRef(isDarkMode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only trigger the theme change animation when the theme actually changes
    // Not on initial render
    if (prevThemeRef.current !== isDarkMode) {
      setIsThemeChanging(true);
      const timeoutId = setTimeout(() => {
        setIsThemeChanging(false);
      }, 300);

      prevThemeRef.current = isDarkMode;
      return () => clearTimeout(timeoutId);
    }
  }, [isDarkMode, setIsThemeChanging]);

  return (
    <EmotionThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />

      <AnimatePresence mode='wait'>
        {isThemeChanging && (
          <ThemeTransition
            key={isDarkMode ? 'dark' : 'light'}
            isDarkMode={isDarkMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader finishLoading={() => setLoading(false)} key="loader" />
        ) : (
          <MainContainer
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CustomCursor />
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/d3xtrverse" element={<D3xTRverse />} />
            </Routes>

            <Footer />

            <ScrollToTop />

            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={isDarkMode ? "dark" : "light"}
            />

            {/* Floating Theme Toggle Button */}
            <FloatingThemeToggle
              onClick={toggleTheme}
              isDarkMode={isDarkMode}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
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
            </FloatingThemeToggle>
          </MainContainer>
        )}
      </AnimatePresence>
    </EmotionThemeProvider>
  );
}

export default App;