import { create } from 'zustand';
import type { Role } from '../types/role';
import { getRoles } from '../services/roleService';

interface RoleState {
  roles: Role[];
  addRole: (role: Role) => void;
  getAllRoles: () => Promise<void>;
}

export const useRoleStore = create<RoleState>((set) => ({
  roles: [],
  addRole: (role) =>
    set((state) => ({
      roles: [...state.roles, role],
    })),
  // traer todos los roles
  getAllRoles: async () => {
    const roles = await getRoles();
    set({ roles });
  },
}));