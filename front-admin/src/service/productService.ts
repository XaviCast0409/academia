import { api } from './api'
import type { Product, CreateProductRequest, UpdateProductRequest, ProductsResponse } from '../types/ProductTypes'
import { authService } from './authService'

export const productService = {
  async getAll(page = 1, professorScoped = false): Promise<ProductsResponse> {
    const params: Record<string, any> = { page }
    if (professorScoped) {
      const professorId = authService.getUserId()
      if (professorId) params.professorId = professorId
    }
    const { data } = await api.get<ProductsResponse>('/products/get-all', { params })
    return data
  },

  async getById(id: number): Promise<Product> {
    const { data } = await api.get<Product>(`/products/get-id/${id}`)
    return data
  },

  async create(payload: Omit<CreateProductRequest, 'professorId'>): Promise<Product> {
    const professorId = authService.getUserId()
    if (!professorId) throw new Error('Profesor no autenticado')
    const { data } = await api.post<Product>('/products/create', { ...payload, professorId })
    return data
  },

  async update(id: number, payload: UpdateProductRequest): Promise<Product> {
    const { data } = await api.put<Product>(`/products/update/${id}`, payload)
    return data
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/products/delete/${id}`)
  }
}

export default productService


