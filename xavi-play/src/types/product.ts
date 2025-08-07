export interface Professor {
  id: number;
  name: string;
  email: string;
  roleId: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  professorId: number;
  createdAt: string;
  updatedAt: string;
  professor: Professor;
}

export interface ProductsResponse {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  products: Product[];
} 