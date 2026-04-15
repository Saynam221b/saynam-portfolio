import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { EMAIL_CONFIG, initEmailJS, sendAutoReply } from '../utils/emailjs';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  padding: 4.6rem 1.25rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 1.55rem;
`;

const Eyebrow = styled.p`
  color: rgba(164, 188, 244, 0.95);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-weight: 700;
  margin-bottom: 0.65rem;
`;

const Title = styled.h2`
  font-size: clamp(1.85rem, 4vw, 3rem);
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.03em;
  margin-bottom: 0.72rem;
`;

const Subtitle = styled.p`
  max-width: 760px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.98rem;
  line-height: 1.7;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.95rem;
  margin-bottom: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Lane = styled.article`
  border: 1px solid rgba(126, 151, 214, 0.24);
  border-radius: 16px;
  background: rgba(11, 24, 54, 0.5);
  padding: 1rem;
`;

const LaneTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.08rem;
  margin-bottom: 0.35rem;
`;

const LaneText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.68;
  margin-bottom: 0.65rem;
`;

const LaneMeta = styled.p`
  color: rgba(167, 196, 255, 0.9);
  font-size: 0.82rem;
  font-weight: 600;
`;

const LinkRow = styled.div`
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
`;

const QuietLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 0.95rem;
  border-radius: 999px;
  font-size: 0.81rem;
  font-weight: 700;
  color: rgba(222, 232, 255, 0.95);
  border: 1px solid rgba(126, 151, 214, 0.42);
  background: rgba(17, 31, 66, 0.45);
`;

const FormLayout = styled.div`
  border: 1px solid rgba(126, 151, 214, 0.24);
  border-radius: 18px;
  background: rgba(10, 22, 52, 0.56);
  padding: 1.05rem;
`;

const FormHeader = styled.div`
  margin-bottom: 0.75rem;
`;

const FormTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

const FormSub = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.85rem;
`;

const Form = styled.form`
  display: grid;
  gap: 0.72rem;
`;

const Input = styled.input`
  width: 100%;
  min-height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(126, 151, 214, 0.28);
  background: rgba(15, 32, 70, 0.48);
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  padding: 0.78rem 0.85rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: rgba(111, 181, 255, 0.85);
    box-shadow: 0 0 0 3px rgba(76, 152, 255, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 130px;
  border-radius: 12px;
  border: 1px solid rgba(126, 151, 214, 0.28);
  background: rgba(15, 32, 70, 0.48);
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  padding: 0.78rem 0.85rem;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: rgba(111, 181, 255, 0.85);
    box-shadow: 0 0 0 3px rgba(76, 152, 255, 0.2);
  }
`;

const Submit = styled.button`
  min-height: 44px;
  border: none;
  border-radius: 999px;
  color: #fff;
  font-size: 0.88rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2b6cf0 0%, #15b8a6 100%);
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    initEmailJS();
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, formRef.current);
      const autoReplyResult = await sendAutoReply(formState.name, formState.email);
      setFormState({ name: '', email: '', subject: '', message: '' });
      toast.success("Message sent successfully. I'll get back to you soon.");
      if (!autoReplyResult.success) {
        console.warn('Auto-reply failed, but main message was delivered.');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact">
      <Container>
        <AnimatedSection animation="fadeUp">
          <Header>
            <Eyebrow>Dual CTA Contact</Eyebrow>
            <Title>Choose the path that fits your need.</Title>
            <Subtitle>
              I collaborate with teams on both freelance delivery and full-time roles. Share your context and I will reply with scope, fit, and next steps.
            </Subtitle>
          </Header>
        </AnimatedSection>

        <ContactGrid>
          <AnimatedSection animation="fadeRight" delay={0.08}>
            <Lane>
              <LaneTitle>Lane 1: Freelance / Project Builds</LaneTitle>
              <LaneText>
                Best for product UI implementation, data-heavy web tools, and scoped engineering delivery where you need fast execution and production quality.
              </LaneText>
              <LaneMeta>Typical response: within 24-48 hours with scope and delivery recommendation.</LaneMeta>
              <LinkRow>
                <QuietLink href="mailto:saynam1101@gmail.com">Email Directly</QuietLink>
                <QuietLink href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">GitHub</QuietLink>
              </LinkRow>
            </Lane>
          </AnimatedSection>

          <AnimatedSection animation="fadeLeft" delay={0.12}>
            <Lane>
              <LaneTitle>Lane 2: Hiring / Full-Time / Contract</LaneTitle>
              <LaneText>
                Best for long-term ownership roles in data engineering, platform reliability, and product-focused frontend or full-stack development.
              </LaneText>
              <LaneMeta>Attach role context or team brief and I will respond with fit and availability.</LaneMeta>
              <LinkRow>
                <QuietLink href="/resume.pdf" target="_blank" rel="noopener noreferrer">View Resume</QuietLink>
                <QuietLink href="https://www.linkedin.com/in/saynam-sharma/" target="_blank" rel="noopener noreferrer">LinkedIn</QuietLink>
              </LinkRow>
            </Lane>
          </AnimatedSection>
        </ContactGrid>

        <AnimatedSection animation="fadeUp" delay={0.16}>
          <FormLayout>
            <FormHeader>
              <FormTitle>Send a message</FormTitle>
              <FormSub>Use this for either lane. Keep it short and specific for faster response.</FormSub>
            </FormHeader>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <input type="hidden" name="to_email" value="saynam1101@gmail.com" />
              <input type="hidden" name="from_name" value="Portfolio Contact Form" />
              <input type="hidden" name="reply_to" value={formState.email} />
              <input type="hidden" name="user_email" value={formState.email} />

              <Input name="name" value={formState.name} onChange={handleChange} placeholder="Name *" required />
              <Input type="email" name="email" value={formState.email} onChange={handleChange} placeholder="Email *" required />
              <Input name="subject" value={formState.subject} onChange={handleChange} placeholder="Subject" />
              <Textarea name="message" value={formState.message} onChange={handleChange} placeholder="Message *" required />
              <Submit type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</Submit>
            </Form>
          </FormLayout>
        </AnimatedSection>
      </Container>
    </Section>
  );
};

export default Contact;
