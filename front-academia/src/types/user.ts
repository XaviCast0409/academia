export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  roleId: number;
  pokemonId: number; // 👈 nuevo campo
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roleId: number;
  pokemonId: number;
  pokemon: {
    id: number;
    name: string;
    imageUrl: string; // Asegúrate de que este campo coincida con tu modelo
    highResImageUrl?: string; // Campo opcional para imagen de alta resolución
  };
  role: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  xavicoints: number; // Xavicoints del usuario
}

export interface AuthUser extends User {
  id: string;
  token: string;
  roleId: number;
  pokemonId: number; // 👈 nuevo camp
  exp: number; // Tiempo de expiración del token
}