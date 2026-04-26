import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 250px; /* Largeur de la sidebar */
  right: 0;
  height: 70px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavbarTitle = styled.h1`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background: #c82333;
  }
`;

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <NavbarContainer>
      <NavbarLeft>
        <NavbarTitle>Système de Gestion Scolaire</NavbarTitle>
      </NavbarLeft>

      <NavbarRight>
        {isAuthenticated && user ? (
          <>
            <UserInfo>
              <FaUser />
              <span>{user.full_name}</span>
            </UserInfo>
            <LogoutButton onClick={logout}>
              <FaSignOutAlt />
              Déconnexion
            </LogoutButton>
          </>
        ) : (
          <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
            Connexion
          </Link>
        )}
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;
