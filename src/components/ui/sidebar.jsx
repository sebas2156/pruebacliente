import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { theme } from "../../styles/theme";
import ResidentsIcon from "../../assets/icons/residentsIcon";
import PaymentsIcon from "../../assets/icons/paymentsIcon";
import InvoicesIcon from "../../assets/icons/invoicesIcon";
import PropertiesIcon from "../../assets/icons/propertiesIcon";
import ReportsIcon from "../../assets/icons/reportsIcon";
import SettingsIcon from "../../assets/icons/settingsIcon";
import DashboardIcon from "../../assets/icons/dashboardIcon";
import CollapseIcon from "../../assets/icons/collapseIcon";
import ExpandIcon from "../../assets/icons/expandIcon";
import { ROUTES } from "../../constants/routes";
const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    title: "Usuarios",
    icon: <ResidentsIcon />,
    path: ROUTES.USERS,
  },
  {
    title: "Facturas",
    icon: <InvoicesIcon />,
    path: ROUTES.FACTURAS,
  },
  {
    title: "Pagos",
    icon: <PaymentsIcon />,
    path: "/pagos",
  },

  {
    title: "Propiedades",
    icon: <PropertiesIcon />,
    path: "/propiedades",
  },
  {
    title: "Reportes",
    icon: <ReportsIcon />,
    path: "/reportes",
  },
  {
    title: "Configuración",
    icon: <SettingsIcon />,
    path: "/configuracion",
  },
];

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContainer $collapsed={true}>
      <SidebarHeader>
        <LogoContainer>
          {!isCollapsed ? (
            <>
              <LogoIcon>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="8" fill="currentColor" />
                  <path
                    d="M22 13H19V10C19 9.45 18.55 9 18 9H14C13.45 9 13 9.45 13 10V13H10C9.45 13 9 13.45 9 14V18C9 18.55 9.45 19 10 19H13V22C13 22.55 13.45 23 14 23H18C18.55 23 19 22.55 19 22V19H22C22.55 19 23 18.55 23 18V14C23 13.45 22.55 13 22 13Z"
                    fill="white"
                  />
                </svg>
              </LogoIcon>
              <LogoText>ResidPay</LogoText>
            </>
          ) : (
            <LogoIconCollapsed>
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="8" fill="currentColor" />
                <path
                  d="M22 13H19V10C19 9.45 18.55 9 18 9H14C13.45 9 13 9.45 13 10V13H10C9.45 13 9 13.45 9 14V18C9 18.55 9.45 19 10 19H13V22C13 22.55 13.45 23 14 23H18C18.55 23 19 22.55 19 22V19H22C22.55 19 23 18.55 23 18V14C23 13.45 22.55 13 22 13Z"
                  fill="white"
                />
              </svg>
            </LogoIconCollapsed>
          )}
        </LogoContainer>
        <CollapseButton
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expandir" : "Colapsar"}
        >
          {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
        </CollapseButton>
      </SidebarHeader>

      <SidebarMenu>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <SidebarMenuItem
              key={index}
              to={item.path}
              $active={isActive}
              $collapsed={isCollapsed}
            >
              <MenuItemIconWrapper $active={isActive}>
                {item.icon}
              </MenuItemIconWrapper>
              {!isCollapsed && <MenuItemText>{item.title}</MenuItemText>}
              {isCollapsed && <MenuTooltip>{item.title}</MenuTooltip>}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>

      <SidebarFooter>
        <FooterContent $collapsed={isCollapsed}>
          {!isCollapsed ? (
            <span>© {new Date().getFullYear()} ResidPay</span>
          ) : (
            <span>©</span>
          )}
        </FooterContent>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.collapsed ? "72px" : "250px")};
  height: 100vh;
  background: linear-gradient(
    180deg,
    ${theme.colors.dark} 0%,
    ${theme.colors.darkSecondary} 100%
  );
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  left: 0;
  top: 0;
  z-index: 1000;
  transition: width ${theme.transitions.medium};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  overflow-x: hidden;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md};
  height: 70px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  height: 100%;
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  animation: ${fadeIn} ${theme.transitions.medium};
`;

const LogoIconCollapsed = styled(LogoIcon)`
  margin: 0 auto;
`;

const LogoText = styled.h1`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.lightGray};
  margin: 0;
  letter-spacing: 0.5px;
  animation: ${fadeIn} ${theme.transitions.medium};
`;

const CollapseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: ${theme.colors.gray};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  width: 28px;
  height: 28px;
  border-radius: ${theme.borderRadius.small};
  transition: all ${theme.transitions.short};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.light};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  gap: 8px;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: ${theme.borderRadius.pill};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MenuItemIconWrapper = styled.span`
  display: flex;
  align-items: center;

  justify-content: center;
  color: ${(props) => (props.$active ? theme.colors.light : theme.colors.gray)};
  transition: all ${theme.transitions.short};
`;

const MenuTooltip = styled.span`
  position: absolute;

  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: ${theme.colors.darkSecondary};
  color: ${theme.colors.light};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all ${theme.transitions.short};
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 2px solid ${theme.colors.primary};
  pointer-events: none;
  margin-left: ${theme.spacing.md};
`;

const SidebarMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  text-decoration: none;
  padding: 14px;
  margin: 5px;
  ${(props) => (props.$collapsed ? theme.spacing.xs : theme.spacing.md)};
  color: ${(props) => (props.$active ? theme.colors.light : theme.colors.gray)};
  font-weight: ${(props) =>
    props.$active ? theme.fontWeights.medium : theme.fontWeights.regular};
  border-radius: ${theme.borderRadius.medium};
  transition: all ${theme.transitions.short};
  position: relative;
  overflow: hidden;
  height: 45px;
  ${(props) =>
    props.$active &&
    css`
      background: ${theme.colors.primaryDark}40;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: ${theme.colors.primary};
        border-radius: 0 2px 2px 0;
      }
    `}

  &:hover {
    color: ${theme.colors.light};
    background: ${(props) =>
      props.$active
        ? `${theme.colors.primaryDark}60`
        : "rgba(255, 255, 255, 0.06)"};
    transform: translateX(2px);

    ${MenuTooltip} {
      opacity: 1;
      visibility: visible;
    }
  }

  &:active {
    transform: translateX(0) scale(0.98);
  }

  ${(props) =>
    props.$collapsed &&
    css`
      justify-content: center;
      padding: ${theme.spacing.md} ${theme.spacing.sm};
    `}
`;

const MenuItemText = styled.span`
  font-size: ${theme.fontSizes.sm};
  white-space: nowrap;
  transition: all ${theme.transitions.short};
`;

const SidebarFooter = styled.div`
  padding: ${theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterContent = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.gray};
  width: 100%;
  text-align: ${(props) => (props.$collapsed ? "center" : "left")};
  opacity: 0.8;
`;
