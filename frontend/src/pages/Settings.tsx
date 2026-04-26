import styled from "styled-components";

const SettingsContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(44, 62, 80, 0.08);
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;
`;

const Title = styled.h2`
  color: #2d3e50;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 800;
  letter-spacing: 1px;
  font-size: 2rem;
`;

const SettingSection = styled.div`
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  color: #2d3e50;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.label`
  color: #2d3e50;
  font-weight: 600;
  cursor: pointer;
`;

const SettingDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 5px 0 0 0;
`;

const Toggle = styled.input`
  width: 50px;
  height: 30px;
  cursor: pointer;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const DangerButton = styled(Button)`
  background: #f44336;
`;

const InfoBox = styled.div`
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
  color: #1565c0;
`;

export default function SettingsPage() {
  return (
    <SettingsContainer>
      <Title>⚙️ Paramètres</Title>

      <SettingSection>
        <SectionTitle>Préférences d'Affichage</SectionTitle>
        <SettingItem>
          <div>
            <SettingLabel>Mode sombre</SettingLabel>
            <SettingDescription>Activer le thème sombre de l'application</SettingDescription>
          </div>
          <Toggle type="checkbox" />
        </SettingItem>
        <SettingItem>
          <div>
            <SettingLabel>Notifications</SettingLabel>
            <SettingDescription>Afficher les notifications de l'application</SettingDescription>
          </div>
          <Toggle type="checkbox" defaultChecked />
        </SettingItem>
      </SettingSection>

      <SettingSection>
        <SectionTitle>Sécurité</SectionTitle>
        <SettingItem>
          <div>
            <SettingLabel>Authentification à deux facteurs</SettingLabel>
            <SettingDescription>Sécuriser votre compte avec une double authentification</SettingDescription>
          </div>
          <Toggle type="checkbox" />
        </SettingItem>
        <SettingItem>
          <div>
            <SettingLabel>Sessions actives</SettingLabel>
            <SettingDescription>Gérer vos sessions de connexion</SettingDescription>
          </div>
          <Button>Gérer</Button>
        </SettingItem>
      </SettingSection>

      <SettingSection>
        <SectionTitle>Données</SectionTitle>
        <SettingItem>
          <div>
            <SettingLabel>Exporter les données</SettingLabel>
            <SettingDescription>Télécharger une copie de vos données personnelles</SettingDescription>
          </div>
          <Button>Exporter</Button>
        </SettingItem>
        <SettingItem>
          <div>
            <SettingLabel>Supprimer mon compte</SettingLabel>
            <SettingDescription>Supprimer définitivement votre compte et toutes les données associées</SettingDescription>
          </div>
          <DangerButton>Supprimer</DangerButton>
        </SettingItem>
      </SettingSection>

      <SettingSection>
        <SectionTitle>À Propos</SectionTitle>
        <InfoBox>
          <strong>Système de Gestion Scolaire v1.0.0</strong>
          <p>Plateforme complète de gestion académique universitaire</p>
          <p>© 2024 - Tous droits réservés</p>
        </InfoBox>
      </SettingSection>
    </SettingsContainer>
  );
}
