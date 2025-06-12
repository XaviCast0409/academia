import { create } from "zustand";
import type { Product } from "../types/products";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../services/productService";

interface ProductState {
    products: Product[];
    totalPages: number;
    fetchProducts: (page?: number, professorId?: string) => Promise<void>;
    addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    editProduct: (id: number, product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    removeProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    totalPages: 0,

    fetchProducts: async (page = 1, professorId?: string) => {
        try {
            const response = await getAllProducts(page, professorId); // ⬅️ ahora le puedes pasar el ID si lo necesitas
            set({ products: response.products, totalPages: response.totalPages });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },
    addProduct: async (product) => {
        try {
            const newProduct = await createProduct(product);
            set((state) => ({ products: [...state.products, newProduct] }));
        } catch (error) {
            console.error("Error adding product:", error);
        }
    },
    editProduct: async (id, product) => {
        try {
            const updatedProduct = await updateProduct(id, product);
            set((state) => ({
                products: state.products.map((p) =>
                    p.id === updatedProduct.id ? updatedProduct : p
                ),
            }));
        } catch (error) {
            console.error("Error updating product:", error);
        }
    },
    removeProduct: async (id) => {
        try {
            await deleteProduct(id);
            set((state) => ({
                products: state.products.filter((product) => product.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    },
}));