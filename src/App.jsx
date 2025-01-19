import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import styled, { ThemeProvider as StyledThemeProvider, createGlobalStyle, keyframes } from 'styled-components';
import Header from './components/Header';
import Introduction from './components/Introduction';
import Experience from './components/Experience';
import Projects from './components/Projects';
import FreeTimeActivities from './components/FreeTimeActivities';
import Contact from './components/Contact';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';

const lightTheme = {
  headerBg: 'rgba(255, 255, 255, 0.85)',
  headerText: '#0f172a',
  headerShadow: '0 2px 4px rgba(15, 23, 42, 0.06)',
  primary: '#0284c7',
  toggleBg: '#f1f5f9',
  toggleIcon: '#0f172a',
  mainBg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  contentBg: 'transparent',
  cardBg: 'rgba(255, 255, 255, 0.85)',
  cardHoverBg: 'rgba(255, 255, 255, 0.95)',
  cardShadow: '0 4px 6px rgba(15, 23, 42, 0.04), 0 2px 4px rgba(15, 23, 42, 0.03)',
  cardHoverShadow: '0 10px 15px rgba(15, 23, 42, 0.06), 0 4px 6px rgba(15, 23, 42, 0.04)',
  text: {
    primary: '#0f172a',
    secondary: '#334155',
    accent: '#0284c7'
  }
};

const darkTheme = {
  headerBg: 'rgba(15, 23, 42, 0.85)',
  headerText: '#ffffff',
  headerShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  primary: '#0284c7',
  toggleBg: 'rgba(255, 255, 255, 0.05)',
  toggleIcon: '#ffd700',
  mainBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  contentBg: 'transparent',
  cardBg: 'rgba(30, 41, 59, 0.85)',
  cardHoverBg: 'rgba(30, 41, 59, 0.95)',
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  cardHoverShadow: '0 10px 15px rgba(0, 0, 0, 0.15)',
  text: {
    primary: '#ffffff',
    secondary: '#cbd5e1',
    accent: '#38bdf8'
  }
};

const GlobalStyle = createGlobalStyle`
  ::selection {
    background-color: ${props => props.theme.primary};
    color: #fff;
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
    padding: 2rem;
    animation: ${slideIn} 0.5s ease-out;
  }

  & > section:not(:last-child) {
    padding-bottom: 4rem;
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
  const { isDarkMode } = useTheme();
  
  return (
    <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AnimatePresence mode='wait'>
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
          <Experience />
          <Projects />
          <FreeTimeActivities />
          <Contact />
        </MainContent>
        <ThemeToggleWrapper>
          <ThemeToggle />
        </ThemeToggleWrapper>
      </AppContainer>
    </StyledThemeProvider>
  );
}

export default App;