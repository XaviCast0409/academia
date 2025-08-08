import api from './api';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  roleId: number;
  pokemonId: number;
  section: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  highResImageUrl: string;
}

export interface PokemonResponse {
  currentPage: number;
  totalPages: number;
  totalPokemons: number;
  pokemons: Pokemon[];
}

class UserService {
  // Create a new user
  async createUser(userData: CreateUserData): Promise<any> {
    console.log('Creating user:', userData);
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating user:', error);
      throw new Error(error.response?.data?.error || 'Error al crear el usuario');
    }
  }

  // Get all roles
  async getRoles(): Promise<Role[]> {
    try {
      const response = await api.get('/roles');
      return response.data;
    } catch (error: any) {
      console.error('Error getting roles:', error);
      throw new Error('Error al obtener los roles');
    }
  }

  // Get pokemons with pagination
  async getPokemons(page: number = 1): Promise<PokemonResponse> {
    try {
      const response = await api.get(`/pokemons/get-all?page=${page}&limit=20`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting pokemons:', error);
      throw new Error('Error al obtener los Pokémon');
    }
  }

  // Get user by ID
  async getUserById(userId: number): Promise<any> {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting user:', error);
      throw new Error('Error al obtener el usuario');
    }
  }

  // Update user
  async updateUser(userId: number, userData: Partial<CreateUserData>): Promise<any> {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error: any) {
      console.error('Error updating user:', error);
      throw new Error('Error al actualizar el usuario');
    }
  }

  // Delete user
  async deleteUser(userId: number): Promise<any> {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error deleting user:', error);
      throw new Error('Error al eliminar el usuario');
    }
  }
}

export default new UserService(); 