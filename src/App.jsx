import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Global, css, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Home from './components/Home';
import D3xTRverse from './components/D3xTRverse';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import { SectionProvider } from './context/SectionContext';
import 'react-toastify/dist/ReactToastify.css';

const theme = {
  colors: {
    primary: '#2B6CF0',
    secondary: '#15B8A6',
    accent: '#0E172E',
    background: '#070E22',
    cardBg: '#0F1B39',
    text: '#F3F6FF',
    textSecondary: '#B5C0E1',
    textLight: '#7F8CB0',
    border: 'rgba(130, 153, 214, 0.28)',
    success: '#14B87A',
    error: '#D74452',
    warning: '#E2A039',
  },
  shadows: {
    sm: '0 2px 10px rgba(2, 6, 20, 0.24)',
    md: '0 12px 30px rgba(2, 6, 20, 0.3)',
    lg: '0 24px 48px rgba(2, 6, 20, 0.4)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #2B6CF0 0%, #15B8A6 100%)',
    surface: 'linear-gradient(180deg, rgba(17, 30, 63, 0.92) 0%, rgba(9, 18, 40, 0.92) 100%)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 84px;
  }

  body {
    font-family: 'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background:
      radial-gradient(circle at 12% 0%, rgba(39, 105, 240, 0.2), transparent 34%),
      radial-gradient(circle at 86% 0%, rgba(20, 177, 166, 0.14), transparent 30%),
      #070e22;
    color: ${theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::selection {
    background: rgba(43, 108, 240, 0.45);
    color: #fff;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;

const GlobalAtmosphere = styledAtmosphere();

function styledAtmosphere() {
  return {
    Layer: motion.div,
  };
}

export const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeContext provider');
  }
  return context;
};

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], ['-8%', '28%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.7, 0.3, 0.1]);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('portfolio-loader-seen') === 'true';
    if (hasSeenLoader || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('portfolio-loader-seen', 'true');
      setIsLoading(false);
    }, 550);

    return () => clearTimeout(timer);
  }, []);

  return (
    <EmotionThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <GlobalAtmosphere.Layer
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          y: glowY,
          opacity: glowOpacity,
          background:
            'radial-gradient(circle at 80% 20%, rgba(68, 156, 255, 0.16), transparent 34%), radial-gradient(circle at 16% 70%, rgba(26, 192, 172, 0.14), transparent 36%)',
        }}
      />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
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
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </motion.main>
        )}
      </AnimatePresence>
    </EmotionThemeProvider>
  );
}

function App() {
  const contextValue = useMemo(
    () => ({
      isDarkMode: true,
      toggleTheme: () => {},
    }),
    []
  );

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={contextValue}>
        <SectionProvider>
          <AppContent />
        </SectionProvider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
