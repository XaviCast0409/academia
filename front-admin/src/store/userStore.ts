import { create } from 'zustand'
import type { User } from '../types/UserType'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../service/userService'

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  getUsers: () => Promise<User[]>
  getUserById: (id: string) => Promise<User>
  createUser: (user: User) => Promise<User>
  updateUser: (id: string, user: User) => Promise<User>
  deleteUser: (id: string) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  getUsers: async () => {
    const users = await getUsers()
    return users
  },
  getUserById: async (id: string) => {
    const user = await getUserById(id)
    return user
  },
  createUser: async (user: User) => {
    const newUser = await createUser(user)
    return newUser
  },
  updateUser: async (id: string, user: User) => {
    const updatedUser = await updateUser(id, user)
    return updatedUser
  },
  deleteUser: async (id: string) => {
    await deleteUser(id)
  },
}))