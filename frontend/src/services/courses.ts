import { apiService } from './api';
import type { Course } from '../types';

export class CourseService {
  async getCourses(page = 1, limit = 10, search?: string): Promise<{ data: Course[]; count: number }> {
    return apiService.get<{ data: Course[]; count: number }>('/courses', {
      skip: (page - 1) * limit,
      limit,
      search,
    });
  }

  async getCourse(id: string): Promise<Course> {
    return apiService.get<Course>(`/courses/${id}`);
  }

  async createCourse(course: Omit<Course, 'id'>): Promise<Course> {
    return apiService.post<Course>('/courses', course);
  }

  async updateCourse(id: string, course: Partial<Omit<Course, 'id'>>): Promise<Course> {
    return apiService.put<Course>(`/courses/${id}`, course);
  }

  async deleteCourse(id: string): Promise<void> {
    return apiService.delete(`/courses/${id}`);
  }
}

export const courseService = new CourseService();
