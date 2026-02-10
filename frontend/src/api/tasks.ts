import { apiClient } from './client';
import type { Task, TaskFilters, PaginatedResponse } from '@/types';
import type { TaskFormData } from '@/schemas/task';

export const tasksApi = {
  getAll: async (filters?: TaskFilters): Promise<PaginatedResponse<Task>> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    const response = await apiClient.get<PaginatedResponse<Task>>(
      `/api/v1/tasks${params.toString() ? `?${params.toString()}` : ''}`
    );
    return response.data;
  },
  getById: async (id: string): Promise<Task> => {
    const response = await apiClient.get<Task>(`/api/v1/tasks/${id}`);
    return response.data;
  },
  create: async (data: TaskFormData): Promise<Task> => {
    const response = await apiClient.post<Task>('/api/v1/tasks', data);
    return response.data;
  },
  update: async (id: string, data: TaskFormData): Promise<Task> => {
    const response = await apiClient.put<Task>(`/api/v1/tasks/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/tasks/${id}`);
  },
};
