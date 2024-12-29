import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticlesBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;