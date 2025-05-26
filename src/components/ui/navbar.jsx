import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme"; 
import SearchIcon from "../../assets/icons/searchIcon";
import BellIcon from "../../assets/icons/bellIcon";
import ChevronDownIcon from "../../assets/icons/chevronDownIcon";
import ProfileIcon from "../../assets/icons/profileIcon";
import SettingsIcon from "../../assets/icons/settingsIcon";
import LogoutIcon from "../../assets/icons/logoutIcon";

const Navbar = ({ sidebarWidth = "260px" }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsBadge, setNotificationsBadge] = useState(3);

  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "Pago recibido",
      message: "Juan Pérez ha realizado un pago de $150.00",
      time: "Hace 10 minutos",
      read: false,
    },
  ];

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setNotificationsOpen(false);
  };

  const markAllAsRead = () => {
    setNotificationsBadge(0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        notificationsOpen
      ) {
        setNotificationsOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        profileOpen
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationsOpen, profileOpen]);

  return (
    <NavbarContainer sidebarWidth={sidebarWidth}>
      <NavbarLeft>
        <SearchContainer>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <SearchInput placeholder="Buscar..." />
        </SearchContainer>
      </NavbarLeft>

      <NavbarRight>
        <NavButton onClick={toggleNotifications} ref={notificationsRef}>
          <BellIcon />
          {notificationsBadge > 0 && <Badge>{notificationsBadge}</Badge>}
          {notificationsOpen && (
            <NotificationsDropdown>
              <DropdownHeader>
                <DropdownTitle>Notificaciones</DropdownTitle>
                <MarkAllButton onClick={markAllAsRead}>
                  Marcar todas como leídas
                </MarkAllButton>
              </DropdownHeader>
              <NotificationsList>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    read={notification.read}
                  >
                    <NotificationContent>
                      <NotificationTitle>
                        {notification.title}
                      </NotificationTitle>
                      <NotificationMessage>
                        {notification.message}
                      </NotificationMessage>
                      <NotificationTime>{notification.time}</NotificationTime>
                    </NotificationContent>
                    {!notification.read && <UnreadDot />}
                  </NotificationItem>
                ))}
              </NotificationsList>
              <DropdownFooter>
                <ViewAllLink>Ver todas las notificaciones</ViewAllLink>
              </DropdownFooter>
            </NotificationsDropdown>
          )}
        </NavButton>

        <ProfileContainer onClick={toggleProfile} ref={profileRef}>
          <ProfileAvatar>
            <ProfileInitials>JP</ProfileInitials>
          </ProfileAvatar>
          <ProfileName>Juan Pérez</ProfileName>
          <ProfileArrow>
            <ChevronDownIcon />
          </ProfileArrow>

          {profileOpen && (
            <ProfileDropdown>
              <ProfileDropdownHeader>
                <ProfileDropdownAvatar>
                  <ProfileInitials>JP</ProfileInitials>
                </ProfileDropdownAvatar>
                <ProfileDropdownInfo>
                  <ProfileDropdownName>Juan Pérez</ProfileDropdownName>
                  <ProfileDropdownEmail>
                    juan.perez@gmail.com
                  </ProfileDropdownEmail>
                </ProfileDropdownInfo>
              </ProfileDropdownHeader>

              <ProfileDropdownDivider />

              <ProfileDropdownItem>
                <ProfileIcon />
                <span>Mi perfil</span>
              </ProfileDropdownItem>

              <ProfileDropdownItem>
                <SettingsIcon />
                <span>Configuración</span>
              </ProfileDropdownItem>

              <ProfileDropdownDivider />

              <ProfileDropdownItem className="logout">
                <LogoutIcon />
                <span>Cerrar sesión</span>
              </ProfileDropdownItem>
            </ProfileDropdown>
          )}
        </ProfileContainer>
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  top: 0;
  right: 0;
  left: ${(props) => props.sidebarWidth || "260px"};
  z-index: 100;
  transition: left 0.3s ease;
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray};
`;

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 8px 12px 8px 38px;
  border: 1px solid ${theme.colors.gray};
  border-radius: 4px;
  font-size: 14px;
  color: ${theme.colors.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }

  &::placeholder {
    color: ${theme.colors.gray};
  }
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 8px;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  color: ${theme.colors.gray};
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.gray};
    color: ${theme.colors.gray};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
  background-color: ${theme.colors.gray};
  border-radius: 9px;
`;

const NotificationsDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: -10px;
  width: 320px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 100;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${theme.colors.gray};
`;

const DropdownTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: ${theme.colors.gray};
`;

const MarkAllButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.primary};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
    text-decoration: underline;
  }
`;

const NotificationsList = styled.div`
  max-height: 320px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${theme.colors.gray};
  background-color: ${(props) =>
    props.read ? "transparent" : theme.colors.blue};
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.gray};
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: ${theme.colors.gray};
`;

const NotificationMessage = styled.p`
  font-size: 13px;
  margin: 0 0 4px 0;
  color: ${theme.colors.gray};
`;

const NotificationTime = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray};
`;

const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  margin-left: 8px;
  margin-top: 6px;
  background-color: ${theme.colors.blue};
  border-radius: 50%;
`;

const DropdownFooter = styled.div`
  padding: 12px 16px;
  border-top: 1px solid ${theme.colors.gray};
  text-align: center;
`;

const ViewAllLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.primary};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
    text-decoration: underline;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.gray};
  }
`;

const ProfileAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${theme.colors.primary};
  color: #ffffff;
  border-radius: 50%;
  font-weight: 600;
`;

const ProfileInitials = styled.span`
  font-size: 13px;
`;

const ProfileName = styled.span`
  margin: 0 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.gray[700]};
`;

const ProfileArrow = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.gray};
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 240px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 100;
`;

const ProfileDropdownHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const ProfileDropdownAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.primary};
  color: #ffffff;
  border-radius: 50%;
  font-weight: 600;
  margin-right: 12px;
`;

const ProfileDropdownInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileDropdownName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray};
`;

const ProfileDropdownEmail = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray};
  margin-top: 2px;
`;

const ProfileDropdownDivider = styled.div`
  height: 1px;
  background-color: ${theme.colors.gray};
  margin: 8px 0;
`;

const ProfileDropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  font-size: 14px;
  color: ${theme.colors.gray[700]};
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    margin-right: 10px;
    color: ${theme.colors.gray};
  }

  &:hover {
    background-color: ${theme.colors.gray};
  }

  &.logout {
    color: ${theme.colors.red};

    svg {
      color: ${theme.colors.red};
    }
  }
`;
