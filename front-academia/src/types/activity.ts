export interface ActivityInput {
    title: string;
    description: string;
    images?: string[]; // Cambiado a string[] para almacenar múltiples imágenes
    xavicoints: number;
    professorId: number;
}
export interface Activity extends ActivityInput {
    id: number;
    createdAt: string;
    updatedAt: string;
}
