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
  headerBg: 'rgba(255, 255, 255, 0.98)',
  headerText: '#2d3436',
  headerShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  primary: '#00bcd4',
  toggleBg: '#ffffff',
  toggleIcon: '#1a132b',
  mainBg: '#ffffff',
  contentBg: '#ffffff',
  cardBg: '#ffffff',
  cardHoverBg: '#ffffff',
  cardShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  cardHoverShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  text: {
    primary: '#2d3436',
    secondary: '#636e72',
    accent: '#00bcd4'
  }
};

const darkTheme = {
  headerBg: 'rgba(17, 25, 40, 0.98)',
  headerText: '#ffffff',
  headerShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  primary: '#00bcd4',
  toggleBg: 'rgba(255, 255, 255, 0.05)',
  toggleIcon: '#ffd700',
  mainBg: 'linear-gradient(135deg, #111928 0%, #1f2937 100%)',
  contentBg: 'transparent',
  cardBg: 'rgba(17, 25, 40, 0.7)',
  cardHoverBg: 'rgba(17, 25, 40, 0.9)',
  cardShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
  cardHoverShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  text: {
    primary: '#ffffff',
    secondary: '#cbd5e1',
    accent: '#00bcd4'
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