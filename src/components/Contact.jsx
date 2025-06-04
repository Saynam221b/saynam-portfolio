import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../App';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { EMAIL_CONFIG, initEmailJS } from '../utils/emailjs';

const ContactSection = styled.section`
  padding: 6rem 1.5rem;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem 3rem;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 8rem 2rem;
  }
`;

const ContactContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  color: ${props => props.theme.colors.text};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 4px;
    background: ${props => props.theme.gradients.primary};
    border-radius: 2px;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.2rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 2rem auto 3rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.95rem;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactInfoCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 1.5rem;
    background: ${props => props.theme.gradients.primary};
    border-radius: 2px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactIcon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
  font-size: 1.15rem;
`;

const ContactText = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.25rem;
  }
  
  p, a {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textSecondary};
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.gradients.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled(motion.form)`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.md};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const FormLabel = styled.label`
  position: absolute;
  left: 1rem;
  top: ${props => props.isFocused || props.hasValue ? '-0.5rem' : '1rem'};
  font-size: ${props => props.isFocused || props.hasValue ? '0.75rem' : '0.9rem'};
  color: ${props => props.isFocused ? props.theme.colors.primary : props.theme.colors.textSecondary};
  background: ${props => props.theme.colors.cardBg};
  padding: 0 0.5rem;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.isFocused ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 0.5rem;
  background: transparent;
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.isFocused ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 0.5rem;
  background: transparent;
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 0.9rem 1.8rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  
  // Initialize EmailJS
  useEffect(() => {
    initEmailJS();
  }, []);
  
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
      // Send email to portfolio owner using EmailJS
      await emailjs.sendForm(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        formRef.current
      );
      
      // Send auto-reply email to the user
      const autoReplyParams = {
        to_name: formState.name,
        to_email: formState.email,
        from_name: "Saynam Sharma",
        message: "Thank you for contacting me! I have received your message and will get back to you as soon as possible.",
        subject: formState.subject ? `Re: ${formState.subject}` : "Thank you for contacting me"
      };
      
      await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.autoReplyTemplateId,
        autoReplyParams
      );
      
      // Success
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <ContactSection id="contact">
      <ContactContainer>
        <SectionTitle>Get In Touch</SectionTitle>
        <SectionSubtitle>
          Have a question or want to work together? Feel free to contact me!
        </SectionSubtitle>
        
        <ContactContent>
          <ContactInfo>
            <ContactInfoCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ContactInfoTitle>Contact Information</ContactInfoTitle>
              
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-envelope"></i>
                </ContactIcon>
                <ContactText>
                  <h4>Email</h4>
                  <a href="mailto:saynam1101@gmail.com">saynam1101@gmail.com</a>
                </ContactText>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-phone"></i>
                </ContactIcon>
                <ContactText>
                  <h4>Phone</h4>
                  <a href="tel:+919419271101">+91 9419271101</a>
                </ContactText>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-map-marker-alt"></i>
                </ContactIcon>
                <ContactText>
                  <h4>Location</h4>
                  <p>Jammu, India</p>
                </ContactText>
              </ContactItem>
              
              <SocialLinks>
                <SocialLink 
                  href="https://www.linkedin.com/in/saynam-sharma/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fab fa-linkedin-in"></i>
                </SocialLink>
                
                <SocialLink 
                  href="https://github.com/Saynam221b" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fab fa-github"></i>
                </SocialLink>
                
                <SocialLink 
                  href="mailto:saynam1101@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fas fa-envelope"></i>
                </SocialLink>
                
                <SocialLink 
                  href="https://twitter.com/saynam_sharma" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fab fa-twitter"></i>
                </SocialLink>
              </SocialLinks>
            </ContactInfoCard>
          </ContactInfo>
          
          <ContactForm
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FormGroup>
              <FormLabel 
                htmlFor="name" 
                isFocused={focusedField === 'name'} 
                hasValue={formState.name.length > 0}
              >
                Name *
              </FormLabel>
              <FormInput 
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
            </FormGroup>
            
            <FormGroup>
              <FormLabel 
                htmlFor="email" 
                isFocused={focusedField === 'email'} 
                hasValue={formState.email.length > 0}
              >
                Email *
              </FormLabel>
              <FormInput 
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
            </FormGroup>
            
            <FormGroup>
              <FormLabel 
                htmlFor="subject" 
                isFocused={focusedField === 'subject'} 
                hasValue={formState.subject.length > 0}
              >
                Subject
              </FormLabel>
              <FormInput 
                type="text" 
                id="subject" 
                name="subject" 
                value={formState.subject}
                onChange={handleChange}
                onFocus={() => handleFocus('subject')}
                onBlur={handleBlur}
                isFocused={focusedField === 'subject'}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel 
                htmlFor="message" 
                isFocused={focusedField === 'message'} 
                hasValue={formState.message.length > 0}
              >
                Message *
              </FormLabel>
              <FormTextarea 
                id="message" 
                name="message" 
                value={formState.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                isFocused={focusedField === 'message'}
                required
              />
            </FormGroup>
            
            <SubmitButton 
              type="submit" 
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;
