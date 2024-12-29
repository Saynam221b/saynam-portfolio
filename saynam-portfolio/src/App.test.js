import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with navigation links', () => {
  render(<App />);
  const homeLink = screen.getByText(/home/i);
  const profileLink = screen.getByText(/profile/i);
  const experienceLink = screen.getByText(/experience/i);
  const projectsLink = screen.getByText(/projects/i);
  const contactLink = screen.getByText(/contact/i);
  
  expect(homeLink).toBeInTheDocument();
  expect(profileLink).toBeInTheDocument();
  expect(experienceLink).toBeInTheDocument();
  expect(projectsLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
});

test('renders footer with contact information', () => {
  render(<App />);
  const contactInfo = screen.getByText(/contact: saynam1101@gmail.com/i);
  expect(contactInfo).toBeInTheDocument();
});