import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Button = ({ text, disabled, onClick }) => {
  return (
    <ButtonContainer>
      <SubmitButton onClick={onClick} disabled={disabled}>
        {text}
      </SubmitButton>
    </ButtonContainer>
  );
};

export default Button;
 const ButtonContainer = styled.div`
  margin: 10px;
`;
 const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(
    to right,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.medium};
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.short};
  box-shadow: 0 4px 10px rgba(46, 139, 87, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(46, 139, 87, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${theme.colors.gray};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
