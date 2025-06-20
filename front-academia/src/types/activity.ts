export interface ActivityInput {
    title: string;
    description: string;
    images?: string[]; // Cambiado a string[] para almacenar múltiples imágenes
    xavicoints: number;
    professorId: number;
    professor?: {
        id: number;
        name: string;
    }
    difficulty: string;
}
export interface Activity extends ActivityInput {
    id: number;
    createdAt: string;
    updatedAt: string;
}
