import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import ScrollFilmStage from './ScrollFilmStage';
import CredentialsStrip from './CredentialsStrip';
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
import Skills from './Skills';
import Contact from './Contact';

const Page = styled(motion.div)`
  overflow: visible;
`;

const Home = () => {
  return (
    <Page initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <ScrollFilmStage />
      <CredentialsStrip />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </Page>
  );
};

export default Home;
