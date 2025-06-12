import { create } from "zustand";
import type { Transaction } from "../types/transaction";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  purchaseProduct,
  updateTransaction,
} from "../services/transactionService";

interface TransactionState {
  transactions: Transaction[];
  totalPages: number; // Optional, if you want to handle pagination
  addTransaction: (transaction: Transaction) => void;
  getAllTransactions: (page: number, limit: number, userId: number) => Promise<void>;
  getTransaction: (id: number) => Promise<Transaction>;
  createTransaction: (transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => Promise<Transaction>;
  updateTransaction: (id: number, transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => Promise<Transaction>;
  deleteTransaction: (id: number) => Promise<void>;
  purchaseProduct: (userId: number, productId: number) => Promise<Transaction>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  totalPages: 1, // Initialize totalPages if you want to handle pagination
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
  getAllTransactions: async (page, limit, userId) => {
  const res = await getAllTransactions(page, limit, userId); // este `getAllTransactions` de `services/transactionService` debe retornar { transactions, total }
  const { transactions, total } = res;

  set({
    transactions,
    totalPages: Math.ceil(total / limit),
  });
},
  getTransaction: async (id) => {
    const transaction = await getTransaction(id);
    return transaction;
  },
  createTransaction: async (transaction) => {
    const newTransaction = await createTransaction(transaction);
    set((state) => ({
      transactions: [...state.transactions, newTransaction],
    }));
    return newTransaction;
  },
  updateTransaction: async (id, transaction) => {
    const updatedTransaction = await updateTransaction(id, transaction);
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? updatedTransaction : t
      ),
    }));
    return updatedTransaction;
  },
  deleteTransaction: async (id) => {
    await deleteTransaction(id);
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },
  purchaseProduct: async (userId, productId) => {
    const newTransaction = await purchaseProduct(userId, productId);
    set((state) => ({
      transactions: [...state.transactions, newTransaction],
    }));
    return newTransaction;
  },
}));