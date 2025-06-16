// evidenceStore.ts
import { create } from "zustand";
import {
  getEvidencesByActivity,
  createEvidence,
  getEvidencePerProfessor,
  getEvidencePerStudent
} from "../services/evidenceService";
import type { Evidence } from "../types/evidence";

interface EvidenceState {
  evidences: Evidence[];
  page: number;
  totalPages: number;
  limit: number;
  fetchEvidencesByActivity: (activityId: number, page?: number, limit?: number) => Promise<void>;
  addEvidence: (data: Omit<Evidence, "id">) => Promise<void>;
  updateEvidenceStatus: (updatedEvidence: Evidence) => void;
  getEvidencePerProfessor: (professorId: number, page?: number, limit?: number) => Promise<void>;
  cleanEvidences: () => void;
  getEvidencePerStudent: (studentId: number, page?: number, limit?: number) => Promise<void>;
}

export const useEvidenceStore = create<EvidenceState>((set) => ({
  evidences: [],
  page: 1,
  totalPages: 1,
  limit: 10,

  fetchEvidencesByActivity: async (activityId, page, limit ) => {
    try {
      const data = await getEvidencesByActivity(activityId, page, limit);
      set({
        evidences: data.evidences,
        page: data.page,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching evidences:", error);
    }
  },

  addEvidence: async (data) => {
    try {
      const newEvidence = await createEvidence(data);
      set((state) => ({ evidences: [...state.evidences, newEvidence] }));
    } catch (error) {
      console.error("Error creating evidence:", error);
    }
  },

  updateEvidenceStatus: (updatedEvidence) => {
    set((state) => ({
      evidences: state.evidences.map((ev) =>
        ev.id === updatedEvidence.id ? updatedEvidence : ev
      ),
    }));
  },
  getEvidencePerProfessor: async (professorId, page = 1, limit = 10) => {
    try {
      const data = await getEvidencePerProfessor(professorId, page, limit);
      set({
        evidences: data.evidences,
        page: data.page,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching evidences for professor:", error);
    }
  },
  cleanEvidences: () => set({ evidences: [], page: 1, totalPages: 1}),
  getEvidencePerStudent: async (studentId, page = 1, limit = 10) => {
    try {
      const data = await getEvidencePerStudent(studentId, page, limit);      
      set({
        evidences: data.evidences,
        page: data.page,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching evidences for student:", error);
    }
  },
}));
