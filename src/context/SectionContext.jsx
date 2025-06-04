import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDocumentTitle } from '../main';

const SectionContext = createContext();

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
};

export const SectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home');
  
  // Map section IDs to proper titles
  const sectionTitles = {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact'
  };
  
  // Update document title based on active section
  useDocumentTitle(sectionTitles[activeSection] || 'Portfolio');
  
  // Function to detect which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      let currentSection = 'home';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export default SectionContext; 