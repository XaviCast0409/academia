import type { 
  Transaction, 
  TransactionType, 
  CreateTransactionRequest, 
  TransactionFilters, 
  TransactionStats 
} from './index'

// Tipos específicos para transacciones
export interface TransactionWithDetails extends Transaction {
  user: {
    id: number
    name: string
    email: string
  }
  product?: {
    id: number
    name: string
    price: number
  }
  formattedAmount: string
  formattedDate: string
}

export interface TransactionFormData {
  userId: number
  productId?: number
  type: TransactionType
  amount: number
  description: string
}

export interface TransactionPreview {
  id: number
  userName: string
  productName?: string
  type: TransactionType
  amount: number
  description: string
  createdAt: Date
}

export interface TransactionAnalytics {
  totalTransactions: number
  totalRevenue: number
  transactionsByType: Record<TransactionType, {
    count: number
    amount: number
  }>
  averageTransactionAmount: number
  topProducts: Array<{
    productId: number
    productName: string
    salesCount: number
    revenue: number
  }>
  recentTransactions: TransactionWithDetails[]
  monthlyRevenue: Array<{
    month: string
    revenue: number
    transactions: number
  }>
}

export interface TransactionSearchParams {
  userId?: number
  productId?: number
  type?: TransactionType
  minAmount?: number
  maxAmount?: number
  dateFrom?: Date
  dateTo?: Date
  search?: string
}

export interface TransactionBulkAction {
  transactionIds: number[]
  action: 'refund' | 'cancel' | 'export'
  data?: Record<string, any>
}

export interface TransactionExport {
  transactions: TransactionWithDetails[]
  format: 'csv' | 'excel' | 'pdf'
  dateRange: {
    from: Date
    to: Date
  }
  filters: TransactionFilters
}

export interface TransactionReport {
  period: {
    start: Date
    end: Date
  }
  summary: {
    totalTransactions: number
    totalRevenue: number
    averageTransactionAmount: number
    uniqueUsers: number
    uniqueProducts: number
  }
  breakdown: {
    byType: Record<TransactionType, {
      count: number
      amount: number
      percentage: number
    }>
    byProduct: Array<{
      productId: number
      productName: string
      count: number
      amount: number
    }>
    byUser: Array<{
      userId: number
      userName: string
      count: number
      amount: number
    }>
  }
}

// Re-exportar tipos principales
export type {
  Transaction,
  TransactionType,
  CreateTransactionRequest,
  TransactionFilters,
  TransactionStats
} 