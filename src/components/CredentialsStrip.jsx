import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const Strip = styled.section`
  padding: 1.35rem 1.25rem 0.5rem;
  scroll-margin-top: 104px;

  @media (max-width: 640px) {
    padding-inline: 1rem;
  }
`;

const Inner = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
  border: 1px solid var(--line-soft);
  border-radius: 22px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.06), transparent 42%),
    color-mix(in srgb, var(--surface-soft) 72%, transparent);
  padding: clamp(0.85rem, 2vw, 1.15rem) clamp(1rem, 2.4vw, 1.35rem);
`;

const Label = styled.p`
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-subtle);
  font-weight: 700;
  margin-bottom: 0.65rem;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--text);
  padding: 0.38rem 0.78rem;
  font-size: 0.78rem;
  font-weight: 750;
  line-height: 1.35;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 70%, transparent);
    flex-shrink: 0;
  }
`;

const credentials = [
  'Databricks Certified Data Engineer Associate',
  'Databricks Certified Data Engineer Professional',
  'Apache Spark Lakehouse Fundamentals',
];

const CredentialsStrip = () => {
  return (
    <Strip id="credentials" aria-label="Certifications">
      <Inner>
        <Label>Credentials</Label>
        <BadgeRow>
          {credentials.map(name => (
            <Badge key={name}>{name}</Badge>
          ))}
        </BadgeRow>
      </Inner>
    </Strip>
  );
};

export default CredentialsStrip;
