import api from './api';
import { ProductsResponse } from '@/types/product';

class ProductService {
  // Obtener todos los productos disponibles
  async getProducts(page: number = 1, professorId?: number): Promise<ProductsResponse> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      
      if (professorId) {
        params.append('professorId', professorId.toString());
      }

      const response = await api.get(`/products/get-all?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener productos');
    }
  }
}

export default new ProductService(); 