import api from './api';
import { EvidencesResponse } from '@/types/evidence';

export interface EvidenceRequest {
  activityId: number;
  userId: number;
  images: string[];
  description?: string;
}

export interface EvidenceResponse {
  id: number;
  activityId: number;
  userId: number;
  images: string[];
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

class EvidenceService {

  async createEvidence(evidenceData: EvidenceRequest): Promise<EvidenceResponse> {
    try {
      console.log('EvidenceService: Creating evidence with data:', evidenceData);
      
      // Mapear los campos del frontend a los del backend
      const backendData = {
        studentId: evidenceData.userId, // userId -> studentId
        activityId: evidenceData.activityId,
        filePath: evidenceData.images, // images -> filePath
        description: evidenceData.description,
      };
      
      console.log('EvidenceService: Mapped data for backend:', backendData);
      
      const response = await api.post('/evidences', backendData);
      
      console.log('EvidenceService: Evidence created successfully:', response.data);
      
      return response.data;
    } catch (error: any) {
      console.error('EvidenceService: Error creating evidence:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al crear la evidencia';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error inesperado al crear la evidencia');
      }
    }
  }

  async getEvidenceByActivity(activityId: number): Promise<EvidenceResponse[]> {
    try {
      const response = await api.get(`/evidences/activity/${activityId}`);
      return response.data;
    } catch (error: any) {
      console.error('EvidenceService: Error getting evidence:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al obtener las evidencias';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error inesperado al obtener las evidencias');
      }
    }
  }

  async getEvidenceByUser(userId: number): Promise<EvidenceResponse[]> {
    try {
      const response = await api.get(`/evidences/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error('EvidenceService: Error getting user evidence:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al obtener las evidencias del usuario';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error inesperado al obtener las evidencias del usuario');
      }
    }
  }

  async getEvidencesByStudent(studentId: number, page: number = 1, limit: number = 10): Promise<EvidencesResponse> {
    try {
      console.log('EvidenceService: Getting evidences for student:', studentId, 'page:', page, 'limit:', limit);
      
      const response = await api.get(`/evidences/student/${studentId}`, {
        params: { page, limit }
      });
      
      console.log('EvidenceService: Evidences retrieved successfully:', response.data);
      
      return response.data;
    } catch (error: any) {
      console.error('EvidenceService: Error getting student evidences:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al obtener las evidencias del estudiante';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error inesperado al obtener las evidencias del estudiante');
      }
    }
  }
}

const evidenceService = new EvidenceService();
export default evidenceService; 