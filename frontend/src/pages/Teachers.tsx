import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { teacherService } from '../services/teachers';
import { departmentService } from '../services/departments';
import type { Teacher, Department } from '../types';

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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #b0bec5;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
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

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nom: "", prenom: "", email: "", telephone: "", specialite: "", id_departement: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [teachResp, deptResp] = await Promise.all([
        teacherService.getTeachers(),
        departmentService.getDepartments()
      ]);
      setTeachers(teachResp.data ?? []);
      setDepartments(deptResp.data ?? []);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ nom: "", prenom: "", email: "", telephone: "", specialite: "", id_departement: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingId(teacher.id);
    setFormData({
      nom: teacher.nom,
      prenom: teacher.prenom,
      email: teacher.email,
      telephone: teacher.telephone || "",
      specialite: teacher.specialite || "",
      id_departement: teacher.id_departement || ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Voulez-vous supprimer cet enseignant ?")) return;
    try {
      await teacherService.deleteTeacher(id);
      toast.success("Enseignant supprimé");
      setTeachers(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await teacherService.updateTeacher(editingId, formData);
        setTeachers(prev => prev.map(t => t.id === editingId ? updated : t));
        toast.success("Enseignant modifié");
      } else {
        const created = await teacherService.createTeacher(formData);
        setTeachers(prev => [...prev, created]);
        toast.success("Enseignant créé");
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
        <Title>Enseignants</Title>
        <AddButton onClick={handleAdd}>
          <FaPlus /> Ajouter
        </AddButton>
      </Header>

      <StyledTable>
        <thead>
          <Tr>
            <Th>Nom</Th>
            <Th>Prénom</Th>
            <Th>Email</Th>
            <Th>Spécialité</Th>
          </Tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <Tr key={teacher.id}>
              <Td>{teacher.nom}</Td>
              <Td>{teacher.prenom}</Td>
              <Td>{teacher.email}</Td>
              <Td>{teacher.specialite || "-"}</Td>
              <Td>
                <ActionButtons>
                  <ActionButton onClick={() => handleEdit(teacher)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(teacher.id)}>
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
            {editingId ? "Modifier" : "Ajouter"} un enseignant
          </Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nom *</Label>
              <Input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Prénom *</Label>
              <Input
                type="text"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Téléphone</Label>
              <Input
                type="tel"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Spécialité</Label>
              <Input
                type="text"
                value={formData.specialite}
                onChange={(e) => setFormData({ ...formData, specialite: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Département</Label>
              <Select
                value={formData.id_departement}
                onChange={(e) => setFormData({ ...formData, id_departement: e.target.value })}
              >
                <option value="">Sélectionner un département</option>
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.nom}</option>
                ))}
              </Select>
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
