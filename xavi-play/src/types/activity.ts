export interface Professor {
  id: number;
  name: string;
  email: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  images: string[];
  xavicoints: number;
  professorId: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  section: string;
  mathTopic?: string;
  createdAt: string;
  updatedAt: string;
  professor: Professor;
}

export interface ActivitiesResponse {
  total: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  activities: Activity[];
} 