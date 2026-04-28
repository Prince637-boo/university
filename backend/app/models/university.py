import uuid
from sqlalchemy import Column, String, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.core.config import Base



class Course(Base):
    __tablename__ = "cours"
    
    id = Column(String(36), default=lambda: str(uuid.uuid4()), primary_key=True, index=True)
    code = Column(String(155), index=True, nullable=False)
    titre = Column(String(155), index=True, nullable=False)
    description = Column(Text, nullable=True)
    credits = Column(Integer, index=True, nullable=False)

    id_parcours = Column(String(36), ForeignKey("parcours.id"), nullable=False)
    
    parcours = relationship("Program", back_populates="courses")
    enrollments = relationship("Enrollment", back_populates="courses")
    teachers_assoc = relationship("TeachCourse", back_populates="course")
    grades = relationship("Grade", back_populates="course")

# Parcours/Filière
class Program(Base):
    __tablename__ = "parcours"
    
    id = Column(String(36), default=lambda: str(uuid.uuid4()), primary_key=True, index=True)
    nom = Column(String(255), index=True, nullable=False)
    niveau = Column(String(255), index=True, nullable=False)
    duree = Column(Integer, index=True, nullable=False)
    
    id_departement = Column(String(36), ForeignKey("departements.id"), nullable=False)
    
    departement = relationship("Department", back_populates="programs")
    students = relationship("Student", back_populates="parcours")
    courses = relationship("Course", back_populates="parcours")

class Department(Base):
    __tablename__ = "departements"

    id = Column(String(36), default=lambda: str(uuid.uuid4()), primary_key=True, index=True)
    nom = Column(String(155), index=True, nullable=False)
    description = Column(Text, nullable=True)
    
    id_faculte = Column(String(36), ForeignKey("facultes.id"), nullable=False)
    
    faculte = relationship("Faculty", back_populates="departements")
    students = relationship("Student", back_populates="departement")
    programs = relationship("Program", back_populates="departement")
    teachers = relationship("Teacher", back_populates="departement")

class Faculty(Base):
    __tablename__ = "facultes"

    id = Column(String(36), default=lambda: str(uuid.uuid4()), primary_key=True, index=True)
    nom = Column(String(155), index=True, nullable=False)
    description = Column(Text, nullable=True)

    departements = relationship("Department", back_populates="faculte")