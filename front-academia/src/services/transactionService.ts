import { api } from '../utils/api';
import type { Transaction, TransactionInput, TransactionOutput } from '../types/transaction';

export const getAllTransactions = async (page: number, limit: number, userId: number): Promise<TransactionOutput> => {
  const response = await api.get('/transactions/get-all', {
    params: {
      page, // Default to page 1
      limit, // Default to limit of 10
      userId
    },
  });
  return response.data;
};

export const getTransaction = async (id: number): Promise<Transaction> => {
  const response = await api.get(`/transactions/${id}`);
  return response.data;
};

export const createTransaction = async (transaction: TransactionInput): Promise<Transaction> => {
  const response = await api.post('/transactions', transaction);
  return response.data;
};

export const updateTransaction = async (id: number, transaction: TransactionInput): Promise<Transaction> => {
  const response = await api.put(`/transactions/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};

export const purchaseProduct = async (userId: number, productId: number): Promise<Transaction> => {
  const response = await api.post('/transactions/purchase', { userId, productId });
  
  return response.data;
};

export const getProfessorProductTransactions = async (professorId: number, page: number, limit: number): Promise<TransactionOutput> => {
  const response = await api.get(`/transactions/professor/${professorId}`, {
    params: {
      page,
      limit
    }
  });
  return response.data;
};