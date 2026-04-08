import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { EMAIL_CONFIG, initEmailJS, sendAutoReply } from '../utils/emailjs';
import AnimatedSection from './AnimatedSection';

const meshFloat = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-20px, 15px) scale(1.05); }
`;

const ContactSection = styled.section`
  padding: 5rem 1.5rem;
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
`;

// Decorative mesh gradient
const ContactDecor = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
`;

const Decor1 = styled(ContactDecor)`
  top: -10%;
  right: -5%;
  background: rgba(124, 58, 237, 0.06);
  animation: ${meshFloat} 15s ease-in-out infinite;
`;

const Decor2 = styled(ContactDecor)`
  bottom: -10%;
  left: -5%;
  background: rgba(236, 72, 153, 0.04);
  animation: ${meshFloat} 18s ease-in-out infinite reverse;
`;

const ContactContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
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
  background: ${props => props.isDarkMode
    ? 'rgba(31, 41, 55, 0.5)'
    : 'rgba(255, 255, 255, 0.8)'
  };
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(0, 0, 0, 0.06)'
  };
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(124, 58, 237, 0.08);
    border-color: ${props => props.theme.colors.primary}33;
  }
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
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
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
  font-size: 1rem;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  
  ${ContactItem}:hover & {
    transform: scale(1.1) rotate(-5deg);
  }
`;

const ContactText = styled.div`
  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.15rem;
  }
  
  p, a {
    font-size: 0.88rem;
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
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.04)'
  };
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  
  &:hover {
    background: ${props => props.theme.gradients.primary};
    color: white;
    transform: translateY(-3px);
    border-color: transparent;
  }
`;

const ContactForm = styled.form`
  background: ${props => props.isDarkMode
    ? 'rgba(31, 41, 55, 0.5)'
    : 'rgba(255, 255, 255, 0.8)'
  };
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(0, 0, 0, 0.06)'
  };
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const FormLabel = styled.label`
  position: absolute;
  left: 1rem;
  top: ${props => props.isFocused || props.hasValue ? '-0.5rem' : '1rem'};
  font-size: ${props => props.isFocused || props.hasValue ? '0.72rem' : '0.88rem'};
  color: ${props => props.isFocused ? props.theme.colors.primary : props.theme.colors.textSecondary};
  background: ${props => props.isDarkMode
    ? 'rgba(31, 41, 55, 1)'
    : 'rgba(255, 255, 255, 1)'
  };
  padding: 0 0.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  pointer-events: none;
  z-index: 1;
  font-weight: 500;
`;

const inputStyles = props => `
  width: 100%;
  padding: 1rem;
  border: 1.5px solid ${props.isFocused
    ? props.theme.colors.primary
    : (props.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')
  };
  border-radius: 12px;
  background: transparent;
  color: ${props.theme.colors.text};
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: ${props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props.theme.colors.primary}15;
  }
`;

const FormInput = styled.input`
  ${props => inputStyles(props)}
`;

const FormTextarea = styled.textarea`
  ${props => inputStyles(props)}
  min-height: 130px;
  resize: vertical;
`;

const gradientShimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const SubmitButton = styled.button`
  padding: 0.9rem 2rem;
  background: ${props => props.theme.gradients.primary};
  background-size: 200% 200%;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.25);
    animation: ${gradientShimmer} 2s ease infinite;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
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

  useEffect(() => {
    initEmailJS();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        formRef.current
      );

      const autoReplyResult = await sendAutoReply(
        formState.name,
        formState.email
      );

      setFormState({ name: '', email: '', subject: '', message: '' });
      toast.success("Message sent successfully! I'll get back to you soon.");

      if (!autoReplyResult.success) {
        console.warn("Auto-reply email could not be sent, but main message was delivered");
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact">
      <Decor1 />
      <Decor2 />
      <ContactContainer>
        <AnimatedSection animation="clipRevealUp">
          <SectionTitle>Get In Touch</SectionTitle>
        </AnimatedSection>
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <SectionSubtitle>
            Have a data engineering challenge or want to collaborate on something interesting? Let's connect.
          </SectionSubtitle>
        </AnimatedSection>

        <ContactContent>
          <ContactInfo>
          <AnimatedSection animation="fadeRight" delay={0.15}>
            <ContactInfoCard isDarkMode={isDarkMode}>
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
                  isDarkMode={isDarkMode}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fab fa-linkedin-in"></i>
                </SocialLink>

                <SocialLink
                  href="https://github.com/Saynam221b"
                  target="_blank"
                  rel="noopener noreferrer"
                  isDarkMode={isDarkMode}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fab fa-github"></i>
                </SocialLink>

                <SocialLink
                  href="mailto:saynam1101@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  isDarkMode={isDarkMode}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fas fa-envelope"></i>
                </SocialLink>

                <SocialLink
                  href="https://twitter.com/saynam_sharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  isDarkMode={isDarkMode}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fab fa-twitter"></i>
                </SocialLink>
              </SocialLinks>
            </ContactInfoCard>
          </AnimatedSection>
          </ContactInfo>

          <AnimatedSection animation="fadeLeft" delay={0.2}>
          <ContactForm
            ref={formRef}
            onSubmit={handleSubmit}
            isDarkMode={isDarkMode}
          >
            <input type="hidden" name="to_email" value="saynam1101@gmail.com" />
            <input type="hidden" name="from_name" value="Portfolio Contact Form" />
            <input type="hidden" name="reply_to" value={formState.email} />
            <input type="hidden" name="user_email" value={formState.email} />

            <FormGroup>
              <FormLabel
                htmlFor="name"
                isFocused={focusedField === 'name'}
                hasValue={formState.name.length > 0}
                isDarkMode={isDarkMode}
              >
                Name *
              </FormLabel>
              <FormInput
                type="text" id="name" name="name"
                value={formState.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                isFocused={focusedField === 'name'}
                isDarkMode={isDarkMode}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel
                htmlFor="email"
                isFocused={focusedField === 'email'}
                hasValue={formState.email.length > 0}
                isDarkMode={isDarkMode}
              >
                Email *
              </FormLabel>
              <FormInput
                type="email" id="email" name="email"
                value={formState.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                isFocused={focusedField === 'email'}
                isDarkMode={isDarkMode}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel
                htmlFor="subject"
                isFocused={focusedField === 'subject'}
                hasValue={formState.subject.length > 0}
                isDarkMode={isDarkMode}
              >
                Subject
              </FormLabel>
              <FormInput
                type="text" id="subject" name="subject"
                value={formState.subject}
                onChange={handleChange}
                onFocus={() => handleFocus('subject')}
                onBlur={handleBlur}
                isFocused={focusedField === 'subject'}
                isDarkMode={isDarkMode}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel
                htmlFor="message"
                isFocused={focusedField === 'message'}
                hasValue={formState.message.length > 0}
                isDarkMode={isDarkMode}
              >
                Message *
              </FormLabel>
              <FormTextarea
                id="message" name="message"
                value={formState.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                isFocused={focusedField === 'message'}
                isDarkMode={isDarkMode}
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message →'}
            </SubmitButton>
          </ContactForm>
          </AnimatedSection>
        </ContactContent>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;
