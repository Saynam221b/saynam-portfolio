import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaPaperPlane, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ContactContainer = styled.section`
  padding: 6rem 2rem;
  background: transparent;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  color: ${props => props.theme.text.primary};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 700;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: ${props => props.theme.primary};
    margin: 0.8rem auto 0;
    border-radius: 5px;
  }
`;

const ContactContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const LeftColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ContactInfoCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: ${props => props.theme.cardShadow};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.text.primary}10;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.cardHoverShadow};
  }
`;

const ContactInfoTitle = styled.h3`
  color: ${props => props.theme.text.primary};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background: ${props => props.theme.primary};
    border-radius: 3px;
  }
`;

const ContactText = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.primary}15;
  color: ${props => props.theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.2rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  ${InfoItem}:hover & {
    background-color: ${props => props.theme.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  color: ${props => props.theme.text.secondary};
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
`;

const InfoValue = styled.a`
  color: ${props => props.theme.text.primary};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  width: 45px;
  height: 45px;
  background-color: ${props => props.theme.cardBg};
  color: ${props => props.theme.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.text.primary}10;
  
  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px ${props => props.theme.primary}40;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: ${props => props.theme.cardBg};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: ${props => props.theme.cardShadow};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.text.primary}10;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${props => props.theme.cardHoverShadow};
  }
`;

const FormTitle = styled.h3`
  color: ${props => props.theme.text.primary};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background: ${props => props.theme.primary};
    border-radius: 3px;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  position: absolute;
  left: 1rem;
  top: ${props => props.isFocused || props.hasValue ? '-12px' : '50%'};
  transform: translateY(${props => props.isFocused || props.hasValue ? '0' : '-50%'});
  background-color: ${props => props.isFocused || props.hasValue ? props.theme.cardBg : 'transparent'};
  padding: ${props => props.isFocused || props.hasValue ? '0 0.5rem' : '0'};
  font-size: ${props => props.isFocused || props.hasValue ? '0.8rem' : '1rem'};
  color: ${props => props.isFocused ? props.theme.primary : props.theme.text.secondary};
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.isFocused ? props.theme.primary : props.theme.text.primary}20;
  background-color: transparent;
  color: ${props => props.theme.text.primary};
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  
  &:focus {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}30;
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled(motion.button)`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px ${props => props.theme.primary}40;
    
    &::before {
      transform: translateX(100%);
      transition: transform 0.6s ease;
    }
  }
  
  &:disabled {
    background-color: ${props => props.theme.text.secondary}50;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error('Please fill in all fields.', {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        toast.success('Message sent successfully! I will get back to you soon.', {
          position: "bottom-right",
          autoClose: 3000,
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error('Error sending message. Please try again later.', {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Something went wrong. Please try again later.', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <ContactContainer id="contact">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Get In Touch
      </SectionTitle>
      
      <ContactContent>
        <LeftColumn
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ContactInfoCard as={motion.div} variants={itemVariants}>
            <ContactInfoTitle>Contact Information</ContactInfoTitle>
            <ContactText>
              Feel free to reach out to me for collaborations or if you have any questions.
            </ContactText>
            
            <InfoItem>
              <InfoIcon>
                <FaEnvelope />
              </InfoIcon>
              <InfoText>
                <InfoLabel>Email</InfoLabel>
                <InfoValue href="mailto:saynam.sharma@example.com">saynam.sharma@example.com</InfoValue>
              </InfoText>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <FaPhoneAlt />
              </InfoIcon>
              <InfoText>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue href="tel:+1234567890">+1 (234) 567-890</InfoValue>
              </InfoText>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <FaMapMarkerAlt />
              </InfoIcon>
              <InfoText>
                <InfoLabel>Location</InfoLabel>
                <InfoValue>Bangalore, India</InfoValue>
              </InfoText>
            </InfoItem>
            
            <SocialLinks>
              <SocialLink 
                href="https://github.com/saynam221b" 
                target="_blank" 
                rel="noopener noreferrer"
                as={motion.a}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <FaGithub />
              </SocialLink>
              <SocialLink 
                href="https://linkedin.com/in/saynam-sharma" 
                target="_blank" 
                rel="noopener noreferrer"
                as={motion.a}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <FaLinkedin />
              </SocialLink>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                as={motion.a}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <FaTwitter />
              </SocialLink>
              <SocialLink 
                href="mailto:saynam.sharma@example.com" 
                as={motion.a}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <FaEnvelope />
              </SocialLink>
            </SocialLinks>
          </ContactInfoCard>
        </LeftColumn>
        
        <RightColumn
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ContactForm onSubmit={handleSubmit} as={motion.form} variants={itemVariants}>
            <FormTitle>Send Me a Message</FormTitle>
            
            <InputGroup>
              <InputLabel 
                isFocused={nameFocused} 
                hasValue={name.length > 0}
              >
                Your Name
              </InputLabel>
              <Input 
                type="text"
                isFocused={nameFocused}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <InputLabel 
                isFocused={emailFocused} 
                hasValue={email.length > 0}
              >
                Your Email
              </InputLabel>
              <Input 
                type="email"
                isFocused={emailFocused}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <InputLabel 
                isFocused={messageFocused} 
                hasValue={message.length > 0}
              >
                Your Message
              </InputLabel>
              <TextArea 
                isFocused={messageFocused}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setMessageFocused(true)}
                onBlur={() => setMessageFocused(false)}
                required
              />
            </InputGroup>
            
            <SubmitButton 
              type="submit" 
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </RightColumn>
      </ContactContent>
    </ContactContainer>
  );
}

export default Contact;
