// Types pour l'API Backend
export interface User {
  id: string;
  username: string;
  full_name: string;
  is_active: boolean;
  is_superuser: boolean;
  student_id?: string;
}

export interface Student {
  id: string;
  id_etudiant: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  lieu_naissance: string;
  sexe: string;
  nationalite: string;
  adresse?: string;
  email: string;
  telephone: string;
  nom_du_pere: string;
  nom_de_la_mere: string;
  addresse_du_pere: string;
  addresse_de_la_mere: string;
  nom_parent_tuteur: string;
  telephone_parent_tuteur: string;
  adresse_parent_tuteur: string;
  date_inscription: string;
  statut: string;
  id_departement?: string;
  id_parcours?: string;
}

export interface Faculty {
  id: string;
  nom: string;
  description?: string;
}

export interface Department {
  id: string;
  nom: string;
  description?: string;
  id_faculte: string;
}

export interface Program {
  id: string;
  nom: string;
  niveau: string;
  duree: number;
  id_departement: string;
}

export interface Course {
  id: string;
  code: string;
  titre: string;
  description?: string;
  credits: number;
  id_parcours: string;
}

export interface Teacher {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  specialite?: string;
  id_departement?: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  semester_id?: string;
}

export interface Grade {
  id: string;
  student_id: string;
  course_id: string;
  semester_id?: string;
  grade_value: number;
  grade_type: string;
  date_assigned: string;
}

export interface Semester {
  id: string;
  name: string;
}

// Types pour les formulaires
export interface StudentForm {
  nom: string;
  prenom: string;
  date_naissance?: string;
  lieu_naissance?: string;
  sexe: string;
  nationalite?: string;
  adresse?: string;
  email?: string;
  telephone?: string;
  nom_du_pere?: string;
  nom_de_la_mere?: string;
  addresse_du_pere?: string;
  addresse_de_la_mere?: string;
  nom_parent_tuteur?: string;
  telephone_parent_tuteur?: string;
  adresse_parent_tuteur?: string;
  id_departement?: string;
  id_parcours?: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface UserForm {
  username: string;
  full_name: string;
  password: string;
  is_active: boolean;
  is_superuser: boolean;
  student_id?: string;
}

// Types pour les réponses API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Types pour l'authentification
export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginForm) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}