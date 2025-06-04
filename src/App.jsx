import React, { useState, useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
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
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }
  
  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
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
    padding: 5rem 1.5rem;
    
    @media (min-width: ${theme.breakpoints.md}) {
      padding: 6rem 2rem;
    }
    
    @media (min-width: ${theme.breakpoints.lg}) {
      padding: 8rem 2rem;
    }
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .section-title {
    position: relative;
    font-size: 2rem;
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
      font-size: 2.5rem;
    }
  }
`;

const ThemeContext = React.createContext();

export const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check user preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeTransition = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: ${props => props.isDarkMode ? '#111827' : '#FFFFFF'};
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

function App() {
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  
  return (
    <ThemeProvider>
      <AppContent 
        isThemeChanging={isThemeChanging}
        setIsThemeChanging={setIsThemeChanging}
      />
    </ThemeProvider>
  );
}

function AppContent({ isThemeChanging, setIsThemeChanging }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  useEffect(() => {
    if (toggleTheme) {
      setIsThemeChanging(true);
      const timeoutId = setTimeout(() => {
        setIsThemeChanging(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isDarkMode, setIsThemeChanging, toggleTheme]);
  
  return (
    <EmotionThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />
      
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
      
      <MainContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        
        <Main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </Main>
        
        <Footer />
        
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
      </MainContainer>
    </EmotionThemeProvider>
  );
}

export default App;