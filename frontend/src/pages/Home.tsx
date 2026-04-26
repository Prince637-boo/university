import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { FaUsers, FaUniversity, FaBook, FaChalkboardTeacher } from 'react-icons/fa';

const HomeContainer = styled.div`
  padding: 20px;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const WelcomeTitle = styled.h1`
  margin: 0 0 10px 0;
  font-size: 2.5rem;
  font-weight: 700;
`;

const WelcomeSubtitle = styled.p`
  margin: 0;
  font-size: 1.2rem;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;

  &.students { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); }
  &.faculties { background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%); }
  &.courses { background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%); }
  &.teachers { background: linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%); }
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
  font-weight: 500;
`;

const QuickActions = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const ActionButton = styled.button`
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: #007bff;
    color: white;
    border-color: #007bff;
    transform: translateY(-1px);
  }

  h3 {
    margin: 0 0 5px 0;
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    faculties: 0,
    courses: 0,
    teachers: 0,
  });

  useEffect(() => {
    // Simulation de chargement des statistiques
    // En production, ces données viendraient de l'API
    setStats({
      students: 1250,
      faculties: 8,
      courses: 45,
      teachers: 78,
    });
  }, []);

  if (!isAuthenticated) {
    return (
      <HomeContainer>
        <WelcomeSection>
          <WelcomeTitle>Système de Gestion Scolaire</WelcomeTitle>
          <WelcomeSubtitle>
            Bienvenue sur la plateforme de gestion universitaire complète
          </WelcomeSubtitle>
        </WelcomeSection>

        <StatsGrid>
          <StatCard>
            <StatIcon className="students">
              <FaUsers />
            </StatIcon>
            <StatContent>
              <StatNumber>1,250+</StatNumber>
              <StatLabel>Étudiants</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon className="faculties">
              <FaUniversity />
            </StatIcon>
            <StatContent>
              <StatNumber>8</StatNumber>
              <StatLabel>Facultés</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon className="courses">
              <FaBook />
            </StatIcon>
            <StatContent>
              <StatNumber>45</StatNumber>
              <StatLabel>Cours</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon className="teachers">
              <FaChalkboardTeacher />
            </StatIcon>
            <StatContent>
              <StatNumber>78</StatNumber>
              <StatLabel>Enseignants</StatLabel>
            </StatContent>
          </StatCard>
        </StatsGrid>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <WelcomeSection>
        <WelcomeTitle>Bonjour, {user?.full_name} !</WelcomeTitle>
        <WelcomeSubtitle>
          Bienvenue dans votre tableau de bord de gestion universitaire
        </WelcomeSubtitle>
      </WelcomeSection>

      <StatsGrid>
        <StatCard>
          <StatIcon className="students">
            <FaUsers />
          </StatIcon>
          <StatContent>
            <StatNumber>{stats.students.toLocaleString()}</StatNumber>
            <StatLabel>Étudiants inscrits</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon className="faculties">
            <FaUniversity />
          </StatIcon>
          <StatContent>
            <StatNumber>{stats.faculties}</StatNumber>
            <StatLabel>Facultés</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon className="courses">
            <FaBook />
          </StatIcon>
            <StatContent>
            <StatNumber>{stats.courses}</StatNumber>
            <StatLabel>Cours disponibles</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon className="teachers">
            <FaChalkboardTeacher />
          </StatIcon>
          <StatContent>
            <StatNumber>{stats.teachers}</StatNumber>
            <StatLabel>Enseignants</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <SectionTitle>Actions Rapides</SectionTitle>
        <ActionsGrid>
          <ActionButton onClick={() => window.location.href = '/students/new'}>
            <h3>Ajouter un Étudiant</h3>
            <p>Enregistrer un nouvel étudiant dans le système</p>
          </ActionButton>

          <ActionButton onClick={() => window.location.href = '/students'}>
            <h3>Voir les Étudiants</h3>
            <p>Consulter la liste complète des étudiants</p>
          </ActionButton>

          <ActionButton onClick={() => window.location.href = '/courses'}>
            <h3>Gérer les Cours</h3>
            <p>Administrer les cours et programmes</p>
          </ActionButton>

          <ActionButton onClick={() => window.location.href = '/reports'}>
            <h3>Rapports</h3>
            <p>Générer des rapports statistiques</p>
          </ActionButton>
        </ActionsGrid>
      </QuickActions>
    </HomeContainer>
  );
};

export default HomePage;