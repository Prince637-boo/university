import { apiService } from './api';
import type { User, UserForm } from '../types';

export class UserService {
  async getUsers(page = 1, limit = 10, search?: string): Promise<{ data: User[]; count: number }> {
    return apiService.get<{ data: User[]; count: number }>('/users', {
      skip: (page - 1) * limit,
      limit,
      search,
    });
  }

  async getUser(id: string): Promise<User> {
    return apiService.get<User>(`/users/${id}`);
  }

  async createUser(user: UserForm): Promise<User> {
    return apiService.post<User>('/users', user);
  }

  async updateUser(id: string, user: Partial<UserForm>): Promise<User> {
    return apiService.put<User>(`/users/${id}`, user);
  }

  async deleteUser(id: string): Promise<void> {
    return apiService.delete(`/users/${id}`);
  }
}

export const userService = new UserService();
