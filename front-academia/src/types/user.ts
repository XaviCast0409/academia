export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  roleId: number;
  pokemonId: number;
  section: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  level?: number;
  experience?: number;
  experienceToNextLevel?: number;
  xavicoints?: number;
  roleId: number;
  role?: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  pokemon?: {
    id: number;
    name: string;
    imageUrl: string;
    highResImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  section?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}
