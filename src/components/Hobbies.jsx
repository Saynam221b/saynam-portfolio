import React from 'react';
    import styled from 'styled-components';
    import { motion } from 'framer-motion';
    
    const HobbiesContainer = styled(motion.div)`
      padding: 2rem;
      min-height: 100vh;
    `;
    
    const Title = styled(motion.h2)`
      font-size: 2rem;
      margin-bottom: 1.5rem;
      text-align: center;
    `;
    
    const HobbiesList = styled(motion.ul)`
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    `;
    
    const HobbyItem = styled(motion.li)`
      background-color: #2a2a2a;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      width: 200px;
      text-align: center;
      transition: transform 0.3s ease;
    
      &:hover {
        transform: translateY(-5px);
      }
    `;
    
    const HobbyTitle = styled.h3`
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
    
    function Hobbies() {
      const hobbies = [
        { title: 'Photography' },
        { title: 'Hiking' },
        { title: 'Gaming' },
        { title: 'Reading' },
        { title: 'Coding' },
        { title: 'Traveling' },
      ];
    
      return (
        <HobbiesContainer
          id="hobbies"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={itemVariants}>My Hobbies</Title>
          <HobbiesList>
            {hobbies.map((hobby, index) => (
              <HobbyItem key={index} variants={itemVariants}>
                <HobbyTitle>{hobby.title}</HobbyTitle>
              </HobbyItem>
            ))}
          </HobbiesList>
        </HobbiesContainer>
      );
    }
    
    export default Hobbies;
