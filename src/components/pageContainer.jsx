import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

const PageContainer = ({ title, children }) => {
  return (
    <Container>
      <TitleSection>
        <Title>{title}</Title>
        <Underline />
      </TitleSection>
      <Content>{children}</Content>
    </Container>
  );
};

export default PageContainer;

const Container = styled.div`
  width: calc(100vw - 250px);
  height: calc(100vh - 60px);
  padding: 20px;
`;

const TitleSection = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: ${theme.colors.primaryDark};
  margin-bottom: 12px;
  font-weight: 600;
  position: relative;
`;

const Underline = styled.div`
  width: 60px;
  height: 5px;
  background: linear-gradient(
    90deg,
    ${theme.colors.primaryDark} 0%,
    ${theme.colors.primaryDark}80 100%
  );
  border-radius: ${theme.borderRadius.large};
  position: relative;
  
  &::after {
  
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 100%;
    background: ${theme.colors.primaryDark};
    border-radius: ${theme.borderRadius.large};
    animation: shimmer 2s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(0px);
      opacity: 0.8;
    }
    50% {
      transform: translateX(40px);
      opacity: 1;
    }
    100% {
      transform: translateX(0px);
      opacity: 0.8;
    }
  }
`;

const Content = styled.div`
  animation: fadeIn 0.6s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;