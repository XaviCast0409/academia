import { create } from "zustand";
import type { Activity, ActivityInput } from "../types/activity";
import { createActivity, getActivities, updateActivity, deleteActivity, getAvailableActivitiesForStudentPaginated, changeEvidenceStatusAndAddXavicoints, getActivity, getActivityByProfessor } from "../services/activityService";

interface ActivityState {
  activities: Activity[];
  activity: Activity | undefined; // 👈 para manejar la actividad por ID

  page: number;
  totalPages: number;
  pageSize: number;

  fetchActivities: () => Promise<void>;
  addActivity: (activity: ActivityInput) => Promise<void>;
  editActivity: (id: number, activity: Activity) => Promise<void>;
  removeActivity: (id: number) => Promise<void>;
  getAvailableActivitiesForStudentPaginated: (studentId: number, page: number, limit: number, section: string) => Promise<void>;
  getActivityByProfessorPaginated: (professorId: number, page: number, pageSize: number, section?: string) => Promise<void>;
  changeEvidenceStatusAndAddXavicoints: (activityId: number, data: any) => Promise<Activity>;
  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  activityById: (id: number) => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  page: 1,
  totalPages: 1,
  pageSize: 10,
  activity: undefined, // 👈 inicializa la actividad por ID como undefined

  fetchActivities: async () => {
    try {
      const activities = await getActivities();
      set({ activities });
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  },
  activityById: async (id: number) => {
    try {
      const activity = await getActivity(id);
      set({ activity: activity }); // Actualiza el estado con la actividad obtenida
    } catch (error) {
      console.error("Error fetching activity by ID:", error);
    }
  },

  addActivity: async (activity) => {
    try {
      const newActivity = await createActivity(activity);
      set((state) => ({ activities: [...state.activities, newActivity] }));
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  },

  editActivity: async (id: number, activity: Activity) => {
    try {
      const updatedActivity = await updateActivity(id, activity);
      set((state) => ({
        activities: state.activities.map((a) =>
          a.id === updatedActivity.id ? updatedActivity : a
        ),
      }));
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  },

  removeActivity: async (id: number) => {
    try {
      await deleteActivity(id);
      set((state) => ({
        activities: state.activities.filter((activity) => activity.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  },

  getAvailableActivitiesForStudentPaginated: async (studentId: number, page: number, limit: number, section: string) => {
    try {
      const activities = await getAvailableActivitiesForStudentPaginated(studentId, page, limit, section);
      set({ activities: activities.activities, page: activities.currentPage, totalPages: activities.totalPages });
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  },
  getActivityByProfessorPaginated: async (professorId: number, page: number, pageSize: number, section?: string) => {
    try {
      const result = await getActivityByProfessor(professorId, page, pageSize, section);
      set({ 
        activities: result.activities, 
        page: result.currentPage, 
        totalPages: result.totalPages,
        pageSize: result.pageSize 
      });
    } catch (error) {
      console.error("Error fetching activities by professor:", error);
    }
  },
  changeEvidenceStatusAndAddXavicoints: async (activityId: number, data: any) => {
    try {
      const updatedActivity = await changeEvidenceStatusAndAddXavicoints(activityId, data);
      set((state) => ({
        activities: state.activities.map((a) =>
          a.id === updatedActivity.id ? updatedActivity : a
        ),
      }));
      
      return updatedActivity; // 👈 importante
    } catch (error) {
      console.error("Error changing evidence status and adding Xavicoints:", error);
      throw error;
    }
  },
  setPage: (page: number) => set({ page }),
  setTotalPages: (totalPages: number) => set({ totalPages})
}));