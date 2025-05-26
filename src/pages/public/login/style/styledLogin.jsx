import styled from "styled-components";
import { theme } from "../../../../styles/theme";
export const LoginSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  isolation: isolate;
  background: ${theme.colors.dark};
  transition: all ${theme.transitions.long};
  transform: ${(props) =>
    props.logged ? "translateY(-100%)" : "translateY(0)"};
  padding: 1.5rem;
`;

export const LoginBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
`;

export const LoginBubble = styled.div`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${theme.colors.primaryLight},
    ${theme.colors.primary}
  );
  opacity: 0.1;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  filter: blur(20px);
  animation: float 8s ease-in-out infinite;
  animation-delay: ${(props) => props.delay};

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.05);
    }
  }
`;

export const LoginCard = styled.div`
  max-width: 450px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const LoginHeader = styled.div`
  padding: 2.5rem 2rem 0;
  text-align: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export const LogoCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(46, 139, 87, 0.25);
`;

export const LogoText = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${theme.colors.light};
  letter-spacing: 0.5px;
`;

export const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.light};
  margin: 0 0 0.5rem;
`;

export const LoginSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};
  margin: 0 0 1rem;
`;

export const LoginForm = styled.form`
  padding: 1.5rem 2rem;
`;

export const FormTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.light};
  margin-bottom: 1.5rem;
`;

export const InputGroup = styled.div`
  margin-bottom: 1.25rem;
`;

export const ForgotPassword = styled.div`
  text-align: right;
  margin: -0.5rem 0 1.5rem;

  a {
    font-size: 0.85rem;
    color: ${theme.colors.secondary};
    text-decoration: none;
    transition: color ${theme.transitions.short};

    &:hover {
      color: ${theme.colors.primaryLight};
      text-decoration: underline;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0;
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(
    to right,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.medium};
  padding: 0.875rem;
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

export const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
`;

export const Divider = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
`;

export const DividerText = styled.span`
  padding: 0 1rem;
  color: ${theme.colors.textSecondary};
  font-size: 0.85rem;
`;

export const GuestButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const GuestButton = styled.button`
  background: transparent;
  color: ${theme.colors.textSecondary};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.medium};
  padding: 0.75rem 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${theme.transitions.short};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${theme.colors.light};
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const LoginFooter = styled.div`
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: auto;
`;

export const FooterText = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.gray};
`;
