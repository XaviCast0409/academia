export interface Evidence {
  id: number;
  studentId: number;
  activityId: number;
  filePath: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  activity?: {
    id: number;
    title: string;
    description: string;
    professor?: {
      id: number;
      name: string;
    };
  };
}

export interface EvidencesResponse {
  evidences: Evidence[];
  total: number;
  page: number;
  totalPages: number;
} 