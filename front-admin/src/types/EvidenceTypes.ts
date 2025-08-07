export interface Evidence {
  id: number;
  studentId: number;
  activityId: number;
  filePath: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface EvidenceWithDetails extends Evidence {
  student: {
    id: number;
    name: string;
    email: string;
  };
  activity: {
    id: number;
    title: string;
    xavicoints: number;
    difficulty: string;
  };
}

export interface EvidenceStatusChange {
  evidenceId: number;
  status: 'approved' | 'rejected';
  professorId: number;
}

export interface EvidencesResponse {
  evidences: EvidenceWithDetails[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface EvidenceFile {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: Date
}

export interface EvidenceFormData {
  activityId: number
  files: File[]
  description?: string
}

export interface EvidenceReviewData {
  evidenceId: number
  status: EvidenceStatus
  feedback?: string
  score?: number
}

export interface EvidencePreview {
  id: number
  studentName: string
  activityTitle: string
  status: EvidenceStatus
  submittedAt: Date
  filesCount: number
  xavicoints: number
}

export interface EvidenceAnalytics {
  totalEvidences: number
  evidencesByStatus: Record<EvidenceStatus, number>
  averageProcessingTime: number
  topStudents: Array<{
    studentId: number
    studentName: string
    evidencesCount: number
    approvedCount: number
  }>
  recentEvidences: EvidenceWithDetails[]
}

export interface EvidenceSearchParams {
  studentId?: number
  activityId?: number
  status?: EvidenceStatus
  dateFrom?: Date
  dateTo?: Date
  search?: string
}

export interface EvidenceBulkAction {
  evidenceIds: number[]
  action: 'approve' | 'reject' | 'delete'
  feedback?: string
}

// Re-exportar tipos principales
export type {
  Evidence,
  EvidenceStatus,
  CreateEvidenceRequest,
  UpdateEvidenceRequest,
  EvidenceFilters,
  EvidenceStats
} 