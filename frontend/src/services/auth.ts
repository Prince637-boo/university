import { apiService } from './api';
import type { User, LoginForm, UserForm } from '../types';

export class AuthService {
  async login(credentials: LoginForm): Promise<string> {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await apiService.postForm<{ access_token: string }>('/login/access-token', formData);
    return response.access_token;
  }

  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/users/me');
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

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();