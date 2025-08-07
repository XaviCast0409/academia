import { create } from 'zustand';
import { Product } from '@/types/product';
import productService from '@/services/productService';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  loadProducts: () => Promise<void>;
  clearProducts: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  loadProducts: async () => {
    try {
      set({ loading: true, error: null });
      const response = await productService.getProducts();
      set({ products: response.products, loading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Error al cargar productos', 
        loading: false 
      });
      throw error;
    }
  },

  clearProducts: () => {
    set({ products: [], loading: false, error: null });
  },
})); 