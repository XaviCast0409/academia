import { create } from 'zustand';
import { Evidence, EvidencesResponse } from '@/types/evidence';
import evidenceService from '@/services/evidenceService';

interface EvidenceState {
  evidences: Evidence[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalEvidences: number;
  loadEvidences: (studentId: number, page?: number) => Promise<void>;
  clearError: () => void;
}

export const useEvidenceStore = create<EvidenceState>((set) => ({
  evidences: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalEvidences: 0,

  loadEvidences: async (studentId: number, page: number = 1) => {
    try {
      set({ loading: true, error: null });

      const response: EvidencesResponse = await evidenceService.getEvidencesByStudent(studentId, page);

      set({
        evidences: response.evidences,
        currentPage: response.page,
        totalPages: response.totalPages,
        totalEvidences: response.total,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Error al cargar las evidencias',
        loading: false,
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },
})); 