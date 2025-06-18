export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  roleId: number;
  pokemonId: number; // 👈 nuevo campo
  section: string; // Sección del usuario, opcional
}

export type User = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  xavicoints: number;
  section?: string;
  role?: {
    id: number;
    name: string;
  };
  pokemon?: {
    id: number;
    name: string;
    imageUrl: string;
    highResImageUrl?: string;
  };
};
