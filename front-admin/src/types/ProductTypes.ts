import type { Product } from './index'

// Simplified User interface for these specific types
interface SimpleUser {
	id: number
	name: string
	email: string
}

export interface ProductWithDetails extends Product {
	professor: SimpleUser
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  images?: File[]
  category?: string
  tags?: string[]
}

export interface ProductPreview {
  id: number
  name: string
  description: string
  price: number
  professorName: string
  salesCount: number
  averageRating?: number
  createdAt: Date
}

export interface ProductAnalytics {
  totalProducts: number
  totalRevenue: number
  averagePrice: number
  topSellingProducts: Array<{
    productId: number
    productName: string
    salesCount: number
    revenue: number
  }>
  productsByCategory: Record<string, number>
  recentProducts: Product[]
}

export interface ProductSearchParams {
  search?: string
  professorId?: number
  minPrice?: number
  maxPrice?: number
  category?: string
  dateFrom?: Date
  dateTo?: Date
}

export interface ProductBulkAction {
  productIds: number[]
  action: 'publish' | 'unpublish' | 'delete' | 'duplicate'
  data?: Record<string, any>
}

export interface ProductReview {
  id: number
  productId: number
  userId: number
  rating: number
  comment?: string
  createdAt: Date
  user?: {
    id: number
    name: string
  }
}

export interface ProductCategory {
  id: number
  name: string
  description?: string
  productCount: number
}

// Re-exportar tipos principales
export type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductFilters
} 