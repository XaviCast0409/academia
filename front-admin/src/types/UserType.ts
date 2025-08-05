export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number; // Relación con Role
    pokemonId: number; // <-- NUEVO
    xavicoints?: number; // Xavicoints del usuario
    section?: string;
    level?: number;
    experience?: number;
    isActive?: boolean;
    currentStreak?: number; // Racha actual de días consecutivos
    lastLogin?: Date; // Última fecha de login
    completedActivities?: number; // Número de actividades completadas
    isVerified?: boolean; // Si el usuario está verificado
    verificationCode?: string; // Código de verificación
    verificationCodeExpires?: Date; // Fecha de expiración del código
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserInput = Omit<UserAttributes, "id"> & Partial<Pick<UserAttributes, "id">>;
export type UserOutput = Required<UserAttributes>;
