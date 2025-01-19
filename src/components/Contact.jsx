import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const ContactContainer = styled.section`
  padding: 4rem 2rem;
  background: transparent;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text.primary};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
`;

const ContactContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const ContactCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(15, 23, 42, 0.1)'
  };

  &:hover {
    background-color: ${props => props.theme.cardHoverBg};
    box-shadow: ${props => props.theme.cardHoverShadow};
  }
`;

const ContactText = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const EmailLink = styled.a`
  color: ${props => props.theme.text.accent};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
  }

  svg {
    font-size: 1.4rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.text.primary};
  font-size: 1.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.text.accent};
    transform: translateY(-3px);
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(15, 23, 42, 0.1)'
  };
  background-color: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.05)' : 
    'rgba(15, 23, 42, 0.05)'
  };
  color: ${props => props.theme.text.primary};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}30;
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.primary}40;
  }
`;

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <ContactContainer id="contact">
      <SectionTitle>Get In Touch</SectionTitle>
      <ContactContent>
        <ContactCard>
          <ContactText>
            I'm always open to discussing new projects, opportunities, and collaborations.
          </ContactText>
          <EmailLink href="mailto:saynamsharma221b@gmail.com">
            <FaEnvelope />
            saynamsharma221b@gmail.com
          </EmailLink>
          <ContactForm onSubmit={handleSubmit}>
            <Input type="text" placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <TextArea placeholder="Your Message" required />
            <SubmitButton type="submit">Send Message</SubmitButton>
          </ContactForm>
          <SocialLinks>
            <SocialLink 
              href="https://github.com/saynam221b" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaGithub />
            </SocialLink>
            <SocialLink 
              href="https://linkedin.com/in/saynam-sharma" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </ContactCard>
      </ContactContent>
    </ContactContainer>
  );
}

export default Contact;
