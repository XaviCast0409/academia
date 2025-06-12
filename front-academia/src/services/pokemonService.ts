// src/services/pokemonService.ts
import { api } from '../utils/api';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

interface GetPokemonsResponse {
  pokemons: Pokemon[];
  totalPages: number;
}

export const getAllPokemons = async (page = 1): Promise<GetPokemonsResponse> => {
  const response = await api.get(`/pokemons/get-all?page=${page}`);
  return response.data;
};
