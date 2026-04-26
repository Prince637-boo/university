import { apiService } from './api';
import type { Program } from '../types';

export class ProgramService {
  async getPrograms(page = 1, limit = 10, search?: string): Promise<{ data: Program[]; count: number }> {
    return apiService.get<{ data: Program[]; count: number }>('/programs', {
      skip: (page - 1) * limit,
      limit,
      search,
    });
  }

  async getProgram(id: string): Promise<Program> {
    return apiService.get<Program>(`/programs/${id}`);
  }

  async createProgram(program: Omit<Program, 'id'>): Promise<Program> {
    return apiService.post<Program>('/programs', program);
  }

  async updateProgram(id: string, program: Partial<Omit<Program, 'id'>>): Promise<Program> {
    return apiService.put<Program>(`/programs/${id}`, program);
  }

  async deleteProgram(id: string): Promise<void> {
    return apiService.delete(`/programs/${id}`);
  }
}

export const programService = new ProgramService();
