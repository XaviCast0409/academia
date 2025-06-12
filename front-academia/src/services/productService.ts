import { api } from "../utils/api";
import type { Product } from "../types/products";

interface GetProductsResponse {
    products: Product[];
    totalPages: number;
}

export const getAllProducts = async (page = 1, professorId?: string): Promise<GetProductsResponse> => {
    const response = await api.get<GetProductsResponse>('/products/get-all', {
        params: {
            page,
            professorId
        },
    });
    console.log("getAllProducts response:", response.data);
    
    return response.data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await api.post('/products/create', product);
    return response.data;
};

export const updateProduct = async (id: number, product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await api.put(`/products/update/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/products/delete/${id}`);
};