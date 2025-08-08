import api from './api';
import { PurchaseRequest, PurchaseResponse, TransactionsResponse } from '@/types/transaction';

class TransactionService {
  // Realizar compra de producto
  async purchaseProduct(userId: number, productId: number): Promise<PurchaseResponse> {
    try {
      const purchaseData: PurchaseRequest = {
        userId,
        productId,
      };

      const response = await api.post('/transactions/purchase', purchaseData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al realizar la compra');
    }
  }

  // Obtener transacciones del usuario
  async getUserTransactions(userId: number, page: number = 1, limit: number = 10): Promise<TransactionsResponse> {
    try {
      const response = await api.get('/transactions/get-all', {
        params: { userId, page, limit }
      });
      return response.data;
    } catch (error: any) {
      console.error('TransactionService: Error getting user transactions:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al obtener las transacciones del usuario';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error inesperado al obtener las transacciones del usuario');
      }
    }
  }
}

export default new TransactionService(); 