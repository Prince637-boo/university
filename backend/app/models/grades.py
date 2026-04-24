import uuid
from sqlalchemy import UUID, Column, String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.config import Base


class Grade(Base):
    __tablename__ = "grades"

    id = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, index=True)
    student_id = Column(UUID(as_uuid=True), ForeignKey("etudiants.id"), nullable=False)
    course_id = Column(UUID(as_uuid=True), ForeignKey("cours.id"), nullable=False)
    semester_id = Column(UUID(as_uuid=True), ForeignKey("semesters.id"), nullable=True)
    grade_value = Column(Float, nullable=False)  # e.g., 85.5
    grade_type = Column(String(50), nullable=False)  # e.g., "midterm", "final", "assignment"
    date_assigned = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="grades")
    course = relationship("Course", back_populates="grades")
    semester = relationship("Semester", back_populates="grades")