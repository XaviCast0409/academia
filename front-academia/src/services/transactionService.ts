import { api } from '../utils/api';
import type { Transaction, TransactionInput } from '../types/transaction';

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions');
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
  console.log(`Purchase product response:`, response.data);
  
  return response.data;
};