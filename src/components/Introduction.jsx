import React from 'react';
    import styled from 'styled-components';
    import { motion } from 'framer-motion';
    
    const IntroductionContainer = styled(motion.div)`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
      min-height: calc(100vh - 60px);
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
    
    function Introduction() {
      return (
        <IntroductionContainer
          id="introduction"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Title variants={itemVariants}>
            Hello, I'm Saynam, a Data Engineer
          </Title>
          <Subtitle variants={itemVariants}>
          With over 2 years in designing and optimizing data infrastructure and ETL pipelines, leveraging tools like Python, SQL, Snowflake, Databricks, and AWS (S3, Glue, Lambda). Skilled in building scalable data solutions and streamlining data workflows with Apache Airflow to support analytics and business intelligence needs. Successfully migrated legacy systems to serverless architectures on AWS, achieving notable cost savings and improved performance. Known for a hands-on approach to data engineering, with a strong focus on data accessibility, pipeline reliability, and efficient data processing
          </Subtitle>
          <Button
            href="https://5nhj4mbbqhp4fsgg.public.blob.vercel-storage.com/resume-g4oaCPtkMcxj6VcTzAMSbwmhaFBemF.pdf"
            variants={itemVariants}
            download
          >
            Download My Resume
          </Button>
        </IntroductionContainer>
      );
    }
    
    export default Introduction;
