import type { Role, RoleInput } from '../types/role';
import { api } from '../utils/api';

export const createRole = async (data: RoleInput): Promise<Role> => {
  const response = await api.post<Role>('/roles/create', data);
  return response.data;
};

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<Role[]>('/roles');
  return response.data;
}