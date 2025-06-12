import { api } from '../utils/api';

interface LoginDTO {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginDTO): Promise<string> => {
  const response = await api.post('/users/login', data);
  return response.data.token.token; // debe ser el token JWT string
};