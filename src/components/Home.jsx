import React from 'react';
    import styled from 'styled-components';
    import { motion } from 'framer-motion';
    
    const HomeContainer = styled(motion.div)`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
      min-height: 100vh;
    `;
    
    const Title = styled(motion.h1)`
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #fff;
    `;
    
    const Subtitle = styled(motion.p)`
      font-size: 1.2rem;
      color: #ddd;
      margin-bottom: 2rem;
    `;
    
    const Button = styled(motion.a)`
      background-color: #00bcd4;
      color: #fff;
      padding: 1rem 2rem;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      transition: background-color 0.3s ease;
    
      &:hover {
        background-color: #008ba3;
      }
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
    
    function Home() {
      return (
        <HomeContainer
          id="home"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={itemVariants}>
            Welcome to My Portfolio
          </Title>
          <Subtitle variants={itemVariants}>
            A Data Engineer passionate about building scalable and efficient data solutions.
          </Subtitle>
          <Button
            href="#projects"
            variants={itemVariants}
          >
            View My Projects
          </Button>
        </HomeContainer>
      );
    }
    
    export default Home;
