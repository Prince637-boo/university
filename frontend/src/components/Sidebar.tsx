import React, { useState } from "react";
import styled from "styled-components";
import {
  FaUserPlus,
  FaListUl,
  FaAngleLeft,
  FaAngleRight,
  FaHome,
  FaUniversity,
  FaBuilding,
  FaBook,
  FaChalkboardTeacher,
  FaClipboardList,
  FaSignInAlt,
  FaUser,
  FaCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SidebarContainer = styled.div<{ collapsed: boolean }>`
  width: ${(props) => (props.collapsed ? "80px" : "250px")};
  height: 100vh;
  background: linear-gradient(180deg, #2d3e50 0%, #1a2533 100%);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.collapsed ? "center" : "flex-start")};
  transition: width 0.3s ease;
  overflow-y: auto;
`;

const LogoSection = styled.div<{ collapsed: boolean }>`
  padding: 0 20px 20px;
  border-bottom: 1px solid #3c4a5a;
  margin-bottom: 20px;
  text-align: ${(props) => (props.collapsed ? "center" : "left")};
`;

const Logo = styled.h2<{ collapsed: boolean }>`
  margin: 0;
  font-size: ${(props) => (props.collapsed ? "1.2rem" : "1.5rem")};
  color: #4fc3f7;
  transition: font-size 0.3s;
`;

const ToggleButton = styled.button<{ collapsed: boolean }>`
  background: #223044;
  color: #4fc3f7;
  border: none;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  align-self: ${(props) => (props.collapsed ? "center" : "flex-end")};
  margin: 0 20px 20px;
  transition: all 0.2s;
  &:hover {
    background: #1a2533;
    transform: scale(1.05);
  }
`;

const NavList = styled.ul<{ collapsed: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const NavSection = styled.div<{ collapsed: boolean }>`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3<{ collapsed: boolean }>`
  color: #a0a0a0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 15px 20px 10px;
  display: ${(props) => (props.collapsed ? "none" : "block")};
`;

const NavItem = styled.li<{ collapsed: boolean; active?: boolean }>`
  width: 100%;
`;

const StyledLink = styled(Link)<{ collapsed: boolean; active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.collapsed ? "0" : "16px")};
  padding: 12px 20px;
  font-size: 16px;
  color: ${(props) => (props.active ? "#4fc3f7" : "#fff")};
  text-decoration: none;
  width: 100%;
  justify-content: ${(props) => (props.collapsed ? "center" : "flex-start")};
  background: ${(props) => (props.active ? "#223044" : "none")};
  border-left: ${(props) => (props.active ? "4px solid #4fc3f7" : "4px solid transparent")};
  transition: all 0.2s ease;

  &:hover {
    background: #223044;
    color: #4fc3f7;
    border-left-color: #4fc3f7;
  }

  svg {
    font-size: 20px;
    color: #4fc3f7;
    min-width: 20px;
  }

  span {
    display: ${(props) => (props.collapsed ? "none" : "inline")};
    white-space: nowrap;
    transition: opacity 0.3s;
  }
`;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const handleToggle = () => setCollapsed((c) => !c);

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarContainer collapsed={collapsed}>
      <LogoSection collapsed={collapsed}>
        <Logo collapsed={collapsed}>UnivSys</Logo>
      </LogoSection>

      <ToggleButton
        collapsed={collapsed}
        onClick={handleToggle}
        title={collapsed ? "Ouvrir le menu" : "Réduire le menu"}
      >
        {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </ToggleButton>

      <NavList collapsed={collapsed}>
        <NavSection collapsed={collapsed}>
          <SectionTitle collapsed={collapsed}>Navigation</SectionTitle>
          <NavItem collapsed={collapsed}>
            <StyledLink to="/" collapsed={collapsed} active={isActive("/")}>
              <FaHome />
              <span>Accueil</span>
            </StyledLink>
          </NavItem>
        </NavSection>

        {isAuthenticated && (
          <>
            <NavSection collapsed={collapsed}>
              <SectionTitle collapsed={collapsed}>Étudiants</SectionTitle>
              <NavItem collapsed={collapsed}>
                <StyledLink to="/students" collapsed={collapsed} active={isActive("/students")}>
                  <FaListUl />
                  <span>Liste des Étudiants</span>
                </StyledLink>
              </NavItem>
              <NavItem collapsed={collapsed}>
                <StyledLink to="/students/new" collapsed={collapsed} active={isActive("/students/new")}>
                  <FaUserPlus />
                  <span>Ajouter Étudiant</span>
                </StyledLink>
              </NavItem>
            </NavSection>

            <NavSection collapsed={collapsed}>
              <SectionTitle collapsed={collapsed}>Structure</SectionTitle>
              <NavItem collapsed={collapsed}>
                <StyledLink to="/faculties" collapsed={collapsed} active={isActive("/faculties")}>
                  <FaUniversity />
                  <span>Facultés</span>
                </StyledLink>
              </NavItem>
              <NavItem collapsed={collapsed}>
                <StyledLink to="/departments" collapsed={collapsed} active={isActive("/departments")}>
                  <FaBuilding />
                  <span>Départements</span>
                </StyledLink>
              </NavItem>
              <NavItem collapsed={collapsed}>
                <StyledLink to="/programs" collapsed={collapsed} active={isActive("/programs")}>
                  <FaBook />
                  <span>Parcours</span>
                </StyledLink>
              </NavItem>
              <NavItem collapsed={collapsed}>
                <StyledLink to="/courses" collapsed={collapsed} active={isActive("/courses")}>
                  <FaClipboardList />
                  <span>Cours</span>
                </StyledLink>
              </NavItem>
            </NavSection>

            <NavSection collapsed={collapsed}>
              <SectionTitle collapsed={collapsed}>Personnel</SectionTitle>
              <NavItem collapsed={collapsed}>
                <StyledLink to="/teachers" collapsed={collapsed} active={isActive("/teachers")}>
                  <FaChalkboardTeacher />
                  <span>Enseignants</span>
                </StyledLink>
              </NavItem>
            </NavSection>

            <NavSection collapsed={collapsed}>
              <SectionTitle collapsed={collapsed}>Administration</SectionTitle>
              <NavItem collapsed={collapsed}>
                <StyledLink to="/users" collapsed={collapsed} active={isActive("/users")}>
                  <FaUser />
                  <span>Utilisateurs</span>
                </StyledLink>
              </NavItem>
              <NavItem collapsed={collapsed}>
                <StyledLink to="/settings" collapsed={collapsed} active={isActive("/settings")}>
                  <FaCog />
                  <span>Paramètres</span>
                </StyledLink>
              </NavItem>
            </NavSection>
          </>
        )}

        {!isAuthenticated && (
          <NavSection collapsed={collapsed}>
            <SectionTitle collapsed={collapsed}>Authentification</SectionTitle>
            <NavItem collapsed={collapsed}>
              <StyledLink to="/login" collapsed={collapsed} active={isActive("/login")}>
                <FaSignInAlt />
                <span>Connexion</span>
              </StyledLink>
            </NavItem>
          </NavSection>
        )}
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;

