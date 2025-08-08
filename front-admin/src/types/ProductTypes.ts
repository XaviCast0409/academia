// Core Product types aligned with backend Product model
export interface Product {
  id: number
  name: string
  description: string
  price: number
  professorId: number
  professor?: {
    id: number
    name: string
    email?: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  professorId: number
}

export type UpdateProductRequest = Partial<CreateProductRequest>

export interface ProductFilters {
  page?: number
  professorId?: number
  search?: string
}

// Simplified helper types for UI needs
export interface ProductFormData {
  name: string
  description: string
  price: number
}

export interface ProductPreview {
  id: number
  name: string
  description: string
  price: number
  professorName: string
  createdAt: string
}

export interface ProductsResponse {
  currentPage: number
  totalPages: number
  totalProducts: number
  products: Product[]
}