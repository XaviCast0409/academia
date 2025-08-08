import { create } from 'zustand'
import { userService } from '../service/userService'

interface LoginStore {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  logIn: (email: string, password: string) => Promise<void>
  logOut: () => void
}

export const useLoginStore = create<LoginStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  logIn: async (email: string, password: string) => {
    const response = await userService.login(email, password)
    if (response.status === 200) {
      set({ isLoggedIn: true })
    }
  },
  logOut: () => {
    set({ isLoggedIn: false })
  }
}))