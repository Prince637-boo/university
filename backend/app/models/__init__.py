# Import de tous les modèles pour assurer le chargement correct des mappers SQLAlchemy
# L'ordre d'importation est important pour éviter les erreurs de résolution de relations

# Modèles de base (pas de dépendances circulaires)
from app.models.users import User
from app.models.media import Media
from app.models.token import Token

# Modèles universitaires (peuvent avoir des références entre eux)
from app.models.university import Faculty, Department, Program, Course

# Modèles d'étudiants et d'enseignants
from app.models.students import Student
from app.models.teachers import Teacher, TeachCourse

# Modèles d'inscriptions et notes (dépendent des modèles ci-dessus)
from app.models.enrollments import Semester, Enrollment
from app.models.grades import Grade

__all__ = [
    "User",
    "Token",
    "Media",
    "Faculty",
    "Department",
    "Program",
    "Course",
    "TeachCourse",
    "Student",
    "Teacher",
    "Semester",
    "Enrollment",
    "Grade",
]

