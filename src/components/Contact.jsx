import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { EMAIL_CONFIG, initEmailJS, sendAutoReply } from '../utils/emailjs';
import AnimatedSection from './AnimatedSection';

const Section = styled.section`
  padding: 4.3rem 1.25rem 3.2rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 1.4rem;
`;

const Eyebrow = styled.p`
  font-size: 0.71rem;
  color: rgba(170, 194, 245, 0.94);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 700;
  margin-bottom: 0.7rem;
`;

const Title = styled.h2`
  font-size: clamp(1.92rem, 4vw, 3.2rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.7rem;
`;

const Subtitle = styled.p`
  max-width: 760px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.96rem;
  line-height: 1.72;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;

  @media (min-width: 980px) {
    grid-template-columns: 0.9fr 1.1fr;
    align-items: start;
  }
`;

const Lanes = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const Lane = styled.article`
  padding: 0.95rem;
  border: 1px solid rgba(151, 176, 234, 0.24);
  border-radius: 14px;
  background: rgba(11, 21, 45, 0.45);
`;

const LaneTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.03rem;
  margin-bottom: 0.32rem;
`;

const LaneText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.88rem;
  line-height: 1.65;
  margin-bottom: 0.62rem;
`;

const LaneMeta = styled.p`
  color: rgba(170, 198, 250, 0.95);
  font-size: 0.79rem;
  line-height: 1.55;
`;

const LaneLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.48rem;
  margin-top: 0.65rem;
`;

const LaneLink = styled.a`
  min-height: 36px;
  padding: 0 0.84rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.73rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: rgba(233, 240, 255, 0.96);
  border: 1px solid rgba(151, 176, 234, 0.42);
  background: rgba(13, 24, 50, 0.58);
`;

const FormShell = styled.div`
  padding: 1rem;
  border: 1px solid rgba(151, 176, 234, 0.26);
  border-radius: 16px;
  background: rgba(10, 20, 44, 0.55);
`;

const FormTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 0.99rem;
  margin-bottom: 0.28rem;
`;

const FormCaption = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.83rem;
  margin-bottom: 0.72rem;
`;

const Form = styled.form`
  display: grid;
  gap: 0.66rem;
`;

const Input = styled.input`
  width: 100%;
  min-height: 44px;
  border-radius: 11px;
  border: 1px solid rgba(151, 176, 234, 0.29);
  background: rgba(14, 27, 57, 0.62);
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  padding: 0.76rem 0.84rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: rgba(139, 203, 255, 0.85);
    box-shadow: 0 0 0 3px rgba(73, 143, 248, 0.22);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 130px;
  border-radius: 11px;
  border: 1px solid rgba(151, 176, 234, 0.29);
  background: rgba(14, 27, 57, 0.62);
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  padding: 0.76rem 0.84rem;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: rgba(139, 203, 255, 0.85);
    box-shadow: 0 0 0 3px rgba(73, 143, 248, 0.22);
  }
`;

const Submit = styled.button`
  min-height: 44px;
  border: none;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #ffffff;
  background: linear-gradient(130deg, #2f6dff 0%, #18b6a4 100%);
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.75;
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
            <Title>Freelance build or hiring conversation.</Title>
            <Subtitle>
              Choose the lane that fits your need. I respond with availability, fit, and a practical next step.
            </Subtitle>
          </Header>
        </AnimatedSection>

        <Layout>
          <Lanes>
            <AnimatedSection animation="fadeRight" delay={0.08}>
              <Lane>
                <LaneTitle>Lane 1: Freelance / Project Delivery</LaneTitle>
                <LaneText>For scoped web products, frontend systems, or data-heavy tools that need fast production execution.</LaneText>
                <LaneMeta>Typical response window: 24-48 hours with project fit and delivery recommendation.</LaneMeta>
                <LaneLinks>
                  <LaneLink href="mailto:saynam1101@gmail.com">Email Directly</LaneLink>
                  <LaneLink href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </LaneLink>
                </LaneLinks>
              </Lane>
            </AnimatedSection>

            <AnimatedSection animation="fadeRight" delay={0.12}>
              <Lane>
                <LaneTitle>Lane 2: Hiring / Full-Time / Contract</LaneTitle>
                <LaneText>For long-term roles in data engineering, platform reliability, or product-focused frontend ownership.</LaneText>
                <LaneMeta>Share team context or role brief for a faster fit check and availability response.</LaneMeta>
                <LaneLinks>
                  <LaneLink href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    View Resume
                  </LaneLink>
                  <LaneLink href="https://www.linkedin.com/in/saynam-sharma/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </LaneLink>
                </LaneLinks>
              </Lane>
            </AnimatedSection>
          </Lanes>

          <AnimatedSection animation="fadeLeft" delay={0.14}>
            <FormShell>
              <FormTitle>Send a message</FormTitle>
              <FormCaption>Use this form for either lane. Specific context helps me respond faster.</FormCaption>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <input type="hidden" name="to_email" value="saynam1101@gmail.com" />
                <input type="hidden" name="from_name" value="Portfolio Contact Form" />
                <input type="hidden" name="reply_to" value={formState.email} />
                <input type="hidden" name="user_email" value={formState.email} />

                <Input name="name" value={formState.name} onChange={handleChange} placeholder="Name *" required />
                <Input type="email" name="email" value={formState.email} onChange={handleChange} placeholder="Email *" required />
                <Input name="subject" value={formState.subject} onChange={handleChange} placeholder="Subject" />
                <Textarea name="message" value={formState.message} onChange={handleChange} placeholder="Message *" required />
                <Submit type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Submit>
              </Form>
            </FormShell>
          </AnimatedSection>
        </Layout>
      </Container>
    </Section>
  );
};

export default Contact;
