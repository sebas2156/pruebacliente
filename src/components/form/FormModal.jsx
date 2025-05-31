import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { X, Check, AlertCircle } from "lucide-react";
import { theme } from "../../styles/theme";

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  title,
  fields,
  initialData = {},
  errors = {},
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        
        <TitleSection>
          <ModalTitle>
            {mode === "add" ? "Nuevo " : "Editar "}
            {title}
          </ModalTitle>
          <ModalUnderline />
        </TitleSection>

        <Form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <FormGroup key={field.name}>
              <Label>
                {field.label}
                {field.required && <Required>*</Required>}
              </Label>
              {field.type === 'select' ? (
                <Select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  $hasError={errors[field.name]}
                >
                  <option value="" disabled>{field.placeholder}</option>
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  $hasError={errors[field.name]}
                />
              )}
              {errors[field.name] && (
                <ErrorText>
                  <AlertCircle size={14} />
                  {errors[field.name]}
                </ErrorText>
              )}
            </FormGroup>
          ))}

          <ActionContainer>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit">
              <Check size={18} />
              {mode === "add" ? "Crear " : "Guardar "}
              {title}
            </SubmitButton>
          </ActionContainer>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default FormModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background: white;
  padding: 32px;
  border-radius: ${theme.borderRadius.large}; // Cambiado de xlarge a large
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: ${theme.boxShadows.large}; // Cambiado de shadow a boxShadows
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.gray};
  padding: 4px;
  border-radius: 50%;
  transition: all ${theme.transitions.short};

  &:hover {
    color: ${theme.colors.primaryDark};
    background: ${theme.colors.lightGray};
  }
`;

const TitleSection = styled.div`
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  color: ${theme.colors.primaryDark};
  font-size: ${theme.fontSizes.xxl};
  margin-bottom: 8px;
`;

const ModalUnderline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(
    90deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  border-radius: 2px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.darkGray};
  font-weight: ${theme.fontWeights.medium};
`;

const Required = styled.span`
  color: ${theme.colors.error};
  margin-left: 4px;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 2px solid
    ${(props) => (props.$hasError ? theme.colors.error : theme.colors.lightGray)};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.fontSizes.sm};
  transition: all ${theme.transitions.short};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.gray};
  }
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 2px solid
    ${(props) => (props.$hasError ? theme.colors.error : theme.colors.lightGray)};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.fontSizes.sm};
  transition: all ${theme.transitions.short};
  background-color: white;
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

const ErrorText = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.fontSizes.xs};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const BaseButton = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: ${theme.borderRadius.medium};
  font-weight: ${theme.fontWeights.semiBold};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all ${theme.transitions.short};
`;

const CancelButton = styled(BaseButton)`
  background: ${theme.colors.lightGray};
  color: ${theme.colors.darkGray};

  &:hover {
    background: ${theme.colors.gray};
    color: white;
  }
`;

const SubmitButton = styled(BaseButton)`
  background: ${theme.colors.primary};
  color: white;
  box-shadow: ${theme.boxShadows.small};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;