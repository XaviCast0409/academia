export interface Evidence {
  id: number;
  studentId: number; // Relación con el alumno (User)
  studentName: string; // Nombre del alumno
  activityId: number; // Relación con la actividad
  filePath: string[];
  status: "pending" | "approved" | "rejected";
  studentEmail?: string; // Email del alumno
  createdAt?: Date | string ; // Fecha de creación
  updatedAt?: Date;
  activity?: {
    id: number;
    title: string;
    professor: {
      id: number;
      name: string;
    }; // Información del profesor
  }
  student?:{
    id: number;
    name: string;
    email?: string; // Email del alumno
  }
}

export interface EvidenceImput {
  studentId: number; // Relación con el alumno (User)
  studentName: string; // Nombre del alumno
  activityId: number; // Relación con la actividad
  filePath: string[];
  status: "pending" | "approved" | "rejected";
  studentEmail?: string; // Email del alumno
  createdAt?: Date | string; // Fecha de creación
  updatedAt?: Date;
}

export interface EvidencePaginated {
  evidences: Evidence[];
  total: number; // Total de evidencias
  page: number; // Página actual
  totalPages: number; // Total de páginas
}