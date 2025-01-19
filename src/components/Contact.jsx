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
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

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
  padding: 0.8rem 1rem;
  border: 2px solid transparent;
  border-radius: 8px;
  background-color: ${props => props.theme.mainBg};
  color: ${props => props.theme.text.primary};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem 1rem;
  border: 2px solid transparent;
  border-radius: 8px;
  background-color: ${props => props.theme.mainBg};
  color: ${props => props.theme.text.primary};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
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
