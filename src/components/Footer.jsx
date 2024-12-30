import React from 'react';
    import styled from 'styled-components';
    
    const FooterContainer = styled.footer`
      background-color: #2a2a2a;
      padding: 1rem 2rem;
      text-align: center;
      margin-top: auto;
      position: relative;
    `;
    
    function Footer() {
      return (
        <FooterContainer>
          <p>&copy; {new Date().getFullYear()} Data Engineer Portfolio</p>
        </FooterContainer>
      );
    }
    
    export default Footer;
