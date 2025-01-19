import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';

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
  align-items: center;
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
  text-align: left;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}30;
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 150px;
  resize: vertical;
  text-align: left;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  padding: 0.6rem 1.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.primary}40;
  }
`;

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        alert('Email sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Error sending email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email.');
    }
  };

  return (
    <ContactContainer id="contact">
      <SectionTitle>Get In Touch</SectionTitle>
      <ContactContent>
        <ContactCard>
          <ContactText>
            I'm always open to discussing new projects, opportunities, and collaborations.
          </ContactText>
          <ContactForm onSubmit={handleSubmit}>
            <Input 
              type="text" 
              placeholder="Your Name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              type="email" 
              placeholder="Your Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextArea 
              placeholder="Your Message" 
              required 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <SubmitButton type="submit">
              <FaPaperPlane />
              Let's Connect!
            </SubmitButton>
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
