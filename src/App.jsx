import React from 'react';
    import styled from 'styled-components';
    import Header from './components/Header';
    import Introduction from './components/Introduction';
    import Experience from './components/Experience';
    import Projects from './components/Projects';
    import FreeTimeActivities from './components/FreeTimeActivities';
    import Contact from './components/Contact';
    import { motion } from 'framer-motion';
    
    const AppContainer = styled(motion.div)`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    `;
    
    const MainContent = styled(motion.main)`
      flex: 1;
      padding: 20px;
      position: relative;
      z-index: 1;
    `;
    
    const pageVariants = {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
    };
    
    function App() {
      return (
        <AppContainer
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          <Header />
          <MainContent>
            <Introduction />
            <Experience />
            <Projects />
            <FreeTimeActivities />
            <Contact />
          </MainContent>
        </AppContainer>
      );
    }
    
    export default App;
