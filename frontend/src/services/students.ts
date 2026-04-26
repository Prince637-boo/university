import { apiService } from './api';
import type { Student, StudentForm } from '../types';

export class StudentService {
  async getStudents(page = 1, limit = 10, search?: string): Promise<{ data: Student[]; count: number }> {
    return apiService.get<{ data: Student[]; count: number }>('/students', {
      skip: (page - 1) * limit,
      limit,
      search,
    });
  }

  async getStudent(id: string): Promise<Student> {
    return apiService.get<Student>(`/students/${id}`);
  }

  async createStudent(student: StudentForm): Promise<Student> {
    return apiService.post<Student>('/students', student);
  }

  async updateStudent(id: string, student: Partial<StudentForm>): Promise<Student> {
    return apiService.put<Student>(`/students/${id}`, student);
  }

  async deleteStudent(id: string): Promise<void> {
    return apiService.delete(`/students/${id}`);
  }
}

export const studentService = new StudentService();