import React from 'react';
import styled from 'styled-components';
import { FaCamera, FaHiking, FaGamepad, FaBook, FaCode, FaPlane } from 'react-icons/fa';

const ActivitiesContainer = styled.section`
  padding: 4rem 2rem;
  background: transparent;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text.primary};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ActivityCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(15, 23, 42, 0.1)'
  };
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    background-color: ${props => props.theme.cardHoverBg};
    box-shadow: ${props => props.theme.cardHoverShadow};
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.text.accent};
  margin-bottom: 1rem;
  
  svg {
    transition: transform 0.3s ease;
  }

  ${ActivityCard}:hover & svg {
    transform: scale(1.1);
  }
`;

const ActivityTitle = styled.h3`
  color: ${props => props.theme.text.primary};
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const ActivityDescription = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 1rem;
  line-height: 1.6;
`;

const activities = [
  {
    icon: <FaCamera />,
    title: "Photography",
    description: "Capturing moments and exploring visual storytelling through the lens."
  },
  {
    icon: <FaHiking />,
    title: "Hiking",
    description: "Exploring nature trails and discovering new landscapes."
  },
  {
    icon: <FaGamepad />,
    title: "Gaming",
    description: "Enjoying strategic games and immersive experiences."
  },
  {
    icon: <FaBook />,
    title: "Reading",
    description: "Expanding knowledge through books and technical literature."
  },
  {
    icon: <FaCode />,
    title: "Coding",
    description: "Building side projects and learning new technologies."
  },
  {
    icon: <FaPlane />,
    title: "Traveling",
    description: "Experiencing different cultures and exploring new places."
  }
];

function FreeTimeActivities() {
  return (
    <ActivitiesContainer id="free-time">
      <SectionTitle>Free Time Activities</SectionTitle>
      <ActivitiesGrid>
        {activities.map((activity, index) => (
          <ActivityCard key={index}>
            <IconWrapper>
              {activity.icon}
            </IconWrapper>
            <ActivityTitle>{activity.title}</ActivityTitle>
            <ActivityDescription>{activity.description}</ActivityDescription>
          </ActivityCard>
        ))}
      </ActivitiesGrid>
    </ActivitiesContainer>
  );
}

export default FreeTimeActivities;