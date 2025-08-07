import { create } from 'zustand';
import { Transaction, TransactionsResponse } from '@/types/transaction';
import transactionService from '@/services/transactionService';

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalTransactions: number;
  loadTransactions: (userId: number, page?: number) => Promise<void>;
  clearError: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalTransactions: 0,

  loadTransactions: async (userId: number, page: number = 1) => {
    try {
      console.log('TransactionStore: Loading transactions for user:', userId, 'page:', page);
      set({ loading: true, error: null });
      
      const response: TransactionsResponse = await transactionService.getUserTransactions(userId, page);
      
      console.log('TransactionStore: Transactions loaded successfully:', response);
      
      set({
        transactions: response.transactions,
        currentPage: response.currentPage || page,
        totalPages: response.totalPages || 0,
        totalTransactions: response.total,
        loading: false,
      });
    } catch (error: any) {
      console.error('TransactionStore: Error loading transactions:', error);
      set({
        error: error.message || 'Error al cargar las transacciones',
        loading: false,
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },
})); 