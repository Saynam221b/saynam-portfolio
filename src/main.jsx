import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Create a custom hook for updating document title
export const useDocumentTitle = (title) => {
  React.useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Saynam Sharma`;
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
