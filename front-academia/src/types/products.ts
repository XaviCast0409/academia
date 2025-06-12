export interface ProductInput {
    name: string;
    description: string;
    price: number;
    professorId: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  professorId: number; // <-- dos “f”
  createdAt: string;
  updatedAt: string;
}