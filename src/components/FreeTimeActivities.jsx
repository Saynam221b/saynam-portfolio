import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCamera, FaHiking, FaGamepad, FaBook, FaCode, FaPlane } from 'react-icons/fa';

const ActivitiesContainer = styled.section`
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

const ActivitiesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ActivityCard = styled(motion.div)`
  background-color: ${props => props.theme.cardBg};
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.text.primary}10;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, 
      ${props => props.accentColor || props.theme.primary}, 
      ${props => props.accentColor || props.theme.primary}80
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.cardHoverShadow};
    
    &::before {
      opacity: 1;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  position: relative;
  color: ${props => props.accentColor || props.theme.primary};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${props => props.accentColor || props.theme.primary}15;
    z-index: -1;
    transition: transform 0.3s ease;
    transform: scale(0.8);
  }
  
  ${ActivityCard}:hover &::before {
    transform: scale(1.1);
  }
  
  svg {
    transition: transform 0.3s ease;
  }

  ${ActivityCard}:hover & svg {
    transform: scale(1.1);
  }
`;

const ActivityTitle = styled.h3`
  color: ${props => props.theme.text.primary};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ActivityDescription = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 auto;
  max-width: 260px;
`;

const activityColors = {
  Photography: "#FF6B6B", // Coral
  Hiking: "#4CAF50",      // Green
  Gaming: "#9C27B0",      // Purple
  Reading: "#2196F3",     // Blue
  Coding: "#FF9800",      // Orange
  Traveling: "#00BCD4"    // Teal
};

const activities = [
  {
    icon: <FaCamera />,
    title: "Photography",
    description: "Capturing moments and exploring visual storytelling through both digital and film photography."
  },
  {
    icon: <FaHiking />,
    title: "Hiking",
    description: "Exploring nature trails and discovering new landscapes, particularly in the mountains."
  },
  {
    icon: <FaGamepad />,
    title: "Gaming",
    description: "Enjoying strategic games and immersive experiences that challenge problem-solving skills."
  },
  {
    icon: <FaBook />,
    title: "Reading",
    description: "Expanding knowledge through technical books, science fiction, and philosophy literature."
  },
  {
    icon: <FaCode />,
    title: "Coding",
    description: "Building open-source side projects and learning new programming languages and frameworks."
  },
  {
    icon: <FaPlane />,
    title: "Traveling",
    description: "Experiencing different cultures, cuisines, and exploring both urban and natural environments."
  }
];

function FreeTimeActivities() {
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
    <ActivitiesContainer id="free-time">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Interests & Activities
      </SectionTitle>
      
      <ActivitiesGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {activities.map((activity, index) => (
          <ActivityCard 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            accentColor={activityColors[activity.title]}
          >
            <IconWrapper accentColor={activityColors[activity.title]}>
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