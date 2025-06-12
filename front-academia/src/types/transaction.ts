export interface TransactionInput {
  userId: number;
  productId?: number | null;
  type: "purchase" | "assignment";
  amount: number;
  description: string;
}

export interface TransactionOutput {
  transactions: Transaction[];
  total: number; // Total amount for the transaction
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
}