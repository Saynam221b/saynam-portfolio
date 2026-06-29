import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { FiArrowRight } from 'react-icons/fi';
import { EMAIL_CONFIG, initEmailJS, sendAutoReply } from '../utils/emailjs';

const Section = styled.section`
  position: relative;
  padding: clamp(4.4rem, 7vw, 6.4rem) 1.25rem clamp(3.2rem, 6vw, 4.8rem);
  overflow-x: clip;
  scroll-margin-top: 104px;

  &::before {
    content: '';
    position: absolute;
    inset: 8% 0 10%;
    background:
      radial-gradient(circle at 18% 20%, color-mix(in srgb, var(--accent) 13%, transparent), transparent 34%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.045), transparent 42%);
    pointer-events: none;
  }

  @media (max-width: 640px) {
    padding-inline: 1rem;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  width: min(1180px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(1.2rem, 3vw, 1.9rem);
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 1.05rem;
  }

  > * {
    min-width: 0;
  }
`;

const Copy = styled(motion.div)`
  position: sticky;
  top: 106px;

  @media (max-width: 860px) {
    position: relative;
    top: auto;
  }
`;

const Kicker = styled.p`
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 5.2vw, 4.85rem);
  font-weight: 900;
  line-height: 0.96;
  max-width: 11ch;

  span {
    display: block;
    font-family: var(--font-display);
    color: var(--accent-3);
  }

  @media (max-width: 560px) {
    max-width: 13ch;
    font-size: clamp(2rem, 9.8vw, 3.3rem);
  }
`;

const Subtitle = styled.p`
  max-width: 58ch;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.78;
  margin-top: 1rem;
`;

const LaneGrid = styled.div`
  display: grid;
  gap: 0.65rem;
  margin-top: 1.1rem;

  @media (max-width: 860px) {
    margin-top: 1rem;
  }
`;

const Lane = styled.a`
  border-top: 1px solid var(--line-soft);
  border-radius: 0;
  background: transparent;
  color: var(--text);
  padding: 0.9rem 0;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  transition: transform 0.22s var(--ease-out), border-color 0.22s var(--ease-out);

  &:hover,
  &:focus-visible {
    transform: translateX(3px);
    border-color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const LaneText = styled.span`
  display: grid;
  gap: 0.15rem;
`;

const LaneTitle = styled.span`
  font-weight: 850;
`;

const LaneMeta = styled.span`
  color: var(--text-subtle);
  font-size: 0.84rem;
  overflow-wrap: anywhere;
`;

const FormShell = styled(motion.div)`
  border: 1px solid var(--line);
  border-radius: 30px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 34%),
    color-mix(in srgb, var(--surface-strong) 82%, transparent);
  box-shadow: var(--shadow);
  padding: clamp(1rem, 3vw, 1.35rem);
  position: relative;
  overflow: clip;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 38px 38px;
    mask-image: linear-gradient(120deg, #000, transparent 76%);
    pointer-events: none;
  }

  @media (max-width: 860px) {
    box-shadow: var(--shadow-soft);
  }

  @media (max-width: 560px) {
    border-radius: 24px;
  }
`;

const FormTitle = styled.h3`
  position: relative;
  z-index: 1;
  font-size: clamp(1.35rem, 3vw, 2rem);
  font-weight: 900;
  margin-bottom: 0.25rem;
`;

const FormCaption = styled.p`
  position: relative;
  z-index: 1;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 0.9rem;
`;

const Form = styled.form`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.7rem;
`;

const CommandBar = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.42rem;
  margin-bottom: 0.9rem;

  span {
    width: 9px;
    height: 9px;
    border-radius: 999px;
    background: var(--line);
  }

  span:first-of-type {
    background: var(--accent);
  }

  span:nth-of-type(2) {
    background: var(--accent-2);
  }

  span:nth-of-type(3) {
    background: var(--accent-3);
  }
`;

const Field = styled.input`
  width: 100%;
  min-height: 50px;
  border-radius: 16px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.07);
  color: var(--text);
  padding: 0.8rem 0.9rem;
  outline: none;
  overflow-wrap: anywhere;
  transition: border-color 0.18s var(--ease-out), box-shadow 0.18s var(--ease-out);

  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--focus-ring);
  }

  &::placeholder {
    color: var(--text-subtle);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  border-radius: 16px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.07);
  color: var(--text);
  padding: 0.8rem 0.9rem;
  outline: none;
  resize: vertical;
  overflow-wrap: anywhere;
  transition: border-color 0.18s var(--ease-out), box-shadow 0.18s var(--ease-out);

  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--focus-ring);
  }

  &::placeholder {
    color: var(--text-subtle);
  }
`;

const Submit = styled.button`
  min-height: 50px;
  border: none;
  border-radius: 999px;
  background: var(--accent);
  color: var(--button-text);
  font-size: 0.9rem;
  font-weight: 900;
  cursor: pointer;
  transition: opacity 0.2s var(--ease-out), transform 0.2s var(--ease-out);

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.68;
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
      <Inner>
        <Copy
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <Kicker>Contact</Kicker>
          <Title>
            Start with <span>the real context.</span>
          </Title>
          <Subtitle>
            Send the context, timeline, and constraints. I will reply with fit, availability, and the most practical next step.
          </Subtitle>
          <LaneGrid>
            <Lane href="mailto:saynam1101@gmail.com">
              <LaneText>
                <LaneTitle>Email directly</LaneTitle>
                <LaneMeta>saynam1101@gmail.com</LaneMeta>
              </LaneText>
              <FiArrowRight size={18} />
            </Lane>
            <Lane href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <LaneText>
                <LaneTitle>View resume</LaneTitle>
                <LaneMeta>Experience and project proof</LaneMeta>
              </LaneText>
              <FiArrowRight size={18} />
            </Lane>
          </LaneGrid>
        </Copy>

        <FormShell
          initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <CommandBar aria-hidden="true">
            <span />
            <span />
            <span />
          </CommandBar>
          <FormTitle>Project signal</FormTitle>
          <FormCaption>Keep it short. Goals, current problem, deadline, and the outcome you want.</FormCaption>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <input type="hidden" name="to_email" value="saynam1101@gmail.com" />
            <input type="hidden" name="from_name" value="Portfolio Contact Form" />
            <input type="hidden" name="reply_to" value={formState.email} />
            <input type="hidden" name="user_email" value={formState.email} />

            <Field name="name" value={formState.name} onChange={handleChange} placeholder="Name *" required aria-label="Your name" />
            <Field type="email" name="email" value={formState.email} onChange={handleChange} placeholder="Email *" required aria-label="Your email address" />
            <Field name="subject" value={formState.subject} onChange={handleChange} placeholder="Subject" aria-label="Message subject" />
            <Textarea name="message" value={formState.message} onChange={handleChange} placeholder="Message *" required aria-label="Your message" />
            <Submit type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Submit>
          </Form>
        </FormShell>
      </Inner>
    </Section>
  );
};

export default Contact;
