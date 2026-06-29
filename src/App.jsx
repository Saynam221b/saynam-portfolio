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
import 'react-toastify/dist/ReactToastify.css';

const THEME_STORAGE_KEY = 'portfolio-theme';

const theme = {
  motion: {
    ease: [0.16, 1, 0.3, 1],
    softEase: [0.22, 1, 0.36, 1],
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Newsreader:opsz,wght@6..72,500;6..72,650&display=swap');

  :root {
    --bg: #07090d;
    --bg-2: #0b1018;
    --surface: rgba(13, 18, 27, 0.84);
    --surface-strong: rgba(18, 25, 37, 0.92);
    --surface-soft: rgba(255, 255, 255, 0.055);
    --line: rgba(255, 255, 255, 0.12);
    --line-soft: rgba(255, 255, 255, 0.075);
    --border: rgba(255, 255, 255, 0.12);
    --border-soft: rgba(255, 255, 255, 0.075);
    --border-strong: rgba(255, 255, 255, 0.2);
    --text: #f6f8ff;
    --text-muted: #b8c1d4;
    --text-subtle: #7e8aa3;
    --accent: #72f6d1;
    --accent-2: #8fb7ff;
    --accent-3: #ffb86b;
    --accent-gradient: linear-gradient(135deg, var(--accent), var(--accent-2) 52%, var(--accent-3));
    --danger-accent: #ff6f91;
    --button-text: #06100d;
    --surface-elev: rgba(13, 18, 27, 0.84);
    --surface-elev-strong: rgba(18, 25, 37, 0.92);
    --shadow: 0 28px 100px rgba(0, 0, 0, 0.38);
    --shadow-soft: 0 18px 55px rgba(0, 0, 0, 0.28);
    --shadow-sm: 0 12px 32px rgba(0, 0, 0, 0.2);
    --shadow-md: 0 22px 70px rgba(0, 0, 0, 0.3);
    --focus-ring: rgba(114, 246, 209, 0.24);
    --font-sans: 'Inter', 'Avenir Next', 'Segoe UI', sans-serif;
    --font-display: 'Newsreader', Georgia, serif;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  }

  :root[data-theme='light'] {
    --bg: #f5f7fb;
    --bg-2: #eef2f8;
    --surface: rgba(255, 255, 255, 0.88);
    --surface-strong: rgba(255, 255, 255, 0.96);
    --surface-soft: rgba(7, 9, 13, 0.05);
    --line: rgba(7, 9, 13, 0.13);
    --line-soft: rgba(7, 9, 13, 0.08);
    --border: rgba(7, 9, 13, 0.13);
    --border-soft: rgba(7, 9, 13, 0.08);
    --border-strong: rgba(7, 9, 13, 0.22);
    --text: #08111d;
    --text-muted: #374357;
    --text-subtle: #536179;
    --accent: #007f68;
    --accent-2: #315ed6;
    --accent-3: #b45f16;
    --danger-accent: #bf315a;
    --button-text: #f8fffd;
    --surface-elev: rgba(255, 255, 255, 0.88);
    --surface-elev-strong: rgba(255, 255, 255, 0.96);
    --shadow: 0 28px 90px rgba(31, 44, 70, 0.16);
    --shadow-soft: 0 18px 45px rgba(31, 44, 70, 0.12);
    --shadow-sm: 0 12px 28px rgba(31, 44, 70, 0.1);
    --shadow-md: 0 22px 60px rgba(31, 44, 70, 0.14);
    --focus-ring: rgba(0, 127, 104, 0.22);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *,
  *::before,
  *::after {
    min-width: 0;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 88px;
    background: var(--bg);
  }

  body {
    min-width: 320px;
    font-family: var(--font-sans);
    background:
      radial-gradient(ellipse at 50% -12%, rgba(143, 183, 255, 0.16), transparent 48%),
      linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 52%, var(--bg) 100%);
    color: var(--text);
    line-height: 1.5;
    overflow-x: hidden;
    overflow-wrap: break-word;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    overflow-x: clip;
  }

  :root[data-theme='dark'] body {
    background:
      linear-gradient(rgba(255, 255, 255, 0.032) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.026) 1px, transparent 1px),
      radial-gradient(ellipse at 50% -12%, rgba(143, 183, 255, 0.16), transparent 48%),
      linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 52%, var(--bg) 100%);
    background-size: 48px 48px, 48px 48px, auto, auto;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  a,
  button,
  input,
  textarea {
    letter-spacing: 0;
  }

  h1,
  h2,
  h3,
  h4 {
    color: var(--text);
    line-height: 0.98;
    overflow-wrap: anywhere;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea {
    font: inherit;
    min-width: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::selection {
    background: rgba(114, 246, 209, 0.28);
    color: var(--text);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* Skip to content link */
  .skip-to-content {
    position: fixed;
    top: -100%;
    left: 1rem;
    z-index: 10000;
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    background: var(--accent);
    color: var(--button-text);
    font-weight: 800;
    font-size: 0.86rem;
    transition: top 0.2s var(--ease-out);
  }

  .skip-to-content:focus {
    top: 1rem;
  }

  .display-serif {
    font-family: var(--font-display);
    font-weight: 650;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.001ms !important;
    }
  }
`;

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
  const { isDarkMode } = useTheme();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);
  const atmosphereY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const atmosphereOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.78, 0.46, 0.22]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('portfolio-loader-seen') === 'true';
    const shouldSkipLoader = new URLSearchParams(window.location.search).has('skipLoader');
    if (hasSeenLoader || shouldSkipLoader || navigator.webdriver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('portfolio-loader-seen', 'true');
      setIsLoading(false);
    }, 760);

    return () => clearTimeout(timer);
  }, []);

  return (
    <EmotionThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          y: atmosphereY,
          opacity: atmosphereOpacity,
          background:
            'linear-gradient(115deg, transparent 0%, rgba(114, 246, 209, 0.12) 28%, transparent 52%, rgba(255, 184, 107, 0.12) 78%, transparent 100%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          transformOrigin: '0% 50%',
          scaleX: progressScale,
          zIndex: 1600,
          background: 'linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))',
          pointerEvents: 'none',
        }}
      />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <motion.main
            key="content"
            id="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <a className="skip-to-content" href="#main-content">Skip to content</a>
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
              hideProgressBar
              newestOnTop
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={isDarkMode ? 'dark' : 'light'}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </EmotionThemeProvider>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark') {
      return true;
    }
    if (stored === 'light') {
      return false;
    }
    return true;
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const contextValue = useMemo(
    () => ({
      isDarkMode,
      toggleTheme: () => setIsDarkMode(prev => !prev),
    }),
    [isDarkMode]
  );

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={contextValue}>
        <AppContent />
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
