import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { EMAIL_CONFIG, initEmailJS, sendAutoReply } from '../utils/emailjs';

const Section = styled.section`
  position: relative;
  padding: clamp(5rem, 9vw, 8rem) 1.25rem clamp(3rem, 6vw, 4.8rem);
`;

const Inner = styled.div`
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
`;

const Copy = styled(motion.div)`
  position: sticky;
  top: 110px;

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
  font-size: clamp(2.6rem, 8vw, 7.2rem);
  font-weight: 900;
  line-height: 0.88;
  max-width: 9ch;

  span {
    display: block;
    font-family: var(--font-display);
    color: var(--accent-3);
  }

  @media (max-width: 560px) {
    font-size: clamp(2.55rem, 15vw, 4.2rem);
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
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: var(--surface-soft);
  color: var(--text);
  padding: 0.85rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  transition: transform 0.22s var(--ease-out), border-color 0.22s var(--ease-out);

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: var(--accent);
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
`;

const FormShell = styled(motion.div)`
  border: 1px solid var(--line);
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 34%),
    var(--surface);
  box-shadow: var(--shadow);
  padding: clamp(1rem, 3vw, 1.35rem);

  @media (max-width: 860px) {
    box-shadow: var(--shadow-soft);
  }
`;

const FormTitle = styled.h3`
  font-size: clamp(1.35rem, 3vw, 2rem);
  font-weight: 900;
  margin-bottom: 0.25rem;
`;

const FormCaption = styled.p`
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 0.9rem;
`;

const Form = styled.form`
  display: grid;
  gap: 0.7rem;
`;

const Field = styled.input`
  width: 100%;
  min-height: 50px;
  border-radius: 16px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.055);
  color: var(--text);
  padding: 0.8rem 0.9rem;
  outline: none;
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
  background: rgba(255, 255, 255, 0.055);
  color: var(--text);
  padding: 0.8rem 0.9rem;
  outline: none;
  resize: vertical;
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
          <Kicker>Contact finale</Kicker>
          <Title>
            Let us build <span>the clean version.</span>
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
              <i className="fas fa-arrow-right" />
            </Lane>
            <Lane href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <LaneText>
                <LaneTitle>View resume</LaneTitle>
                <LaneMeta>Experience and project proof</LaneMeta>
              </LaneText>
              <i className="fas fa-arrow-right" />
            </Lane>
          </LaneGrid>
        </Copy>

        <FormShell
          initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <FormTitle>Project signal</FormTitle>
          <FormCaption>Keep it short. Goals, current problem, deadline, and the outcome you want.</FormCaption>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <input type="hidden" name="to_email" value="saynam1101@gmail.com" />
            <input type="hidden" name="from_name" value="Portfolio Contact Form" />
            <input type="hidden" name="reply_to" value={formState.email} />
            <input type="hidden" name="user_email" value={formState.email} />

            <Field name="name" value={formState.name} onChange={handleChange} placeholder="Name *" required />
            <Field type="email" name="email" value={formState.email} onChange={handleChange} placeholder="Email *" required />
            <Field name="subject" value={formState.subject} onChange={handleChange} placeholder="Subject" />
            <Textarea name="message" value={formState.message} onChange={handleChange} placeholder="Message *" required />
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
