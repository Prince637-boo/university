import { apiService } from './api';
import type { Teacher } from '../types';

export class TeacherService {
  async getTeachers(page = 1, limit = 10, search?: string): Promise<{ data: Teacher[]; count: number }> {
    return apiService.get<{ data: Teacher[]; count: number }>('/teachers', {
      skip: (page - 1) * limit,
      limit,
      search,
    });
  }

  async getTeacher(id: string): Promise<Teacher> {
    return apiService.get<Teacher>(`/teachers/${id}`);
  }

  async createTeacher(teacher: Omit<Teacher, 'id'>): Promise<Teacher> {
    return apiService.post<Teacher>('/teachers', teacher);
  }

  async updateTeacher(id: string, teacher: Partial<Omit<Teacher, 'id'>>): Promise<Teacher> {
    return apiService.put<Teacher>(`/teachers/${id}`, teacher);
  }

  async deleteTeacher(id: string): Promise<void> {
    return apiService.delete(`/teachers/${id}`);
  }
}

export const teacherService = new TeacherService();
