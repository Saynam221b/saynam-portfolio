import React, { createContext, useContext } from 'react';

/**
 * Minimal section context — provides a hook interface
 * for components that need section awareness.
 * Active section tracking is handled by Header.jsx directly.
 */
const SectionContext = createContext({ activeSection: 'home' });

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
};

export const SectionProvider = ({ children }) => {
  return (
    <SectionContext.Provider value={{ activeSection: 'home' }}>
      {children}
    </SectionContext.Provider>
  );
};

export default SectionContext;