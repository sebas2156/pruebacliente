import React, { useId } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
const Input = ({
  title,
  placeholder,
  onChange,
  value,
  type = "text",
  dark,
  required,
  disabled,
  error,
  helperText,
}) => {
  const id = useId();

  return (
    <Container>
      <Label htmlFor={id} dark={dark} required={required}>
        {title}
      </Label>
      <InputWrapper>
        <StyledInput
          id={id}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          dark={dark}
          disabled={disabled}
          hasError={error}
        />
        {type === "password" && (
          <PasswordToggleIcon>
            {/* Puedes agregar un icono para mostrar/ocultar contraseña aquí */}
          </PasswordToggleIcon>
        )}
      </InputWrapper>
      {helperText && (
        <HelperText error={error} dark={dark}>
          {helperText}
        </HelperText>
      )}
      {error && <ErrorMessage dark={dark}>{error}</ErrorMessage>}
    </Container>
  );
};

export default Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 14rem;
  position: relative;
  margin-bottom: ${theme.spacing.md};
`;

const Label = styled.label`
  padding-left: ${theme.spacing.sm};
  padding-bottom: ${theme.spacing.xxs};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${({ dark }) => (dark ? theme.colors.textPrimary : theme.colors.dark)};
  transition: color ${theme.transitions.short};

  ${({ required }) =>
    required &&
    css`
      &::after {
        content: " *";
        color: ${theme.colors.error};
        font-weight: ${theme.fontWeights.bold};
      }
    `}
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  font-size: ${theme.fontSizes.sm};
  width: 100%;
  padding: 10px;
  border-radius: ${theme.borderRadius.medium};
  outline: none;
  transition: all ${theme.transitions.medium};
  border: 1px solid;
  font-weight: ${theme.fontWeights.medium};

  background-color: ${({ dark }) =>
    dark ? "rgba(255, 255, 255, 0.07)" : theme.colors.light};
  color: ${({ dark }) =>
    dark ? theme.colors.textPrimary : theme.colors.textDark};
  border-color: ${({ dark, hasError }) =>
    hasError
      ? theme.colors.error
      : dark
      ? "rgba(255, 255, 255, 0.1)"
      : theme.colors.gray};

  ::placeholder {
    color: ${({ dark }) =>
      dark ? "rgba(255,255,255,0.3)" : theme.colors.gray};
    font-weight: ${theme.fontWeights.regular};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(46, 139, 87, 0.15);
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ dark }) =>
      dark ? "rgba(255, 255, 255, 0.2)" : theme.colors.primaryLight};
  }

  &:disabled {
    background-color: ${({ dark }) =>
      dark ? "rgba(255, 255, 255, 0.05)" : theme.colors.lightGray};
    cursor: not-allowed;
    color: ${({ dark }) =>
      dark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.4)"};
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${theme.colors.error} !important;
      box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.15);
    `}
`;

const PasswordToggleIcon = styled.span`
  position: absolute;
  right: ${theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: ${theme.fontSizes.xs};
  margin-top: ${theme.spacing.xxs};
  padding-left: ${theme.spacing.sm};
  margin-bottom: 0;
`;

const HelperText = styled.p`
  color: ${({ error, dark }) =>
    error
      ? theme.colors.error
      : dark
      ? theme.colors.textSecondary
      : theme.colors.gray};
  font-size: ${theme.fontSizes.xs};
  margin-top: ${theme.spacing.xxs};
  padding-left: ${theme.spacing.sm};
  margin-bottom: 0;
`;
