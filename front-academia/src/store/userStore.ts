import { create } from 'zustand';
import type { User } from '../types/user';
import { getUsers, getUserById } from '../services/userService';

interface UserState {
  users: User[];
  user: User;
  getUserById: (id: string) => Promise<User | undefined>;
  addUser: (user: User) => void;
  getAllUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  user: {} as User,
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  // traer todos los usuarios
  getAllUsers: async () => {
    const users = await getUsers();
    set({ users });
  },
  // traer un usuario por id
  getUserById: async (id) => {
    const user = await getUserById(id);
    set({ user });
    return user;
  }
}));