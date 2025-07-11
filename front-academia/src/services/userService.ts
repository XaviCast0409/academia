import { api } from '../utils/api';
import type { CreateUserDTO, User } from '../types/user';

export const createUser = async (data: CreateUserDTO) => {
  const response = await api.post<CreateUserDTO>('/users/create', data);
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

export const getUsersRanking = async (section?: string): Promise<User[]> => {
  const params = section ? { section } : {};
  const response = await api.get<User[]>('/users', { params });
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/byId/${id}`);
  return response.data;
}

export const updateUser = async (id: string, data: Partial<CreateUserDTO>) => {
  const response = await api.put<CreateUserDTO>(`/users/${id}`, data);
  return response.data;
};

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>("/users/me");
    return response.data;
  },

  updateUser: async (userId: number, userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: number): Promise<void> => {
    await api.delete(`/users/${userId}`);
  },
};