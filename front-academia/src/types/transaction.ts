export interface TransactionInput {
  userId: number;
  productId?: number | null;
  type: "purchase" | "assignment";
  amount: number;
  description: string;
}

export interface TransactionOutput extends TransactionInput {
  id: number;
  createdAt: Date;
  updatedAt: Date;
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