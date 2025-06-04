import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

const ContactSection = styled.section`
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text.primary};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const SectionSubtitle = styled.p`
  color: ${props => props.theme.text.secondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 4rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactForm = styled(motion.form)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoCard = styled(motion.div)`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: ${props => props.theme.cardShadow};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(15, 23, 42, 0.1)'
  };
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.cardHoverShadow};
  }
`;

const InfoTitle = styled.h3`
  color: ${props => props.theme.text.primary};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.text.secondary};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.2rem;
`;

const InfoText = styled.div`
  flex: 1;
  
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: ${props => props.theme.text.primary};
  }
  
  p {
    font-size: 0.95rem;
  }
  
  a {
    color: ${props => props.theme.text.accent};
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.text.light};
  opacity: 0.2;
  color: ${props => props.theme.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primary};
    color: white;
    opacity: 1;
    transform: translateY(-3px);
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  left: 1rem;
  top: ${props => props.isFocused || props.hasValue ? '-0.5rem' : '1rem'};
  font-size: ${props => props.isFocused || props.hasValue ? '0.75rem' : '0.95rem'};
  color: ${props => props.isFocused ? props.theme.primary : props.theme.text.secondary};
  background: ${props => props.theme.cardBg};
  padding: 0 0.5rem;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.isFocused ? props.theme.primary : props.theme.text.light};
  border-radius: 8px;
  background: transparent;
  color: ${props => props.theme.text.primary};
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}33;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.isFocused ? props.theme.primary : props.theme.text.light};
  border-radius: 8px;
  background: transparent;
  color: ${props => props.theme.text.primary};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}33;
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.buttonGradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.buttonHoverGradient};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

function Contact() {
  const { isDarkMode } = useTheme();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFocus = (field) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name || !formState.email || !formState.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <ContactSection id="contact">
      <SectionTitle>Get In Touch</SectionTitle>
      <SectionSubtitle>
        Have a question or want to work together? Feel free to contact me!
      </SectionSubtitle>
      
      <ContactContainer>
        <ContactInfo>
          <InfoCard 
            isDarkMode={isDarkMode}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <InfoTitle>Contact Information</InfoTitle>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-envelope"></i>
              </InfoIcon>
              <InfoText>
                <h4>Email</h4>
                <p><a href="mailto:saynam1101@gmail.com">saynam1101@gmail.com</a></p>
              </InfoText>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-phone"></i>
              </InfoIcon>
              <InfoText>
                <h4>Phone</h4>
                <p><a href="tel:+919419271101">+91 9419271101</a></p>
              </InfoText>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-map-marker-alt"></i>
              </InfoIcon>
              <InfoText>
                <h4>Location</h4>
                <p>Jammu, India</p>
              </InfoText>
            </InfoItem>
            
            <SocialLinks>
              <SocialLink 
                href="https://www.linkedin.com/in/saynam-sharma/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <i className="fab fa-linkedin-in"></i>
              </SocialLink>
              <SocialLink 
                href="https://github.com/Saynam221b" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <i className="fab fa-github"></i>
              </SocialLink>
              <SocialLink 
                href="https://twitter.com/saynam_sharma" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <i className="fab fa-twitter"></i>
              </SocialLink>
            </SocialLinks>
          </InfoCard>
        </ContactInfo>
        
        <ContactForm 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <InputGroup>
            <Label 
              htmlFor="name" 
              isFocused={focusedField === 'name'} 
              hasValue={formState.name.length > 0}
            >
              Name *
            </Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formState.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              isFocused={focusedField === 'name'}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label 
              htmlFor="email" 
              isFocused={focusedField === 'email'} 
              hasValue={formState.email.length > 0}
            >
              Email *
            </Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formState.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              isFocused={focusedField === 'email'}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label 
              htmlFor="subject" 
              isFocused={focusedField === 'subject'} 
              hasValue={formState.subject.length > 0}
            >
              Subject
            </Label>
            <Input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formState.subject}
              onChange={handleChange}
              onFocus={() => handleFocus('subject')}
              onBlur={handleBlur}
              isFocused={focusedField === 'subject'}
            />
          </InputGroup>
          
          <InputGroup>
            <Label 
              htmlFor="message" 
              isFocused={focusedField === 'message'} 
              hasValue={formState.message.length > 0}
            >
              Message *
            </Label>
            <TextArea 
              id="message" 
              name="message" 
              value={formState.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              isFocused={focusedField === 'message'}
              required
            />
          </InputGroup>
          
          <SubmitButton 
            type="submit" 
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </ContactForm>
      </ContactContainer>
    </ContactSection>
  );
}

export default Contact;
