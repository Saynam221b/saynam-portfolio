import React from 'react';
import styled from 'styled-components';
import Introduction from './Introduction';
import Experience from './Experience';
import Projects from './Projects';
import FreeTimeActivities from './FreeTimeActivities';
import Contact from './Contact';

const HomeContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

function Home() {
  return (
    <HomeContainer>
      <Introduction />
      <Experience />
      <Projects />
      <FreeTimeActivities />
      <Contact />
    </HomeContainer>
  );
}

export default Home;
