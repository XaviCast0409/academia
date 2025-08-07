import { api } from './api';
import type { EvidenceWithDetails, EvidencesResponse } from '../types/EvidenceTypes';

export const evidenceService = {
  // Obtener evidencias del profesor (paginated)
  async getProfessorEvidences(professorId: number, page: number = 1, limit: number = 10): Promise<EvidencesResponse> {
    const response = await api.get(`/evidences/professor/${professorId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Obtener evidencia específica
  async getEvidence(id: number): Promise<EvidenceWithDetails> {
    const response = await api.get(`/evidences/${id}`);
    return response.data;
  },

  // Cambiar estado de evidencia (aprobar/rechazar)
  async changeEvidenceStatus(evidenceId: number, status: 'approved' | 'rejected', professorId: number): Promise<any> {
    const response = await api.post(`/evidences/change-status/${evidenceId}`, {
      status,
      professorId
    });
    return response.data;
  },

  // Obtener evidencias por actividad
  async getEvidencesByActivity(activityId: number, page: number = 1, limit: number = 10): Promise<EvidencesResponse> {
    const response = await api.get(`/evidences/activities/${activityId}?page=${page}&limit=${limit}`);
    return response.data;
  }
};
