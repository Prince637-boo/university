import { apiService } from './api';
import type { Faculty } from '../types';

export class FacultyService {
  async getFaculties(page = 1, limit = 10, search?: string): Promise<{ data: Faculty[]; count: number }> {
    return apiService.get<{ data: Faculty[]; count: number }>('/faculties', {
      skip: (page - 1) * limit,
      limit,
      search,
    });
  }

  async getFaculty(id: string): Promise<Faculty> {
    return apiService.get<Faculty>(`/faculties/${id}`);
  }

  async createFaculty(faculty: Omit<Faculty, 'id'>): Promise<Faculty> {
    return apiService.post<Faculty>('/faculties', faculty);
  }

  async updateFaculty(id: string, faculty: Partial<Omit<Faculty, 'id'>>): Promise<Faculty> {
    return apiService.put<Faculty>(`/faculties/${id}`, faculty);
  }

  async deleteFaculty(id: string): Promise<void> {
    return apiService.delete(`/faculties/${id}`);
  }
}

export const facultyService = new FacultyService();
