import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import styled, { ThemeProvider as StyledThemeProvider, createGlobalStyle, keyframes } from 'styled-components';
import Header from './components/Header';
import Introduction from './components/Introduction';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const lightTheme = {
  headerBg: 'rgba(255, 255, 255, 0.85)',
  headerText: '#0f172a',
  headerShadow: '0 2px 10px rgba(15, 23, 42, 0.08)',
  primary: '#0284c7',
  secondary: '#6366f1',
  accent: '#f59e0b',
  toggleBg: '#f1f5f9',
  toggleIcon: '#0f172a',
  mainBg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  contentBg: 'transparent',
  cardBg: 'rgba(255, 255, 255, 0.9)',
  cardHoverBg: 'rgba(255, 255, 255, 0.95)',
  cardShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
  cardHoverShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
  buttonGradient: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)',
  buttonHoverGradient: 'linear-gradient(90deg, #0369a1 0%, #0284c7 100%)',
  text: {
    primary: '#0f172a',
    secondary: '#334155',
    accent: '#0284c7',
    light: '#64748b'
  }
};

const darkTheme = {
  headerBg: 'rgba(15, 23, 42, 0.9)',
  headerText: '#ffffff',
  headerShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  primary: '#38bdf8',
  secondary: '#818cf8',
  accent: '#fbbf24',
  toggleBg: 'rgba(255, 255, 255, 0.05)',
  toggleIcon: '#ffd700',
  mainBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  contentBg: 'transparent',
  cardBg: 'rgba(30, 41, 59, 0.9)',
  cardHoverBg: 'rgba(30, 41, 59, 0.95)',
  cardShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  cardHoverShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
  buttonGradient: 'linear-gradient(90deg, #38bdf8 0%, #7dd3fc 100%)',
  buttonHoverGradient: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)',
  text: {
    primary: '#ffffff',
    secondary: '#cbd5e1',
    accent: '#38bdf8',
    light: '#94a3b8'
  }
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    background: ${props => props.theme.contentBg};
    color: ${props => props.theme.text.primary};
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  ::selection {
    background-color: ${props => props.theme.primary};
    color: #fff;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

// Add transition animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ThemeTransition = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: ${props => props.isDarkMode ? '#111928' : '#ffffff'};
  pointer-events: none;
`;

const AppContainer = styled(motion.div)`
  min-height: 100vh;
  background: ${props => props.theme.mainBg};
  transition: all 0.5s ease;
  position: relative;
  overflow-x: hidden;
  animation: ${fadeIn} 0.5s ease-out;

  & * {
    transition: all 0.3s ease;
  }
`;

const MainContent = styled(motion.main)`
  padding-top: 80px;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  background: ${props => props.theme.mainBg};
  transition: all 0.5s ease;

  & > section {
    margin: 0 auto;
    max-width: 1400px;
    padding: 4rem 2rem;
    animation: ${slideIn} 0.5s ease-out;
    scroll-margin-top: 80px;
  }

  & > section:first-child {
    padding-top: 0;
  }
`;

const ThemeToggleWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 100;
`;

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isThemeChanging, setIsThemeChanging] = useState(false);

  useEffect(() => {
    setIsThemeChanging(true);
    const timeoutId = setTimeout(() => {
      setIsThemeChanging(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsThemeChanging(true);
    toggleTheme();
  };
  
  return (
    <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AnimatePresence mode='wait'>
        {isThemeChanging && (
          <ThemeTransition
            key={isDarkMode ? 'dark' : 'light'}
            isDarkMode={isDarkMode}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ 
              scale: [1.1, 1],
              opacity: [0, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.5,
              times: [0, 0.5, 1]
            }}
          />
        )}
      </AnimatePresence>
      <AppContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <MainContent
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Introduction />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </MainContent>
        <Footer />
        <ThemeToggleWrapper>
          <ThemeToggle onClick={handleThemeToggle} />
        </ThemeToggleWrapper>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </AppContainer>
    </StyledThemeProvider>
  );
}

export default App;