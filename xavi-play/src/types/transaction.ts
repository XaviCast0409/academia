export interface PurchaseRequest {
  userId: number;
  productId: number;
}

export interface Transaction {
  id: number;
  userId: number;
  productId?: number | null;
  type: 'purchase' | 'assignment';
  amount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  product?: {
    id: number;
    name: string;
    price: number;
  };
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  currentPage?: number;
  totalPages?: number;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  transaction?: Transaction;
} 