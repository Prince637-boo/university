import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const AuthCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
`;

const AuthLayout: React.FC = () => {
  return (
    <AuthContainer>
      <AuthCard>
        <Outlet />
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthLayout;