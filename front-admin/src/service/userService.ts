import api from "./api"
import type { UserAttributes } from "../types/UserType"

export const getUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const getUserById = async (id: string) => {
    const response = await api.get(`/users/${id}`)
    return response.data
}

export const createUser = async (user: UserAttributes) => {
    const response = await api.post('/users/create', user)
    return response.data
}

export const updateUser = async (id: string, user: UserAttributes) => {
    const response = await api.put(`/users/update/${id}`, user)
    return response.data
}

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/users/delete/${id}`)
    return response.data
}

export const logIn = async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password })
    return response.data
}
