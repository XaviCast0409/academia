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

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/byId/${id}`);
  return response.data;
}