import { apiService } from './api';
import type { Department } from '../types';

export class DepartmentService {
  async getDepartments(page = 1, limit = 10, search?: string): Promise<{ data: Department[]; count: number }> {
    return apiService.get<{ data: Department[]; count: number }>('/departments', {
      skip: (page - 1) * limit,
      limit,
      search,
    });
  }

  async getDepartment(id: string): Promise<Department> {
    return apiService.get<Department>(`/departments/${id}`);
  }

  async createDepartment(department: Omit<Department, 'id'>): Promise<Department> {
    return apiService.post<Department>('/departments', department);
  }

  async updateDepartment(id: string, department: Partial<Omit<Department, 'id'>>): Promise<Department> {
    return apiService.put<Department>(`/departments/${id}`, department);
  }

  async deleteDepartment(id: string): Promise<void> {
    return apiService.delete(`/departments/${id}`);
  }
}

export const departmentService = new DepartmentService();
