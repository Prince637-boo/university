import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import HomePage from './pages/Home';
import LoginPage from './pages/auth/LoginPage';
import Liste from "./pages/Liste";
import Enr from './pages/Enr';
import EtudiantProfile from './pages/EtudiantProfile';
import EditEtudiant from './pages/EditEtudiant';
import FacultiesPage from './pages/Faculties';
import DepartmentsPage from './pages/Departments';
import ProgramsPage from './pages/Programs';
import CoursesPage from './pages/Courses';
import TeachersPage from './pages/Teachers';
import UsersPage from './pages/Users';
import SettingsPage from './pages/Settings';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Composant pour protéger les routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Composant pour les routes publiques (redirige si déjà connecté)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }>
            <Route index element={<LoginPage />} />
          </Route>

          {/* Routes protégées */}
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<HomePage />} />
            <Route path="students" element={<Liste />} />
            <Route path="students/new" element={<Enr />} />
            <Route path="students/:id" element={<EtudiantProfile />} />
            <Route path="students/:id/edit" element={<EditEtudiant />} />

            {/* Routes pour les autres entités */}
            <Route path="faculties" element={<FacultiesPage />} />
            <Route path="departments" element={<DepartmentsPage />} />
            <Route path="programs" element={<ProgramsPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position='top-right' autoClose={5000} />
    </AuthProvider>
  );
}

export default App;
