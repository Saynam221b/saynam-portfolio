import React from 'react';
import styled from '@emotion/styled';
import AnimatedSection from './AnimatedSection';

const FooterShell = styled.footer`
  padding: 3.2rem 1.25rem 2rem;
  border-top: 1px solid rgba(151, 176, 234, 0.22);
  background: rgba(7, 13, 31, 0.78);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  margin-bottom: 1.5rem;

  @media (min-width: 900px) {
    grid-template-columns: 1.4fr 1fr 1fr;
  }
`;

const Brand = styled.a`
  color: #f6f8ff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const Description = styled.p`
  max-width: 460px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 0.7rem;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.48rem;
  flex-wrap: wrap;
`;

const Social = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(218, 230, 255, 0.95);
  border: 1px solid rgba(151, 176, 234, 0.28);
  background: rgba(13, 24, 50, 0.56);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(160, 210, 255, 0.72);
  }
`;

const Column = styled.div`
  h3 {
    font-size: 0.72rem;
    color: rgba(170, 194, 245, 0.94);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 0.62rem;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.42rem;
`;

const LinkItem = styled.li`
  a {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.88rem;
    line-height: 1.56;
  }
`;

const Bottom = styled.div`
  border-top: 1px solid rgba(151, 176, 234, 0.16);
  padding-top: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.83rem;
`;

const Tagline = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.8rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterShell>
      <Container>
        <AnimatedSection animation="fadeUp" threshold={0.1}>
          <Top>
            <div>
              <Brand href="/#home">Saynam Sharma Studio</Brand>
              <Description>
                Hybrid data and web product engineer focused on resilient ETL systems, premium frontend execution, and freelance-ready delivery.
              </Description>
              <SocialRow>
                <Social href="https://www.linkedin.com/in/saynam-sharma/" target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn profile">
                  <i className="fab fa-linkedin-in" />
                </Social>
                <Social href="https://github.com/Saynam221b" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile">
                  <i className="fab fa-github" />
                </Social>
                <Social href="mailto:saynam1101@gmail.com" aria-label="Send an email">
                  <i className="fas fa-envelope" />
                </Social>
                <Social href="https://twitter.com/saynam_sharma" target="_blank" rel="noopener noreferrer" aria-label="Open X profile">
                  <i className="fab fa-twitter" />
                </Social>
              </SocialRow>
            </div>

            <Column>
              <h3>Navigation</h3>
              <LinkList>
                <LinkItem><a href="/#services">Services</a></LinkItem>
                <LinkItem><a href="/#outcomes">Outcomes</a></LinkItem>
                <LinkItem><a href="/#projects">Case Studies</a></LinkItem>
                <LinkItem><a href="/#experience">Credibility</a></LinkItem>
                <LinkItem><a href="/#contact">Contact</a></LinkItem>
              </LinkList>
            </Column>

            <Column>
              <h3>Contact</h3>
              <LinkList>
                <LinkItem><a href="mailto:saynam1101@gmail.com">saynam1101@gmail.com</a></LinkItem>
                <LinkItem><a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a></LinkItem>
                <LinkItem><a href="/#contact">Freelance + Hiring Inquiries</a></LinkItem>
              </LinkList>
            </Column>
          </Top>

          <Bottom>
            <Copyright>© {currentYear} Saynam Sharma. All rights reserved.</Copyright>
            <Tagline>Built for data systems and web product outcomes.</Tagline>
          </Bottom>
        </AnimatedSection>
      </Container>
    </FooterShell>
  );
};

export default Footer;
