import React from 'react';
    import styled from 'styled-components';
    import { motion } from 'framer-motion';
    import {
      FaCamera,
      FaHiking,
      FaGamepad,
      FaBook,
      FaCode,
      FaPlane,
    } from 'react-icons/fa';
    
    const FreeTimeContainer = styled(motion.div)`
      padding: 2rem;
      min-height: calc(100vh - 60px);
    `;
    
    const Title = styled(motion.h2)`
      font-size: 2rem;
      margin-bottom: 1.5rem;
      text-align: center;
    `;
    
    const ActivitiesList = styled(motion.ul)`
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      justify-items: center;
    `;
    
    const ActivityItem = styled(motion.li)`
      background-color: #475569;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      width: 100%;
      text-align: center;
      transition: transform 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
    
      &:hover {
        transform: translateY(-5px);
      }
    `;
    
    const ActivityIcon = styled(motion.span)`
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    `;
    
    const ActivityTitle = styled(motion.h3)`
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    `;
    
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2,
        },
      },
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };
    
    function FreeTimeActivities() {
      const activities = [
        { title: 'Photography', icon: <FaCamera /> },
        { title: 'Hiking', icon: <FaHiking /> },
        { title: 'Gaming', icon: <FaGamepad /> },
        { title: 'Reading', icon: <FaBook /> },
        { title: 'Coding', icon: <FaCode /> },
        { title: 'Traveling', icon: <FaPlane /> },
      ];
    
      return (
        <FreeTimeContainer
          id="free-time"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Title variants={itemVariants}>My Free Time Activities</Title>
          <ActivitiesList>
            {activities.map((activity, index) => (
              <ActivityItem key={index} variants={itemVariants}>
                <ActivityIcon>{activity.icon}</ActivityIcon>
                <ActivityTitle>{activity.title}</ActivityTitle>
              </ActivityItem>
            ))}
          </ActivitiesList>
        </FreeTimeContainer>
      );
    }
    
    export default FreeTimeActivities;
