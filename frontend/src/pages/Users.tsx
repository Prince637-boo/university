import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { userService } from '../services/users';
import type { User, UserForm } from '../types';

const TableContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(44, 62, 80, 0.08);
  padding: 24px;
  margin: 0 auto;
  max-width: 900px;
`;

const Title = styled.h2`
  color: #2d3e50;
  text-align: center;
  margin-bottom: 24px;
  font-weight: 800;
  letter-spacing: 1px;
  font-size: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
`;

const Th = styled.th`
  background: #2d3e50;
  color: #fff;
  padding: 12px 8px;
  font-weight: 600;
  text-align: left;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #f5f7fa;
  }
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #e3eaf2;
  }
`;

const Td = styled.td`
  padding: 10px 8px;
  color: #223044;
  position: relative;
`;

const Badge = styled.span<{ active: boolean }>`
  background: ${props => props.active ? '#4caf50' : '#f44336'};
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 2;
  ${Tr}:hover & {
    opacity: 1;
    pointer-events: auto;
  }
`;

const ActionButton = styled.button`
  background: #2d3e50;
  color: #4fc3f7;
  border: none;
  border-radius: 4px;
  padding: 6px 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  &:hover {
    background: #4fc3f7;
    color: #2d3e50;
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2d3e50;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #b0bec5;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #2d3e50;
`;

const CheckboxInput = styled.input`
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const SecondaryButton = styled(Button)`
  background: #e0e0e0;
  color: #2d3e50;
`;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<UserForm>>({ username: "", full_name: "", password: "", is_active: true, is_superuser: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(response.data ?? []);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ username: "", full_name: "", password: "", is_active: true, is_superuser: false });
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({ username: user.username, full_name: user.full_name, is_active: user.is_active, is_superuser: user.is_superuser });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Voulez-vous supprimer cet utilisateur ?")) return;
    try {
      await userService.deleteUser(id);
      toast.success("Utilisateur supprimé");
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await userService.updateUser(editingId, formData as UserForm);
        setUsers(prev => prev.map(u => u.id === editingId ? updated : u));
        toast.success("Utilisateur modifié");
      } else {
        const created = await userService.createUser(formData as UserForm);
        setUsers(prev => [...prev, created]);
        toast.success("Utilisateur créé");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Erreur lors de l'opération");
    }
  };

  if (loading) return <TableContainer><Title>Chargement...</Title></TableContainer>;

  return (
    <TableContainer>
      <Header>
        <Title>Utilisateurs</Title>
        <AddButton onClick={handleAdd}>
          <FaPlus /> Ajouter
        </AddButton>
      </Header>

      <StyledTable>
        <thead>
          <Tr>
            <Th>Nom d'utilisateur</Th>
            <Th>Nom complet</Th>
            <Th>Statut</Th>
            <Th>Admin</Th>
          </Tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.username}</Td>
              <Td>{user.full_name}</Td>
              <Td>
                <Badge active={user.is_active}>
                  {user.is_active ? "Actif" : "Inactif"}
                </Badge>
              </Td>
              <Td>{user.is_superuser ? "✓" : "-"}</Td>
              <Td>
                <ActionButtons>
                  <ActionButton onClick={() => handleEdit(user)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(user.id)}>
                    <FaTrash />
                  </ActionButton>
                </ActionButtons>
              </Td>
            </Tr>
          ))}
        </tbody>
      </StyledTable>

      <ModalOverlay isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <Title style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
            {editingId ? "Modifier" : "Ajouter"} un utilisateur
          </Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nom d'utilisateur *</Label>
              <Input
                type="text"
                value={formData.username || ""}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Nom complet *</Label>
              <Input
                type="text"
                value={formData.full_name || ""}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
              />
            </FormGroup>
            {!editingId && (
              <FormGroup>
                <Label>Mot de passe *</Label>
                <Input
                  type="password"
                  value={formData.password || ""}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingId}
                />
              </FormGroup>
            )}
            <FormGroup>
              <Label>Permissions</Label>
              <CheckboxGroup>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    checked={formData.is_active || false}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  />
                  Actif
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    checked={formData.is_superuser || false}
                    onChange={(e) => setFormData({ ...formData, is_superuser: e.target.checked })}
                  />
                  Administrateur
                </CheckboxLabel>
              </CheckboxGroup>
            </FormGroup>
            <ButtonGroup>
              <SecondaryButton type="button" onClick={() => setIsModalOpen(false)}>
                Annuler
              </SecondaryButton>
              <PrimaryButton type="submit">
                {editingId ? "Modifier" : "Créer"}
              </PrimaryButton>
            </ButtonGroup>
          </form>
        </Modal>
      </ModalOverlay>
    </TableContainer>
  );
}
