import { api } from "../utils/api";
import type { EvidenceImput, EvidencePaginated } from "../types/evidence";

export const getEvidencesByActivity = async (
  activityId: number,
  page: number = 1,
  limit: number = 10
): Promise<EvidencePaginated> => {
  const res = await api.get(`/evidences/activities/${activityId}`, {
    params: { page, limit },
  });

  return res.data;
};

export const createEvidence = async (data: EvidenceImput): Promise<any> => {
  const res = await api.post(`/evidences`, data);
  return res.data;
}
export const getEvidencePerProfessor = async (
  professorId: number,
  page: number = 1,
  limit: number = 10
): Promise<EvidencePaginated> => {
  const res = await api.get(`/evidences/professor/${professorId}`, {
    params: { page, limit },
  });

  return res.data;
}