import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px; /* Largeur de la sidebar */
  padding: 20px;
  margin-top: 70px; /* Hauteur de la navbar */
`;

const AppLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default AppLayout;