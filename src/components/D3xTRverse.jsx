import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const PageWrapper = styled(motion.div)`
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroSection = styled.section`
  padding: 3rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: ${props => props.theme.gradients.primary};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto 1.5rem;
  line-height: 1.5;
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  box-shadow: ${props => props.theme.shadows.md};
  font-size: 0.95rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ContentSection = styled.section`
  padding: 2rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled(motion.div)`
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.md};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: ${props => props.theme.shadows.sm};
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const CardText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const D3xTRverse = () => {
  return (
    <PageWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <Title
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          D3xTRverse
        </Title>
        <Subtitle
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Where high-level gaming meets advanced coding.
        </Subtitle>
        <Button
          href="https://d3xtrverse.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <i className="fas fa-external-link-alt"></i> Visit Official Website
        </Button>
      </HeroSection>

      <ContentSection>
        <ContentGrid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconWrapper>
              <i className="fas fa-gamepad"></i>
            </IconWrapper>
            <CardTitle>Gaming Community</CardTitle>
            <CardText>
              Join us for eFootball tournaments, strategic gameplay analysis, and competitive events.
            </CardText>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <IconWrapper>
              <i className="fas fa-code"></i>
            </IconWrapper>
            <CardTitle>Coding Hub</CardTitle>
            <CardText>
              Deep dives into system architecture, full-stack development tutorials, and tech reviews.
            </CardText>
          </Card>
        </ContentGrid>
      </ContentSection>
    </PageWrapper>
  );
};

export default D3xTRverse;
