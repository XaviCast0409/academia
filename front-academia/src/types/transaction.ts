export interface TransactionInput {
  userId: number;
  productId?: number | null;
  type: "purchase" | "assignment";
  amount: number;
  description: string;
}

export interface TransactionOutput {
  transactions: Transaction[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface Transaction {
  id: number;
  userId: number;
  productId?: number | null;
  type: "purchase" | "assignment";
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
  };
}