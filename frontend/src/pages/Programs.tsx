import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { programService } from '../services/programs';
import { departmentService } from '../services/departments';
import type { Program, Department } from '../types';

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

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nom: "", niveau: "", duree: 1, id_departement: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [progResp, deptResp] = await Promise.all([
        programService.getPrograms(),
        departmentService.getDepartments()
      ]);
      setPrograms(progResp.data ?? []);
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
    setFormData({ nom: "", niveau: "", duree: 1, id_departement: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (prog: Program) => {
    setEditingId(prog.id);
    setFormData({ nom: prog.nom, niveau: prog.niveau, duree: prog.duree, id_departement: prog.id_departement });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Voulez-vous supprimer ce parcours ?")) return;
    try {
      await programService.deleteProgram(id);
      toast.success("Parcours supprimé");
      setPrograms(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await programService.updateProgram(editingId, formData);
        setPrograms(prev => prev.map(p => p.id === editingId ? updated : p));
        toast.success("Parcours modifié");
      } else {
        const created = await programService.createProgram(formData);
        setPrograms(prev => [...prev, created]);
        toast.success("Parcours créé");
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
        <Title>Parcours</Title>
        <AddButton onClick={handleAdd}>
          <FaPlus /> Ajouter
        </AddButton>
      </Header>

      <StyledTable>
        <thead>
          <Tr>
            <Th>Nom</Th>
            <Th>Niveau</Th>
            <Th>Durée</Th>
          </Tr>
        </thead>
        <tbody>
          {programs.map((prog) => (
            <Tr key={prog.id}>
              <Td>{prog.nom}</Td>
              <Td>{prog.niveau}</Td>
              <Td>{prog.duree} ans</Td>
              <Td>
                <ActionButtons>
                  <ActionButton onClick={() => handleEdit(prog)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(prog.id)}>
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
            {editingId ? "Modifier" : "Ajouter"} un parcours
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
              <Label>Niveau *</Label>
              <Input
                type="text"
                placeholder="ex: Licence, Master"
                value={formData.niveau}
                onChange={(e) => setFormData({ ...formData, niveau: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Durée (années) *</Label>
              <Input
                type="number"
                min="1"
                value={formData.duree}
                onChange={(e) => setFormData({ ...formData, duree: parseInt(e.target.value) })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Département *</Label>
              <Select
                value={formData.id_departement}
                onChange={(e) => setFormData({ ...formData, id_departement: e.target.value })}
                required
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
