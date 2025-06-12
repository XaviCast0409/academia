// evidenceStore.ts
import { create } from "zustand";
import {
  getEvidencesByActivity,
  createEvidence,
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
}));
