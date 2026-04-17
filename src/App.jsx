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
    primary: '#2f6dff',
    secondary: '#18b6a4',
    accent: '#b8cbff',
    background: '#060b1a',
    surface: '#0d1733',
    text: '#f6f8ff',
    textSecondary: '#b6c4e9',
    textLight: '#7f93c2',
    border: 'rgba(144, 168, 227, 0.26)',
  },
  shadows: {
    sm: '0 8px 20px rgba(3, 8, 26, 0.28)',
    md: '0 16px 36px rgba(3, 8, 26, 0.36)',
    lg: '0 26px 60px rgba(3, 8, 26, 0.48)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #2f6dff 0%, #18b6a4 100%)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

const globalStyles = css`
  :root {
    --bg: #060b1a;
    --surface: #0d1733;
    --surface-soft: rgba(14, 27, 57, 0.56);
    --border: rgba(144, 168, 227, 0.26);
    --text: #f6f8ff;
    --text-muted: #b6c4e9;
    --accent: #2f6dff;
    --accent-2: #18b6a4;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 84px;
    background: var(--bg);
  }

  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background:
      radial-gradient(circle at 8% -10%, rgba(53, 108, 255, 0.16), transparent 32%),
      radial-gradient(circle at 92% 0%, rgba(24, 182, 164, 0.14), transparent 32%),
      var(--bg);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4 {
    letter-spacing: -0.02em;
    line-height: 1.06;
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
    background: rgba(47, 109, 255, 0.42);
    color: #fff;
  }

  .display-serif {
    font-family: 'Instrument Serif', Georgia, serif;
    letter-spacing: -0.012em;
    font-weight: 400;
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
  return { Layer: motion.div };
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
  const washY = useTransform(scrollYProgress, [0, 1], ['-10%', '26%']);
  const washOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 0.32, 0.1]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.16, 0.06]);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('portfolio-loader-seen') === 'true';
    if (hasSeenLoader || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('portfolio-loader-seen', 'true');
      setIsLoading(false);
    }, 620);

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
          y: washY,
          opacity: washOpacity,
          background:
            'radial-gradient(circle at 76% 18%, rgba(88, 153, 255, 0.28), transparent 34%), radial-gradient(circle at 14% 72%, rgba(35, 183, 170, 0.2), transparent 38%)',
        }}
      />
      <GlobalAtmosphere.Layer
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: gridOpacity,
          backgroundImage:
            'linear-gradient(rgba(145, 168, 230, 0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(145, 168, 230, 0.32) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(circle at 50% 28%, rgba(0,0,0,0.45), transparent 74%)',
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
            transition={{ duration: 0.36 }}
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
